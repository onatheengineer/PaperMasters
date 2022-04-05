import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from './app/hooks';
import Navbar from "./components/Navbar";
import Footer from "./components/Footers/Footer";
import {Routes, Route} from "react-router-dom";
import "focus-visible/dist/focus-visible";
import Web3 from "web3";
import type {FC} from 'react';
import {Box, Flex, VStack} from '@chakra-ui/react';
import Sidebar, {NavItem} from './components/Sidebar'
import {accountsArr, requestUserWalletAction} from "./features/UserWalletSlice";
import {mintNFIAsyncAction} from "./features/MintNFISlice";
import {addressHasIdentityBoolAction} from "./features/MintedNFISlice";
import { createBreakpoints } from '@chakra-ui/theme-tools'
import {getReceiptDBConnectUserAction} from "./features/AccountSlice";
import Identity from "./components/pages/Identity";
import detectEthereumProvider from '@metamask/detect-provider';
import Search from "./components/pages/Search";
import Register from "./components/pages/Register";


function App() {
    const dispatch = useAppDispatch();
    const requestWalletArr = useAppSelector((state) => state.register.accounts);

    useEffect(  () => {
        console.log("is this dispatch metamask useEffect running?")
        dispatch(requestUserWalletAction());

        const provider: any = detectEthereumProvider();
        console.log("this is provider:", provider);
        provider.then((actualProvider: any) => {
            console.log('what is this actual provider?', actualProvider);
            actualProvider.on('accountsChanged', (accounts: any) => {
                console.log('account changed!')
                dispatch(accountsArr([]));
                dispatch(requestUserWalletAction());
                window.location.reload();
            });
            actualProvider.on('chainChanged', (chainId:any) => {
                window.location.reload();
            })
        });
    }, [] )


    useEffect( () => {
        console.log("is there a wallet account connected? Now check for NFI")
        if (requestWalletArr.length !== 0) {
            dispatch(addressHasIdentityBoolAction(requestWalletArr[0]));
            dispatch(getReceiptDBConnectUserAction());
        }
    }, [requestWalletArr] )


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
};

export default App;
