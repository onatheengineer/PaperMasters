import React, {useState, useEffect} from "react"
import Web3 from "web3";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import MintIdentity from "../../contracts/MintIdentity.json"
import {accountsArr, statusOfArr} from '../../features/PMISlice';
import { searchExistingPMIdentitiesArr } from '../../features/SearchSlice';
import {Avatar, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList} from "@chakra-ui/react";
import PMLogo from "../../legoLavendar.png";
import {Link as ReachLink} from "react-router-dom";


export const ConnectAccounts =()=> {
    const dispatch = useAppDispatch();
    //entry into web3 API, communicating with blockchain. find out how to use givenProvider and who it currently is set to...ie. ethernet, one, etc.
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const accounts = useAppSelector((state) => state.PMI.accounts);
    const status = useAppSelector((state) => state.PMI.status);

    useEffect(() => {
        dispatch(statusOfArr('loading'));
            web3.eth.requestAccounts()
                .then((acc: string[]) => {
                    dispatch(accountsArr(acc));
                    dispatch(statusOfArr('succeeded'));
                }, (error)=>{
                    dispatch(accountsArr([]));
                    dispatch(statusOfArr('failed'))
                });
    },[])

    useEffect(() => {
        console.log('account has changed');
        console.log(accounts);
    },[accounts])



    // const Web3 = require("web3");
    // const ethEnabled = () => {
    //     if (window.web3) {
    //         window.web3 = new Web3(window.web3.currentProvider);
    //         window.ethereum.enable();
    //         return true;
    //     }
    //     return false;
    // }
    //
    //
    // const Web3 = require("web3");
    // const ethEnabled = async () => {
    //     if (window.ethereum) {
    //         await window.ethereum.send('eth_requestAccounts');
    //         window.web3 = new Web3(window.ethereum);
    //         return true;
    //     }
    //     return false;
    // }



    return (
        <Menu>
            <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                    size={'sm'}
                    src={PMLogo}
                />
            </MenuButton>
            <MenuList>
                <MenuItem> Connect Wallet</MenuItem>
                <MenuItem as={ReachLink} to='/profile'>Manage Account</MenuItem>
                <MenuDivider/>
                <MenuItem>Add Tokens to your PM Identity</MenuItem>
                <div>{accounts?.map((el) => {
                    return <div>Account: {el}</div>
                })}</div>
            </MenuList>
        </Menu>
    );
};



export default ConnectAccounts;