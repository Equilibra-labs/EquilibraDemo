import { gql, useQuery } from "urql";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { useEffect } from "react";

const projectUpdateds = `
  query {
    projectUpdateds(first: 5) {
        id
      }
  }
`;

export const ProjectPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [result] = useQuery({
    query: projectUpdateds,
  });

  const { data, fetching, error } = result;

  console.log(data);

  const { isConnected } = useAccount();
  if (fetching) return <p>Loading...</p>;

  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <>
      <div className="text-white border-2 text-center">
        The data has Arrived!, console.log it my friend!
      </div>
    </>
  );
};

export default ProjectPage;
