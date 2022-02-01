import React from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from './app/hooks';
import Navbar from "./components/molecules/Navbar";
import Footer from "./components/molecules/Footers/Footer";
import {
  Routes,
  Route
} from "react-router-dom";
import {produce} from 'immer';
import Web3 from "web3";
import SocialMediaLinksFooter from "./components/molecules/Footers/SocialMediaLinksFooter";
import {FaBookmark} from "react-icons/fa";
import CommunityForum from "./components/pages/CommunityForum";
import type {FC} from 'react';
import { Box, Flex} from '@chakra-ui/react';
import Sidebar, {NavItem} from './components/molecules/Sidebar'


function App() {

    return (
        <Box>
            <Navbar/>
            <Sidebar/>

            <Footer/>
            <SocialMediaLinksFooter/>

        </Box>
    )
};

export default App;
