import TopBar from "../components/Topbar";
import DemoLayout from "../components/DemoLayout";
import Send from "~/components/SendTransaction";
import ChainData from "~/components/ChainData";
import { CreateProyect } from "~/components/CreateProyect";
import { CreateProjectForm } from "~/components/CreateProyectForm";

function Home() {
  return (
    <>
      <TopBar />
      <div className="containe mx-auto h-screen flex flex-col justify-start items-center mt-4">
        <h2 className="text-2xl mb-4">Equilibra-Demo</h2>
        <ChainData />
        <div className="w-full mt-8 h-full flex p-4 space-x-2">
          <DemoLayout title={"Create proyect"}>
            {/* <CreateProyect /> */}
            <CreateProjectForm />
          </DemoLayout>
          <DemoLayout title={"Create Pool"}>
            <h1></h1>
          </DemoLayout>
        </div>
        {/* <Send /> */}
        {/* <HexEncodeForm /> */}
      </div>
    </>
  );
}

export default Home;
