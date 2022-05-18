import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from './app/hooks';
import Navbar from "./components/Navbar";
import Footer from "./components/Footers/Footer";
import "focus-visible/dist/focus-visible";
import {Box, Flex, VStack} from '@chakra-ui/react';
import RoutesRoutes, {NavItem} from './app/RoutesRoutes'
import {
    accountArr,
    accountArrAction,
    accountArrMetaMaskAction,
    accountBCselectors,
    chainIdProvider
} from "./features/accountBC/AccountBCSlice";
import detectEthereumProvider from '@metamask/detect-provider';
import {select} from "redux-saga/effects";
import {ReactQueryDevtools} from 'react-query/devtools';
import {Loading} from "./features/reactQuery/Loading";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import {useGlobalToast} from "./features/toast/hooks/useGlobalToast";

function App() {
    const dispatch = useAppDispatch();
    const toast = useGlobalToast();
    useEffect(() => {
        if(window.ethereum){
            dispatch(accountArrMetaMaskAction());
            const providerPromise = detectEthereumProvider();
            console.log("this is provider:", providerPromise);
            providerPromise.then((provider: any) => {
                console.log('what is this actual provider?', provider);
                provider.on('accountsChanged', (accounts: any) => {
                    console.log('accountDB changed!')
                    dispatch(accountArr([]));
                    dispatch(accountArrMetaMaskAction());
                    window.location.reload();
                });
                provider.on('chainChanged', (chainId: any) => {
                    window.location.reload();
                })
            });
        } else {
            (console.log("this did not make it into metamask!"))

// Create a connector
            dispatch(accountArr([]));
            const connector = new WalletConnect({
                bridge: "https://bridge.walletconnect.org", // Required
                qrcodeModal: QRCodeModal
            });
            console.log("connector:", connector)
// Check if connection is already established
            if (!connector.connected) {
                console.log('getting in here connector.connected??')
                // create new session
                connector.createSession();
            }
            if (connector.connected) {
                console.log('getting in here connector.connected??')
                const connectedAccountArr = connector.accounts
                const connectedChainId = connector.chainId
                console.log("connectedAcoounts", connectedAccountArr)
                console.log("connectedChainId", connectedChainId)
                dispatch(accountArrAction({chainId: `${connectedChainId}`, walletAccount: connectedAccountArr}));
            }

// Subscribe to connection events
            connector.on("connect", (error, payload) => {
                if (error) {
                    console.error(error)
                    throw error;
                }
                // Get provided accounts and chainId
                const { accounts, chainId } = payload.params[0];
                console.log("accounts:", accounts)
                console.log("chainId:", chainId)
                const connectedAccountArr = connector.accounts
                const connectedChainId = connector.chainId
                dispatch(accountArrAction({chainId: `${connectedChainId}`, walletAccount: connectedAccountArr}));
            });

            connector.on("session_update", (error, payload) => {
                if (error) {
                    console.error(error)
                    throw error;
                }
                // Get updated accounts and chainId
                const { accounts, chainId } = payload.params[0];
                const connectedAccountArr = connector.accounts
                const connectedChainId = connector.chainId
                dispatch(accountArrAction({chainId: `${connectedChainId}`, walletAccount: connectedAccountArr}));
            });

            connector.on("disconnect", (error, payload) => {
                if (error) {
                    console.error(error)
                    throw error;
                }

                // Delete connector
                connector.killSession()
            });
        }
    }, [])

    return (
        <Box
            border={'2px solid'}
            borderColor={"pmpurple.8"}
            bg={'pmpurple.6'}
            overflow={'hidden'}
        >
            <Flex
                minH={'100vH'}
                flexDirection={'column'}
                //border={'2px solid red'}
            >
                <Loading/>
                <Box>
                    <Navbar/>
                </Box>
                <Box
                    flexGrow={1}
                    //border={'2px solid yellow'}
                    display={'flex'}
                >
                    <RoutesRoutes/>
                </Box>
            </Flex>
            <Footer/>
        </Box>
    )
}

export default App;
