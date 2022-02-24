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
import {RequestAccountsAsyncActionSaga} from "./features/RequestWalletAccountSlice";
import {mintNFIAsyncActionSaga} from "./features/MintNFISlice";
import {addressHasIdentityBoolActionSaga} from "./features/MintedNFISlice";


function App() {
    const dispatch = useAppDispatch();
    const accountsArr = useAppSelector((state) => state.register.accounts);

    useEffect( () => {
        console.log("is this dispatch metamask useEffect running?")
        dispatch(RequestAccountsAsyncActionSaga());
    }, [] )

    useEffect( () => {
        console.log("is there a wallet account connected? Now check for identity")
        if (accountsArr.length !== 0) {
            dispatch(addressHasIdentityBoolActionSaga(accountsArr[0])); }
    }, [accountsArr] )


    return (
        <Box>
            <Navbar/>
            <Sidebar/>
            <Footer/>
        </Box>
    )
};

export default App;
