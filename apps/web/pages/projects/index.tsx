import { gql, useQuery } from "urql";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

const projectUpdateds = `
  query {
    projects(first: 5) {
      admin
        id
        beneficiary
        contentHash
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

  const { isConnected } = useAccount();
  if (fetching) return <p>Loading ....</p>;

  if (error) return <p>Oh no... {error.message}</p>;

  const spanProps = "text-blue-400";

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-8">
        {data &&
          data.projects.map((proyect) => (
            <div
              key={proyect.id}
              className="relative text-gray-200 flex items-center space-x-3 rounded-lg border border-gray-600 bg-slate-900 px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
            >
              <div className="min-w-0 flex-1">
                <a href="#" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />

                  <p className="truncate text-sm text-gray-500">
                    {" "}
                    <span className={spanProps}>Admin: </span>
                    {proyect.admin}
                    <p className="truncate text-sm text-gray-500">
                      {" "}
                      <span className={spanProps}>Beneficiary: </span>
                      {proyect.beneficiary}
                    </p>
                    <p className="text-sm font-medium text-gray-400">
                      {" "}
                      <span className={spanProps}>Id: </span>
                      {proyect.id}
                    </p>
                    <p className="truncate text-sm text-gray-500">
                      {" "}
                      <span className={spanProps}>ContentHash: </span>
                      {proyect.contentHash}
                    </p>
                  </p>
                </a>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ProjectPage;
