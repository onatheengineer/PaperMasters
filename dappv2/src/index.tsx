import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MetamaskStateProvider } from 'use-metamask';

import App from './App';
import { store } from './app/store';
import theme from './components/theme';
import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom/client';
console.log(theme);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <MetamaskStateProvider>
            <QueryClientProvider client={queryClient} contextSharing={true}>
              <App />
            </QueryClientProvider>
          </MetamaskStateProvider>
        </Provider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// DashboardProducts more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
