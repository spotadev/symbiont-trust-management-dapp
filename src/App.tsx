import { WagmiProvider, createConfig, http } from "wagmi"
import "./App.css"
import { arbitrum, mainnet, polygonMumbai } from "wagmi/chains"
import { createWeb3Modal } from "@web3modal/wagmi"
import appStyle from './App.module.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useEffect, useLayoutEffect } from "react";
import NextIdManagement from "./app/components/pages/next-Id-management/NextIdManagement";
import About from "./app/components/pages/about/About";
import Home from "./app/components/pages/home/Home";
import LinkXTwitter from "./app/components/pages/link-platform/x-twitter/LinkXTwitter";
import LinkGithub from "./app/components/pages/link-platform/github/LinkGithub";
import DocsMain from "./app/components/pages/docs/DocsMain";

import SymbiontTrust from "./app/components/pages/symbiont-trust/SymbiontTrust";
import UtuTrust from "./app/components/pages/utu-trust/UtuTrust";
import ConfigureSymbiontTrustProfile from "./app/components/pages/symbiont-trust/configure/ConfigureSymbiontTrustProfile";
import FindDidForUtuSignal from "./app/components/pages/utu-trust/signal/FindDidForUtuSignal";
import UtuGiveSignal from "./app/components/pages/utu-trust/signal/UtuGiveSignal";
import UtuGetSignal from "./app/components/pages/utu-trust/signal/UtuGetSignal";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'w3m-button': any // specify the JSX.Element interface or provide a type for your component
    }
  }
}

const projectId = import.meta.env.VITE_APP_WALLET_CONNECT_PROJECT_ID;

if (!projectId) {
  throw new Error('Please copy .env.sample to .env and set variables');
}


const chains = [polygonMumbai, mainnet, arbitrum] as const;

export const wagmiConfig = createConfig({
  chains: chains,
  transports: {
    [polygonMumbai.id]: http(),
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
  },
})

createWeb3Modal({ wagmiConfig, projectId });

const App = () => {

  console.log('VITE_APP_ENVIRONMENT', import.meta.env.VITE_APP_ENVIRONMENT);

  return (
    <WagmiProvider config={wagmiConfig}>
      <div className={appStyle.centeredPage}>
        <div className={appStyle.theme}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img src="src/sy.png" style={{ width: '20px', paddingRight: '10px' }} />
              <span style={{ fontWeight: 'bold', color: 'white' }}>Trust Management powered by Symbiont Trust</span>
            </div>
            <div>
              <w3m-button />
            </div>
          </div>
          <div style={{ paddingTop: '20px' }}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/docs" element={<DocsMain />} />
                <Route path="/next-id-management" element={<NextIdManagement />} />
                <Route path="/link/platform/twitter" element={<LinkXTwitter />} />
                <Route path="/link/platform/github" element={<LinkGithub />} />
                <Route path="/symbiont-trust" element={<SymbiontTrust />} />
                <Route path="/symbiont-trust/configure-symbiont-trust-profile" element={<ConfigureSymbiontTrustProfile />} />
                <Route path="/utu-trust" element={<UtuTrust />} />
                <Route path="/utu-trust/find-did-for-utu-signal" element={<FindDidForUtuSignal />} />
                <Route path="/utu-trust/give-signal" element={<UtuGiveSignal />} />
                <Route path="/utu-trust/get-signal" element={<UtuGetSignal />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </div>
    </WagmiProvider >
  )
}

export default App
