import * as React from 'react';
import {useState, useEffect} from "react";
import Web3 from "web3";
import type {FC} from 'react';
import MintIdentity from '../../contracts/MintIdentity.json';
import {
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Input,
    Stack,
    Box,
    Button,
    Heading,
    SimpleGrid,
    Text,
    useColorModeValue,
    VisuallyHidden,
    IconButton,
    CloseButton,
    Flex,
    Icon,
    Drawer,
    DrawerContent,
    useDisclosure,
    BoxProps,
    FlexProps,
} from '@chakra-ui/react';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import { Link } from '../atoms/Link';
import {useAppSelector} from "../../app/hooks";
import { ReactNode, ReactText } from 'react';
import PMLogo from '../../PMGIMPResized.png';
import Logo from '../atoms/Logo';
import Sidebar from "../molecules/Sidebar";
import PageRoutes from "../PageRoutes";

interface Interface {

}

export const Validate: FC<Interface>=()=> {

    // const accounts = useAppSelector((state) => state.PMI.accounts);
    // const status = useAppSelector((state) => state.PMI.status);
    //
    // const [name, setName] = useState<string | null>(null);
    // const [familiarName, setFamiliarName] = useState<string | null>(null);
    // const [slogan, setSlogan] = useState<string | null>(null);
    // const [org, setOrg] = useState<string | null>(null);
    // const [descr, setDescr] = useState<string | null>(null);
    // const [url, setUrl] = useState<string | null>(null);
    // const [email, setEmail] = useState<string | null>(null);
    // const [account, setAccount] = useState<string[]>([]);
    // const [identities, setIdentities] = useState({});
    //
    // const nameChange = (e: any) => {
    //     setName(e.target.value);
    // };
    // const familiarNameChange = (e: any) => {
    //     setFamiliarName(e.target.value);
    // };
    // const sloganChange = (e: any) => {
    //     setSlogan(e.target.value);
    // };
    // const orgChange = (e: any) => {
    //     setOrg(e.target.value);
    // };
    // const descrChange = (e: any) => {
    //     setDescr(e.target.value);
    // };
    // const urlChange = (e: any) => {
    //     setUrl(e.target.value);
    // };
    // const emailChange = (e: any) => {
    //     setEmail(e.target.value);
    // };


    // const contract = new web3.eth.Contract(MintIdentity.abi as any, MintIdentity.networks['5777'].address);
    // console.log(MintIdentity);

    // if (status === "loading") {
    //     return (<Sidebar>
    //         <div>Loading the Accounts</div>
    //     </Sidebar>);
    // }
    return (
        <Flex>


        </Flex>
    )
};

export default Validate;