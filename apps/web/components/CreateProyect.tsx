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
    "0x2cc10a00c6906910601680B9186751f2aFBB4B49"
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
      gasLimit: 21000,
    },
  });
  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <>
      <button
        className="rounded-full border-2 cursor-pointer w-full"
        disabled={!write || isLoading}
        onClick={() => write?.()}
      >
        {isLoading ? "Minting..." : "Send Transaction"}
      </button>

      {isSuccess && (
        <div>
          Successfully minted your NFT!
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
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
