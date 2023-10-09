import React, { FormEvent, ChangeEvent, useState } from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractRead,
  useBlockNumber,
} from "wagmi";
import * as OsmoticController from "../abi/OsmoticController.json";
import { ethers } from "ethers";

//ListAddress: "0xFb5Ff528E295a39b1ba0b053FF7cA410396932c0",

const initializePool: {
  FundingAddress: string;
  GovernanceAddress: string;
  ListAddress: string;
  Params: (string | number)[];
} = {
  FundingAddress: "",
  GovernanceAddress: "",
  ListAddress: "",
  Params: [
    "999999197747000000", // 10 days (864000 seconds) to reach 50% of targetRate
    1,
    19290123456, // 5% of Common Pool per month = Math.floor(0.05e18 / (30 * 24 * 60 * 60))
    "28000000000000000",
  ],
};

const OSMOTIC_POOL_ABI = [
  "function initialize(address,address,address,tuple(uint256,uint256,uint256,uint256))",
];

export const CreatePool = () => {
  const [createPoolData, setCreatePoolData] = useState(initializePool);
  const [encodedPoolData, setEncodedPoolData] = useState(""); // Store the encoded data here

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: "0x0b9f52138050881C4d061e6A92f72d8851B59F8e",
    abi: OsmoticController.abi,
    functionName: "createOsmoticPool",
    args: [encodedPoolData],
    onError(error) {
      console.log("Error", prepareError?.message);
    },
  });

  const params = [
    "999999197747000000", // 10 days (864000 seconds) to reach 50% of targetRate
    1,
    19290123456, // 5% of Common Pool per month = Math.floor(0.05e18 / (30 * 24 * 60 * 60))
    "28000000000000000", // 2.5% of Total Support = the minimum stake to start receiving funds
  ];

  const poolDataToBytesForm = () => {
    const poolBytesCode = new ethers.utils.Interface(
      OSMOTIC_POOL_ABI
    ).encodeFunctionData("initialize", [
      createPoolData.FundingAddress,
      createPoolData.GovernanceAddress,
      createPoolData.ListAddress,
      createPoolData.Params,
    ]);
    return poolBytesCode;
  };

  const { data, error, isError, write } = useContractWrite(config);

  //tx receipt
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  // Handle form submit
  const hanldeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get the encoded pool data
    const encodedData = poolDataToBytesForm();

    // Store the encoded data in the state variable
    setEncodedPoolData(encodedData);

    //console.log("Encoded Pool Data:", encodedData);

    // Call the write function to send the transaction
    write?.();
  };

  return (
    <div className="space-y-10 divide-gray-900/10">
      <div className="">
        <form className="bg-slate-800 shadow-sm  sm:rounded-xl ">
          <div className="px-4 py-6 sm:p-8">
            <div className="">
              <div className="sm:col-span-4 mb-6">
                <label
                  htmlFor="address"
                  className="text-sm font-medium leading-6 text-gray-400"
                >
                  Funding Token Address
                </label>
                <div className="mt-1">
                  <div className="flex">
                    <input
                      type="text"
                      name="website"
                      id="website"
                      className="p-2 w-full rounded-md text-sm text-black bg-gray-200"
                      placeholder="Address to deposit funds of your Pool"
                      onChange={(e) =>
                        setCreatePoolData((prevState) => ({
                          ...prevState,
                          FundingAddress: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4 mb-6 ">
                <label
                  htmlFor="address"
                  className="text-sm font-medium leading-6 text-gray-400"
                >
                  Governance Token Address
                </label>
                <div className="mt-1">
                  <div className="flex">
                    <input
                      type="text"
                      name="website"
                      id="website"
                      className="p-2 w-full rounded-md text-sm text-black bg-gray-200"
                      placeholder="Token use for staking - vote your favorite projects"
                      onChange={(e) =>
                        setCreatePoolData((prevState) => ({
                          ...prevState,
                          GovernanceAddress: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4 mb-6 ">
                <label
                  htmlFor="address"
                  className="text-sm font-medium leading-6 text-gray-400"
                >
                  List Address
                </label>
                <div className="mt-1">
                  <div className="flex">
                    <input
                      type="text"
                      name="website"
                      id="website"
                      className="p-2 w-full rounded-md text-sm text-black bg-gray-200"
                      placeholder="An address list to group your project"
                      onChange={(e) =>
                        setCreatePoolData((prevState) => ({
                          ...prevState,
                          ListAddress: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4 mb-6 ">
                <label
                  htmlFor="address"
                  className="text-sm font-medium leading-6 text-gray-400"
                >
                  Params: Added default values, learn to manupulate them later
                </label>
                <div className="mt-1">
                  <div className="flex">
                    {/* <input
                      type="text"
                      name="website"
                      id="website"
                      className="p-2 w-full rounded-md text-sm text-black bg-gray-200"
                      placeholder="Params to apply to your pool"
                      onChange={(e) =>
                        setCreatePoolData((prevState) => ({
                          ...prevState,
                          FundingAddress: e.target.value,
                        }))
                      }
                    /> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Upload file */}
            <div className="col-span-full"></div>
          </div>

          <div className="flex items-center justify-end gap-x-6 px-4 py-4 sm:px-8">
            <button
              type="submit"
              className="rounded-full capitalize font-normal font-white w-full  transition-all tracking-widest flex items-center justify-center hover:bg-white hover:text-black border-2"
              onClick={hanldeSubmit}
            >
              Send Create Pool Transaction
            </button>
          </div>
        </form>
      </div>

      {isSuccess && (
        <div className="text-green-300">
          Successfully Created a Project!
          <div>
            <a href={`https://goerli.etherscan.io/tx/${data?.hash}`}>
              Check etherscan Transaction Hash
            </a>
          </div>
        </div>
      )}
      {isError && (
        <div className="text-red-500 mt-4 ">Error: {error?.message}</div>
      )}
      {/* <div className="border-2 w-full">
        <a
          href="/projects"
          className="border-4 border-sky-200 text-center rounded-md  text-red-300"
        >
          Check out registered Proyects
        </a>
      </div> */}
    </div>
  );
};
