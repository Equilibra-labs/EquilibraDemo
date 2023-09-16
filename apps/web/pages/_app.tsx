import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import * as React from "react";
import { configureChains, createClient, useAccount, WagmiConfig } from "wagmi";
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

//Subgraph endpoint url
const subgraphURL =
  "https://api.studio.thegraph.com/query/52339/equilibra-goerli/version/latest";

// Create a URQL client
const client = urqlClient({
  url: subgraphURL,
  exchanges: [cacheExchange, fetchExchange],
});

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <Provider value={client}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          modalSize="compact"
          initialChain={process.env.NEXT_PUBLIC_DEFAULT_CHAIN}
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
