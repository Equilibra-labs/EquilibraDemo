/* eslint-disable indent */
import React from "react";

export default function DemoLayout({ title, children }) {
  return (
    <div className="w-[50%] flex flex-col space-y-4 border-2 rounded-xl shadow-lg border-blue-900  align-center p-4 ">
      <h1 className="text-center mt-2">{title}</h1>
      <div className="">{children}</div>
    </div>
  );
}

//arguments to the project registry function
// // _beneficiary: address,
// const BENEFICIARY: string = "0x601a107cB001F517b7dC80b1209bEa43699Fe0C2";

// //_contenthash: Keccak-256 (bytes32) Hash of "hello world":
// const CONTENTHASH: string = "0x94ee059335e5874b";

//const { write } = useContractWrite(config);

// const { config } = usePrepareContractWrite({
//   address: ProjectRegistry.address,
//   abi: ProjectRegistry.abi,
//   functionName: "registerProject",
//   args: [BENEFICIARY, CONTENTHASH],
// });
