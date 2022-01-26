import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { MetamaskStateProvider } from "use-metamask";
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store'
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter
} from "react-router-dom";
import {ChakraProvider} from '@chakra-ui/react';
import theme from "../src/theme";

console.log(theme)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <MetamaskStateProvider>
        <ChakraProvider theme={theme}>
        <BrowserRouter>
      <App />
        </BrowserRouter>,
        </ChakraProvider>
    </MetamaskStateProvider>
    </Provider>
  </React.StrictMode>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
