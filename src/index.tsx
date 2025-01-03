import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from './providers/UserProvider';
import { FloatingLoaderProvider } from './providers/FloatingLoaderProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <ChakraProvider>
    <UserProvider>
      <FloatingLoaderProvider>
        <App />
      </FloatingLoaderProvider>
    </UserProvider>
  </ChakraProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
