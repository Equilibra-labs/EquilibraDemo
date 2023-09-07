import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient } from "wagmi";
import { goerli, optimism } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";

const { chains, provider } = configureChains(
  [goerli, optimism],
  [
    //infuraProvider({ apiKey: "c9efed37bda143fb8a9898e67c25f7ed" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Random",
  chains,
});

export const client = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export { chains };
