import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from './app/hooks';
import Navbar from "./components/Navbar";
import Footer from "./components/Footers/Footer";
import {Routes, Route} from "react-router-dom";

import Web3 from "web3";
import type {FC} from 'react';
import { Box, Flex} from '@chakra-ui/react';
import Sidebar, {NavItem} from './components/Sidebar'
import {requestAccountsAsyncAction} from "./features/RequestWalletSlice";
import {mintNFIAsyncAction} from "./features/MintNFISlice";
import {addressHasIdentityBoolAction, putReceiptDBAction, getReceiptDBAction} from "./features/MintedNFISlice";
import { createBreakpoints } from '@chakra-ui/theme-tools'



function App() {
    const dispatch = useAppDispatch();
    const requestWalletArr = useAppSelector((state) => state.register.accounts);

    useEffect( () => {
        console.log("is this dispatch metamask useEffect running?")
        dispatch(requestAccountsAsyncAction());
    }, [] )

    useEffect( () => {
        console.log("is there a wallet account connected? Now check for identity")
        if (requestWalletArr.length !== 0) {
            dispatch(addressHasIdentityBoolAction(requestWalletArr[0]));
            dispatch(putReceiptDBAction());
        }
    }, [requestWalletArr] )


    return (
        <Box
            border={'2px solid'} borderColor={"pmpurple.8"}
        >
            <Navbar/>
            <Sidebar/>
            <Footer/>
        </Box>
    )
};

export default App;
