import React, {useState, useEffect} from "react"
import Web3 from "web3";
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import MintIdentity from "../../contracts/MintIdentity.json"
import { accountsArr } from '../../features/PMISlice';
import { searchExistingPMIdentitiesArr } from '../../features/SearchSlice';
import {Avatar, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList} from "@chakra-ui/react";
import PMLogo from "../../legoLavendar.png";


export const ConnectAccounts=()=> {

    const accounts = useAppSelector((state) => state.PMI.accounts);

        //entry into web3 API, communicating with blockchain.
    // find out how to use givenProvider and who it currently is set to...ie. ethernet, one, etc.
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

    const [account, setAccount] = useState<string[]>([]);

    useEffect(() => {
        web3.eth.requestAccounts()
            .then((acc: string[]) =>
            {
                setAccount(acc)
            });
    }, []);

    return(
        <Menu >
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
                <MenuItem>Connect Wallet</MenuItem>
                <MenuItem>Manage Account</MenuItem>
                <MenuDivider />
                <MenuItem>Add Tokens to your PM Identity</MenuItem>
            </MenuList>
        </Menu>
        );
};

export default ConnectAccounts;