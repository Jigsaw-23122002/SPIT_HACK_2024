"use client";

import Head from "next/head";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { WagmiProvider } from "wagmi";
import { useEffect } from "react";
import { reconnect } from "@wagmi/core";
import { config } from "../src/config";

import store from "../src/redux/store";
import "../styles/globals.css";

import { createWeb3Modal } from "@web3modal/wagmi/react";

// Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    setTimeout(() => {
      reconnect(config);
    });
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin=""
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Heebo:wght@100;200;300;400;500;600;700;800;900&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
              rel="stylesheet"
            />
            {/* !Google Fonts */}
            {/* Styles */}
            <link
              type="text/css"
              rel="stylesheet"
              href="/css/plugins.css?ver=4.1"
            />
            <link
              type="text/css"
              rel="stylesheet"
              href="/css/style.css?ver=4.1"
            />
          </Head>
          <Component {...pageProps} />
        </Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
