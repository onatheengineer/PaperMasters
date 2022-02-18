import * as React from 'react';
import {useState, useEffect} from "react";
import Web3 from "web3";
import type {FC} from 'react';
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
import { Link } from '../../Link';
import {useAppSelector} from "../../app/hooks";
import { ReactNode, ReactText } from 'react';
import PMLogo from '../../assets/PMGIMPResized.png';
import Logo from '../../assets/Logo';
import Sidebar from "../Sidebar";


interface Interface {

}

export const Validate: FC<Interface>=()=> {

    return (
        <Flex>
                this page will have the NRC20 NFT mint contract and forum

        </Flex>
    )
};

export default Validate;