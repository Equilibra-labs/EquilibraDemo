import { Stack, Heading, useBreakpointValue, Flex } from "@chakra-ui/react";
import { usePools } from "~/hooks/usePools";
import { useProjects } from "~/hooks/useProjects";
import { PoolCard } from "../components/PoolCard";
import { ProjectCard } from "../components/ProjectCard";
import TopBar from "../components/Topbar";

export const Home = () => {
  const direction = useBreakpointValue({ base: "column", md: "row" });
  const { projects } = useProjects();
  const { pools } = usePools();
  return (
    <>
      <TopBar />

      <Stack
        px={8}
        mx={"auto"}
        width="100%"
        bg="#151619"
        minH="100vh"
        color="white"
      >
        <Heading size="lg">Available Pools</Heading>
        <Stack direction={direction} spacing="10px">
          {pools.slice(0, 3).map((pool: any) => (
            <PoolCard
              poolName={pool.name}
              token={pool.token}
              streamed={pool.streamed}
              streaming={pool.streaming}
            />
          ))}
        </Stack>
        <Heading size="lg">Active Projects</Heading>
      </Stack>
    </>
  );
};

export default Home;

// <Stack direction={direction}>
// {projects.slice(0, 3).map((project) => (
//     <ProjectCard
//       projectName={project.name}
//       description={project.description}
//       streaming={project.streaming}
//       streamed={project.streamed}
//     />
//   ))}
// </Stack>
