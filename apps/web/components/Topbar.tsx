import React from "react";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSupportList } from "~/hooks/useSupportList";
import { useAccount } from "wagmi";

const TopBar = () => {
  const { isConnected } = useAccount();

  return (
    <div className="flex justify-end p-4 ">
      <ConnectButton />
    </div>
  );
};

export default TopBar;
