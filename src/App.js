import './App.css';
import { ThirdwebSDKProvider } from "@thirdweb-dev/react";
import React from 'react';
import FrontPage from './Components/FrontPage';
import MintPage from './Components/MintPage';
import { Routes, Route, } from 'react-router';
import { ethers } from 'ethers';

function App() {

  const ActiveChainId = 80001;


  return (
    <ThirdwebSDKProvider activeChain={ActiveChainId} signer={new ethers.providers.Web3Provider(window.ethereum).getSigner()} clientId="5fb26c268ed64fb73d9fb6010411dca9">
      <Routes>
        <Route path='/' Component={FrontPage} />
        <Route path='/mint' Component={MintPage} />
      </Routes>
    </ThirdwebSDKProvider>

  );
}

export default App;
