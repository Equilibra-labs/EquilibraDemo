import { usePools } from "~/hooks/usePools";
import { useProjects } from "~/hooks/useProjects";
import { PoolCard } from "../components/PoolCard";
import { ProjectCard } from "../components/ProjectCard";
import TopBar from "../components/Topbar";
import RegisterProject from "../components/CreateProject";

export const Home = () => {
  const { projects } = useProjects();
  const { pools } = usePools();
  return (
    <>
      <TopBar />
      <div className="containe mx-auto h-screen flex flex-col justify-start items-center mt-4">
        <h2 className="text-2xl mb-4">Create Project Demo:</h2>
        <RegisterProject />
      </div>
    </>
  );
};

export default Home;

{
  /* <Heading size="lg">Available Pools</Heading>
<Stack direction={direction} spacing="10px">
  {pools.slice(0, 3).map((pool: any) => (
    <PoolCard
      poolName={pool.name}
      token={pool.token}
      streamed={pool.streamed}
      streaming={pool.streaming}
    />
  ))}
</Stack> */
}

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
