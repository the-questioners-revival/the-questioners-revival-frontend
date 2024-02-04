import React from 'react';
import logo from './logo.svg';
import { Container, Grid, GridItem } from '@chakra-ui/react';
import useAbstractProvider from './providers/AbstractProvider';
import AppApi from './api/app';
import CustomLayout from './components/layout/Layout';
import CustomRouter from './CustomRouter';

function App() {
  return (
    <div className="App">
      <CustomRouter/>
    </div>
  );
}

export default App;
