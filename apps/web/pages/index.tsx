import Layout from "~/components/Layout";
import { GridPattern } from "~/components/GridPattern";

function Home() {
  return (
    <>
      <GridPattern
        className="absolute inset-x-0 -top-14  w-full h-[800px] fill-slate-800 stroke-cyan-900 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
        yOffset={10}
        interactive
      />
      <Layout />
    </>
  );
}

export default Home;
