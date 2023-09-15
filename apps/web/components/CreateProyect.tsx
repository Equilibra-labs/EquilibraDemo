import React from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useDebounce } from "../hooks/useDebounce";
import * as ProjectRegistry from "../abi/ProjectRegistry.json";

export const CreateProyect = () => {
  const [beneficary, setBeneficary] = React.useState(
    "0x69646Cc8e833A808Edbb1ee8def5B0BBde3879ee"
  );
  const debouncedBeneficiary = useDebounce(beneficary);

  const CONTENTHASH: string = "0x94ee059335e5874b";

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: ProjectRegistry.address,
    abi: ProjectRegistry.abi,
    functionName: "registerProject",
    args: [debouncedBeneficiary, CONTENTHASH],
    overrides: {
      gasLimit: 180000,
    },
  });
  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <>
      <button
        className="rounded-full capitalize font-normal font-white w-full  transition-all tracking-widest flex items-center justify-center hover:bg-white hover:text-black border-2 "
        onClick={() => write?.()}
      >
        {isLoading ? "Sending" : "Send Mock Data Transaction"}
      </button>

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
      {(isPrepareError || isError) && (
        <div className="text-red-500 mt-4 ">
          Error: {(prepareError || error)?.message}
        </div>
      )}
    </>
  );
};
