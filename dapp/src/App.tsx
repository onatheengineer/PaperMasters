import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from './app/hooks';
import Navbar from "./components/Navbar";
import Footer from "./components/Footers/Footer";
import {
  Routes,
  Route
} from "react-router-dom";
import {produce} from 'immer';
import Web3 from "web3";
import {FaBookmark} from "react-icons/fa";
import type {FC} from 'react';
import { Box, Flex} from '@chakra-ui/react';
import Sidebar, {NavItem} from './components/Sidebar'
import {RequestAccountsAsyncAction} from "./features/RequestWalletAccountSlice";


function App() {
    const dispatch = useAppDispatch();

useEffect( () => {
    console.log("is this useEffect running")
    dispatch(RequestAccountsAsyncAction());
}, [] )


    return (
        <Box>
            <Navbar/>
            <Sidebar/>
            <Footer/>
        </Box>
    )
};

export default App;
