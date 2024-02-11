import { http, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";
import getConfig from "next/config";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

const WC_PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;

// const { publicRuntimeConfig } = getConfig();

// const { WC_PROJECT_ID } = publicRuntimeConfig;

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const config = defaultWagmiConfig({
  chains: [sepolia],
  projectId: WC_PROJECT_ID,
  metadata,
  connectors: [injected(), walletConnect({ projectId: WC_PROJECT_ID })],
  transports: {
    [sepolia.id]: http(),
  },
});
