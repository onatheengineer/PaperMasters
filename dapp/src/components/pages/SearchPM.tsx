import * as React from 'react';
import {useState, useEffect, useMemo} from "react";
import type {FC} from 'react'
import Web3 from "web3";
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
    FlexProps, Avatar, Switch, Image, AvatarGroup,
} from '@chakra-ui/react';
import {FaCube, FaFacebook, FaGithub, FaGoogle, FaInstagram, FaPlus, FaTwitter} from 'react-icons/fa';
import { PMNFI } from '../atoms/PMNFI';
import { DividerWithText } from '../atoms/DividerWithText';
import { Link } from '../atoms/Link';
import {useAppSelector} from "../../app/hooks";
import { ReactNode, ReactText } from 'react';
import PMLogo from '../../PMGIMPResized.png';
import Logo from '../atoms/Logo';
import Sidebar from "../molecules/Sidebar";
import Card from "../molecules/Card/Card";
import CardHeader from "../molecules/Card/CardHeader";
import CardBody from "../molecules/Card/CardBody";
import ImageArchitect1 from "../../assets/img/ImageArchitect1.png";
import ImageArchitect2 from "../../assets/img/ImageArchitect2.png";
import ImageArchitect3 from "../../assets/img/ImageArchitect3.png";
import BillingRow from "../molecules/Tables/BillingRow";
import Tables from "../molecules/Tables/Tables";




interface Interface {

}

export const Search:FC<Interface>=()=>{

return(


        <Flex >

            <Flex   borderRight="1px solid " borderColor='#daceda'>
                <Sidebar/>
            </Flex>

                    <Box flex='1' bg='#e6dee6' style={{border: '0px solid #5c415c'}}>

                        <Tables/>
                    </Box>

        </Flex>

        )
    };

export default Search;


// // const accounts = useAppSelector((state) => state.PMI.accounts);
//     // const status = useAppSelector((state) => state.PMI.status);
//     //
//     // const contract = new web3.eth.Contract(MintIdentity.abi as any, MintIdentity.networks['5777'].address);
//     // console.log(MintIdentity);
//     //
//     //     useEffect(() => {
//     //         console.log("accoutn use effect");
//     //         console.log(account);
//     //         account.map((eachAcc) => {
//     //             console.log(eachAcc);
//     //             contract.methods.balanceOf(eachAcc).call().then((values: any) => {
//     //                 console.log(values);
//     //                 for (let i = 0; i < values; i++) {
//     //                     console.log(i)
//     //                     contract.methods.getTokenIdentity(i).call().then((ident: any) => {
//     //                         console.log(ident);
//     //                     });
//     //                 }
//     //             }, (error: any) => {
//     //                 console.log(error);
//     //             })
//     //         })
//     //
//     //     }, [account]);
//
//         // contract.methods.totalSupply().call().then((ts: any) => {
//         //     console.log(ts);
//         // }, (error: any) => {
//         //     console.log(error)
//         // })
//
//         //
//         //
//         // const [name, setName] = useState<string | null>(null);
//         // const [familiarName, setFamiliarName] = useState<string | null>(null);
//         // const [slogan, setSlogan] = useState<string | null>(null);
//         // const [org, setOrg] = useState<string | null>(null);
//         // const [descr, setDescr] = useState<string | null>(null);
//         // const [url, setUrl] = useState<string | null>(null);
//         // const [email, setEmail] = useState<string | null>(null);
//         // const [account, setAccount] = useState<string[]>([]);
//         // const [identities, setIdentities] = useState({});
//         //
//         // const nameChange = (e: any) => {
//         //     setName(e.target.value);
//         // };
//         // const familiarNameChange = (e: any) => {
//         //     setFamiliarName(e.target.value);
//         // };
//         // const sloganChange = (e: any) => {
//         //     setSlogan(e.target.value);
//         // };
//         // const orgChange = (e: any) => {
//         //     setOrg(e.target.value);
//         // };
//         // const descrChange = (e: any) => {
//         //     setDescr(e.target.value);
//         // };
//         // const urlChange = (e: any) => {
//         //     setUrl(e.target.value);
//         // };
//         // const emailChange = (e: any) => {
//         //     setEmail(e.target.value);
//         // };
//
//
//         //
//         //
//         // if (status === "loading") {
//         //     return (<Sidebar>
//         //         <div>Loading the Accounts</div>
//         //     </Sidebar>);
//         // }
//         // return (
//     //     accounts.map(el => {
//     //     return (<div>
//     //         {el}
//     //     </div>)
//     // })