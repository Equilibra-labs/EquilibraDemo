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

const { chains, provider } = configureChains(
  [goerli, optimism],
  [publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "Equilibra-demo",
  chains,
});
const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});
export { WagmiConfig, RainbowKitProvider };

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
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
  );
}

export default App;
