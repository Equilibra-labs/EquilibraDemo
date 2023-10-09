import { gql, useQuery } from "urql";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

const projectUpdateds = `
  query { 
      osmoticPools(first: 5) {
        address
        id
        owner
        maxActiveProjects
      }  
  }
`;

export const PoolCard = () => {
  const [result] = useQuery({
    query: projectUpdateds,
  });
  const { data, fetching, error } = result;

  const PoolCounts = data?.osmoticPools.length;

  //Loading or Erro State
  if (fetching) return <p>Loading ....</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  //

  return (
    <>
      <div className="">
        <h1 className="border-2 text-center m-4 rounded-full hover:opacity-70">
          There are {PoolCounts} Pools available for Streaming
        </h1>
        {data &&
          data.osmoticPools.map((pool) => (
            <div
              key={pool.id}
              className="relative text-gray-200 flex items-center space-x-3 rounded-lg border border-gray-600 bg-slate-900 px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-gray-400 mb-2">
                  <span className="text-blue-400">Max-Active-Projects: </span>
                  {pool.maxActiveProjects}
                </p>
                <p className="truncate text-sm text-gray-500 mb-1">
                  <span className="text-blue-400">Id: </span>
                  {pool.id}
                </p>
                <p className="truncate text-sm text-gray-500 mb-1">
                  <span className="text-blue-400">Address List: </span>
                  {pool.owner}
                </p>
                <p className="truncate text-sm text-gray-500">
                  <span className="text-blue-400">Address: </span>
                  {pool.address}
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default PoolCard;
