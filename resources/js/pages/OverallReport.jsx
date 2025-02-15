import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OverallReport = () => {
    const { projects = { data: [], current_page: 1, last_page: 1, prev_page_url: null, next_page_url: null }, tasks = [] } = usePage().props;
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProjects = projects.data.filter((project) => {
        const clientName = project.client_company?.name || "";
        return (
            project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            clientName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <div
            style={{
                margin: "20px auto",
                maxWidth: "1200px",
                padding: "20px",
                backgroundColor: "#f9f9f9",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
            }}
        >
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <img src="/images/logo.png" alt="Company Logo" height="60" />
                <h2 style={{ margin: "10px 0", color: "#333" }}>Overall Report</h2>
            </div>

            <div
                style={{
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <input
                    type="text"
                    placeholder="Search by project or client..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        width: "250px",
                        boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                />
                <button
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#28a745",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                    onClick={() => window.print()}
                >
                    Print
                </button>
            </div>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "20px",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    overflow: "hidden",
                }}
            >
                <thead>
                    <tr>
                        <th
                            style={{
                                backgroundColor: "#007bff",
                                color: "#fff",
                                padding: "10px",
                                border: "1px solid #ddd",
                                textAlign: "left",
                            }}
                        >
                            ID
                        </th>
                        <th
                            style={{
                                backgroundColor: "#007bff",
                                color: "#fff",
                                padding: "10px",
                                border: "1px solid #ddd",
                                textAlign: "left",
                            }}
                        >
                            Project Name
                        </th>
                        <th
                            style={{
                                backgroundColor: "#007bff",
                                color: "#fff",
                                padding: "10px",
                                border: "1px solid #ddd",
                                textAlign: "left",
                            }}
                        >
                            Assigned Users
                        </th>
                        <th
                            style={{
                                backgroundColor: "#007bff",
                                color: "#fff",
                                padding: "10px",
                                border: "1px solid #ddd",
                                textAlign: "left",
                            }}
                        >
                            Client Name
                        </th>
                        <th
                            style={{
                                backgroundColor: "#007bff",
                                color: "#fff",
                                padding: "10px",
                                border: "1px solid #ddd",
                                textAlign: "left",
                            }}
                        >
                            Due Date
                        </th>
                        <th
                            style={{
                                backgroundColor: "#007bff",
                                color: "#fff",
                                padding: "10px",
                                border: "1px solid #ddd",
                                textAlign: "left",
                            }}
                        >
                            Completed Tasks
                        </th>
                        <th
                            style={{
                                backgroundColor: "#007bff",
                                color: "#fff",
                                padding: "10px",
                                border: "1px solid #ddd",
                                textAlign: "left",
                            }}
                        >
                            Tasks Chart
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => {
                            const completedTasks = project.completed_tasks;
                            const chartData = {
                                labels: ['Completed'],
                                datasets: [
                                    {
                                        label: 'Tasks',
                                        data: [completedTasks],
                                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                        borderColor: 'rgba(75, 192, 192, 1)',
                                        borderWidth: 1,
                                    },
                                ],
                            };
                            const chartOptions = {
                                responsive: true,
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                    title: {
                                        display: true,
                                        text: 'Completed Tasks',
                                    },
                                },
                                scales: {
                                    x: {
                                        display: false,
                                    },
                                    y: {
                                        beginAtZero: true,
                                    },
                                },
                            };

                            return (
                                <tr key={project.id}>
                                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>{project.id}</td>
                                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>{project.name}</td>
                                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                        {project.users.map((user) => user.name).join(", ")}
                                    </td>
                                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                        {project.client_company?.name || "N/A"}
                                    </td>
                                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                        {project.due_on || "N/A"}
                                    </td>
                                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                        {completedTasks}
                                    </td>
                                    <td style={{ padding: "10px", border: "1px solid #ddd", width: "150px" }}>
                                        <Bar data={chartData} options={chartOptions} />
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td
                                colSpan="7"
                                style={{
                                    padding: "10px",
                                    textAlign: "center",
                                    color: "#888",
                                }}
                            >
                                No matching projects found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                }}
            >
                <button
                    style={{
                        padding: "10px 20px",
                        backgroundColor: projects.prev_page_url ? "#007bff" : "#ccc",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: projects.prev_page_url ? "pointer" : "not-allowed",
                    }}
                    onClick={() =>
                        projects.prev_page_url && (window.location.href = projects.prev_page_url)
                    }
                    onClick={() =>
                        projects.next_page_url && (window.location.href = projects.next_page_url)
                    }
                    disabled={!projects.next_page_url}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default OverallReport;
