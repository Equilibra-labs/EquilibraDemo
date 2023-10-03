import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import * as React from "react";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { goerli, optimism } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import {
  createClient as urqlClient,
  Provider,
  cacheExchange,
  fetchExchange,
} from "urql";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { chains, provider, publicClient, webSocketPublicClient } =
  configureChains(
    [goerli, optimism],
    [infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY })]
  );

const { connectors } = getDefaultWallets({
  appName: "Equilibra-demo",
  projectId: process.env.NEXT_PUBLIC_PROJECTID || "",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  connectors: connectors,
  webSocketPublicClient,
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

  //   const defaultChain = process.env.NEXT_PUBLIC_DEFAULT_CHAIN as
  //     | RainbowKitChain
  //     | undefined;

  return (
    <Provider value={client}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          modalSize="compact"
          //   initialChain={defaultChain ?? "goerli"}
          chains={chains}
        >
          <NextHead>
            <title>equilibra</title>
          </NextHead>

          {mounted && <Component {...pageProps} />}
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="dark"
          />
        </RainbowKitProvider>
      </WagmiConfig>
    </Provider>
  );
}

export default App;
