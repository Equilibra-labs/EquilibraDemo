import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import * as React from "react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli, optimism } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import {
  createClient as urqlClient,
  Provider,
  cacheExchange,
  fetchExchange,
} from "urql";

const { chains, provider } = configureChains(
  [goerli, optimism],
  [infuraProvider({ apiKey: process.env.INFURA_API_KEY })]
);
const { connectors } = getDefaultWallets({
  appName: "Equilibra-demo",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
export { WagmiConfig, RainbowKitProvider };

//Subgraph URL
const subgraphURL =
  "https://api.thegraph.com/subgraphs/name/blossomlabs/osmoticfund-goerli";

// Create a URQL client
const client = urqlClient({
  url: subgraphURL,
  exchanges: [cacheExchange, fetchExchange],
});

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const defaultChain = process.env.NEXT_PUBLIC_DEFAULT_CHAIN as
    | RainbowKitChain
    | undefined;

  return (
    <Provider value={client}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          modalSize="compact"
          initialChain={defaultChain ?? "goerli"}
          chains={chains}
        >
          <NextHead>
            <title>equilibra</title>
          </NextHead>

          {mounted && <Component {...pageProps} />}
        </RainbowKitProvider>
      </WagmiConfig>
    </Provider>
  );
}

export default App;
