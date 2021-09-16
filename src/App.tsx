import React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';


import theme from './theme/theme';
import { Router } from './router/Router';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default App;
