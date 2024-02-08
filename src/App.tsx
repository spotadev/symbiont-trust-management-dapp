import { WagmiProvider, createConfig, http } from "wagmi"
import "./App.css"
import { arbitrum, mainnet, polygonMumbai } from "wagmi/chains"
import { createWeb3Modal } from "@web3modal/wagmi"
import appStyle from './App.module.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./app/home/Home";
import { useEffect, useLayoutEffect } from "react";

const projectId = import.meta.env.VITE_APP_WALLET_CONNECT_PROJECT_ID;

if (!projectId) {
  throw new Error('Please copy .env.sample to .env and set variables');
}

const chains = [polygonMumbai, mainnet, arbitrum] as const;

const wagmiConfig = createConfig({
  chains: chains,
  transports: {
    [polygonMumbai.id]: http(),
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
  },
})

console.log('YYYYYY');
createWeb3Modal({ wagmiConfig, projectId });
console.log('ZZZZZZ');

const App = () => {

  useEffect(() => {
    try {
      console.log('before createWeb3Modal');
      // createWeb3Modal({ wagmiConfig, projectId });
      console.log('called createWeb3Modal');
    } catch (error) {
      console.error('Error in useEffect:', error);
    }
  }, [projectId, wagmiConfig]);

  return (
    <WagmiProvider config={wagmiConfig}>
      <div className={appStyle.centeredPage}>
        <div style={{
          paddingLeft: '20px', paddingRight: '20px', paddingTop: '10px',
          paddingBottom: '20px', backgroundColor: 'black'
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div>
              <span style={{ fontWeight: 'bold', color: 'white' }}>Next.id / UTU Endorse</span>
            </div>
            <div>
              <w3m-button />
            </div>
          </div>
          <div style={{ paddingTop: '20px' }}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </div>
    </WagmiProvider>
  )
}

/**
 * <Counter />
 * <Quotes />
 */

export default App
