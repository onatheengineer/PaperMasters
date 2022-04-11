import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from './app/hooks';
import Navbar from "./components/Navbar";
import Footer from "./components/Footers/Footer";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import "focus-visible/dist/focus-visible";
import {Box, Flex, VStack} from '@chakra-ui/react';
import Sidebar, {NavItem} from './components/Sidebar'
import {accountArr, getAccountArrAction} from "./features/accountBC/AccountBCSlice";
import {getReceiptDBConnectUserAction} from "./features/accountDB/AccountDBSlice";
import detectEthereumProvider from '@metamask/detect-provider';
import { useGlobalToast } from './features/toast/hooks/useGlobalToast';
import {addressHasIdentityBoolAction} from "./features/accountBC/AccountBCSlice";

function App() {
    useGlobalToast();
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log("is this dispatch metamask useEffect running?")
        dispatch(getAccountArrAction());
        const provider: any = detectEthereumProvider();
        console.log("this is provider:", provider);
        provider.then((actualProvider: any) => {
            console.log('what is this actual provider?', actualProvider);
            actualProvider.on('accountsChanged', (accounts: any) => {
                console.log('accountDB changed!')
                dispatch(accountArr([]));
                dispatch(getAccountArrAction());
                window.location.reload();
            });
            actualProvider.on('chainChanged', (chainId: any) => {
                window.location.reload();
            })
        });
    }, [])

    useEffect(() => {
        console.log("is there a wallet accountDB connected? Now check for NFI")
        if (accountArr.length !== 0) {
            dispatch(addressHasIdentityBoolAction());
            dispatch(getReceiptDBConnectUserAction());
        }
    }, [accountArr])

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
                <Box>
                    <Navbar/>
                </Box>
                <Box
                    flexGrow={1}
                    //border={'2px solid yellow'}
                    display={'flex'}
                >
                    <Sidebar/>
                </Box>
            </Flex>
            <Footer/>
        </Box>
    )
}

export default App;
