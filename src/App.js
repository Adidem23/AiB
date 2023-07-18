import './App.css';
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import React from 'react';
import Form from './Components/Form';
import FrontPage from './Components/FrontPage';
import MintPage from './Components/MintPage';
import { useChainId } from '@thirdweb-dev/react';
import { Routes, Route, } from 'react-router';

function App() {

  const ActiveChainId = 80001;


  return (
    <ThirdwebProvider activeChain={ActiveChainId}>
      <Routes>
        {/* < Form /> */}
        {/* <Route path='/' Component={Form} /> */}
        <Route path='/' Component={FrontPage} />
        <Route path='/mint' Component={MintPage} />
      </Routes>
    </ThirdwebProvider>

  );
}

export default App;
