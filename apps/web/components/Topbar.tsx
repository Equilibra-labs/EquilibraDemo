import React from "react";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSupportList } from "~/hooks/useSupportList";
import { useAccount } from "wagmi";

const TopBar = () => {
  const { isConnected } = useAccount();

  return (
    <div className=" ">
      <ConnectButton />
    </div>
  );
};

export default TopBar;
