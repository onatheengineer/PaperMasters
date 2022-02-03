import React, {useState, useEffect} from "react"
import Web3 from "web3";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import RegisterSlice, {accountsArr, statusOfArr} from '../features/RegisterSlice';
import {Button, Flex, Menu, MenuButton, MenuItem} from "@chakra-ui/react";
import detectEthereumProvider from '@metamask/detect-provider';
import { MetamaskStateProvider } from "use-metamask";
import { ethers } from "ethers";
import { useMetamask } from "use-metamask";
import {Link as ReachLink} from "react-router-dom";
import {SiSololearn} from "react-icons/si";


export const ConnectWalletButton =()=> {
    return (
        <Flex alignItems={'center'}>
            <Menu>
                <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    size='lg'
                    minW={0}>
                    <MenuItem as={ReachLink} to='/' fontSize={'16px'} icon={<SiSololearn fontSize={'16px'}/>}>Connect
                        Wallet</MenuItem>
                </MenuButton>
            </Menu>
        </Flex>
    )
};


export const ConnectAccounts =()=> {



    return (

            <Menu>
                {/*<div>{accounts?.map((el) => {*/}
                {/*    return <div>Account: {el}</div>*/}
                {/*})}</div>*/}
            </Menu>


    );
};

export default ConnectAccounts;