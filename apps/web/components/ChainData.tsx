import React from "react";
import { useAccount, useBalance, useBlockNumber, useConnect } from "wagmi";
import * as ProjectRegistry from "../abi/ProjectRegistry.json";

export default function ChainData() {
  const { connector: activeConnector, isConnected, address } = useAccount();
  const { data: blockNumber } = useBlockNumber();

  return (
    <>
      <div className="">
        {isConnected && <div>Connected to {activeConnector?.name}</div>}
        <div>Address: {address}</div>
        <div>BlockNumber: {blockNumber}</div>
        <a
          href={`https://goerli.etherscan.io/address/${ProjectRegistry.address}`}
          target="_blank"
          rel="noreferrer"
        >
          See contract in Etherscan: {ProjectRegistry.address}
        </a>
      </div>
    </>
  );
}
