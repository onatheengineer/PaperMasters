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
import {requestAccountsAsyncAction} from "./features/RequestWalletAccountSlice";
import {mintNFIAsyncAction} from "./features/MintNFISlice";
import {addressHasIdentityBoolAction} from "./features/MintedNFISlice";
import { createBreakpoints } from '@chakra-ui/theme-tools'
import {receiptDBAction} from "./features/AccountSlice";


function App() {
    const dispatch = useAppDispatch();
    const accountsArr = useAppSelector((state) => state.register.accounts);

    useEffect( () => {
        console.log("is this dispatch metamask useEffect running?")
        dispatch(requestAccountsAsyncAction());
    }, [] )

    useEffect( () => {
        console.log("is there a wallet account connected? Now check for identity")
        if (accountsArr.length !== 0) {
            dispatch(addressHasIdentityBoolAction(accountsArr[0]));
            dispatch(receiptDBAction());
        }
    }, [accountsArr] )


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
