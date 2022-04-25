import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from './app/hooks';
import Navbar from "./components/Navbar";
import Footer from "./components/Footers/Footer";
import "focus-visible/dist/focus-visible";
import {Box, Flex, VStack} from '@chakra-ui/react';
import Sidebar, {NavItem} from './components/Sidebar'
import {accountArr, accountArrAction, accountBCselectors} from "./features/accountBC/AccountBCSlice";
import detectEthereumProvider from '@metamask/detect-provider';
import {select} from "redux-saga/effects";
//import {ReactQueryDevTools} from 'react-query/devtools';



function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log("is this dispatch metamask useEffect running?")
        dispatch(accountArrAction());
        const providerPromise = detectEthereumProvider();
        console.log("this is provider:", providerPromise);
        providerPromise.then((provider: any) => {
            console.log('what is this actual provider?', provider);
            provider.on('accountsChanged', (accounts: any) => {
                console.log('accountDB changed!')
                dispatch(accountArr([]));
                dispatch(accountArrAction());
                window.location.reload();
            });
            provider.on('chainChanged', (chainId: any) => {
                window.location.reload();
            })
        });
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
