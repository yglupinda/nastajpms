import { Center, Group, Text, rem, useComputedColorScheme } from "@mantine/core";
// Remove the IconChartArcs import
// Use a relative path to the public directory for your image
const logo = '/logo.png'; // Adjust the path as needed

export default function Logo(props) {
  const computedColorScheme = useComputedColorScheme();

  return (
    <Group wrap="nowrap" {...props}>
      <Center
        bg={computedColorScheme === "dark" ? "blue.8" : "blue.9"}
        p={5}
        style={{ borderRadius: "100%" }}
      >
        <img src={logo} alt="Logo" style={{ width: rem(60), height: rem(60), borderRadius: "200%", flexShrink: 0 }} />
      </Center>
      <Text fz={30} fw={600}>
        NASTAJ
      </Text>
    </Group>
  );
}
