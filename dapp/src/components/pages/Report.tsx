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
    FlexProps, chakra, Center, Image, Avatar, Progress, HTMLChakraProps, FormHelperText, FormErrorMessage,
} from '@chakra-ui/react';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import {useAppSelector} from "../../app/hooks";
import { ReactNode, ReactText } from 'react';
import Logo from '../../assets/Logo';
import Sidebar from "../Sidebar";

interface Interface {

}

export const Report: FC<Interface>=(props: HTMLChakraProps<'form'>)=> {


    return (
        <Flex>
            this page will be to report an NFI

        </Flex>
    )
};

export default Report;