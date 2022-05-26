import './App.css';
import 'focus-visible/dist/focus-visible';

import { Box, Flex } from '@chakra-ui/react';
import detectEthereumProvider from '@metamask/detect-provider';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import React, { useEffect } from 'react';

import { useAppDispatch } from './app/hooks';
import RoutesRoutes from './app/RoutesRoutes';
import Footer from './components/pages/home/Footers/Footer';
import Navbar from './components/pages/home/Navbar';
import {
  accountArr,
  accountArrAction,
  accountArrMetaMaskAction,
} from './features/accountBC/AccountBCSlice';
import { useGlobalToast } from './features/toast/useGlobalToast';

function App() {
  const dispatch = useAppDispatch();
  useGlobalToast();
  useEffect(() => {
    if (window.ethereum) {
      dispatch(accountArrMetaMaskAction());
      const providerPromise = detectEthereumProvider();
      console.log('this is provider:', providerPromise);
      providerPromise.then((provider: any) => {
        console.log('what is this actual provider?', provider);
        provider.on('accountsChanged', (accounts: any) => {
          console.log('accountDB changed!');
          dispatch(accountArr([]));
          dispatch(accountArrMetaMaskAction());
          window.location.reload();
        });
        provider.on('chainChanged', (chainId: any) => {
          window.location.reload();
        });
      });
    } else {
      console.log('this did not make it into metamask!');

      // Create a connector
      dispatch(accountArr([]));
      const connector = new WalletConnect({
        bridge: 'https://bridge.walletconnect.org', // Required
        qrcodeModal: QRCodeModal,
      });
      console.log('connector:', connector);
      // Check if connection is already established
      if (!connector.connected) {
        console.log('getting in here connector.connected??');
        // create new session
        connector.createSession();
      }
      if (connector.connected) {
        console.log('getting in here connector.connected??');
        const connectedAccountArr = connector.accounts;
        const connectedChainId = connector.chainId;
        console.log('connectedAcoounts', connectedAccountArr);
        console.log('connectedChainId', connectedChainId);
        dispatch(
          accountArrAction({
            chainId: `${connectedChainId}`,
            walletAccount: connectedAccountArr,
          }),
        );
      }

      // Subscribe to connection events
      connector.on('connect', (error, payload) => {
        if (error) {
          console.error(error);
          throw error;
        }
        // Get provided accounts and chainId
        const { accounts, chainId } = payload.params[0];
        console.log('accounts:', accounts);
        console.log('chainId:', chainId);
        const connectedAccountArr = connector.accounts;
        const connectedChainId = connector.chainId;
        dispatch(
          accountArrAction({
            chainId: `${connectedChainId}`,
            walletAccount: connectedAccountArr,
          }),
        );
      });

      connector.on('session_update', (error, payload) => {
        if (error) {
          console.error(error);
          throw error;
        }
        // Get updated accounts and chainId
        const { accounts, chainId } = payload.params[0];
        const connectedAccountArr = connector.accounts;
        const connectedChainId = connector.chainId;
        dispatch(
          accountArrAction({
            chainId: `${connectedChainId}`,
            walletAccount: connectedAccountArr,
          }),
        );
      });

      connector.on('disconnect', (error, payload) => {
        if (error) {
          console.error(error);
          throw error;
        }

        // Delete connector
        //  connector.killSession();
      });
    }
  }, []);

  return (
    // <div className={"App"}>
    // </div>
    <Box
      border={'2px solid'}
      borderColor={'pmpurple.8'}
      bg={'pmpurple.4'}
      overflow={'hidden'}
    >
      <Flex
        minH={'100vH'}
        flexDirection={'column'}
        // border={'2px solid red'}
      >
        <Box>
          <Navbar />
        </Box>
        <Box
          flexGrow={1}
          // border={'2px solid yellow'}
          display={'flex'}
        >
          <RoutesRoutes />
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
}

export default App;
