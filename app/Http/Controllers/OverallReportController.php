<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Task;
use Inertia\Inertia;
use Illuminate\Http\Request;

class OverallReportController extends Controller
{
    public function index(Request $request)
    {
        $perPage = 10;

        $projects = Project::with(['clientCompany', 'users', 'tasks'])
            ->paginate($perPage);

        $tasks = Task::with(['project', 'createdByUser', 'assignedToUser'])
            ->get();

        // Calculate completed tasks and due dates
        $projects->getCollection()->transform(function ($project) use ($tasks) {
            $project->completed_tasks = $tasks->where('project_id', $project->id)
                                              ->whereNotNull('completed_at')
                                              ->count();
            $project->due_on = $tasks->where('project_id', $project->id)
                                      ->max('due_on');
            return $project;
        });

        return Inertia::render('OverallReport', [
            'projects' => $projects,
            'tasks' => $tasks,
        ]);
    }
}
