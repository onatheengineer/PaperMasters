//import React { useEffect, useState, useRef } from "react";
import type {FC} from 'react'
import {
    Box, Heading, useMergeRefs,
    Button,
    Flex,
    Menu, MenuButton, MenuDivider,
    MenuItem, MenuList, StackDivider, Text, useColorModeValue, Stack, Collapse, useDisclosure,
} from '@chakra-ui/react';
import Sidebar from "../Sidebar";
import {Link as ReachLink} from "react-router-dom";
import {setRef} from "@mui/material";
import PageForum from "./PageForum";




export const Learn:FC=()=> {

    // const LearnForumPage [
    //     <PageForum title={'Learn about NFIs'} body={'dfgfdhdftgyertg'}/>,
    //     <PageForum title={'What is a Non-Fungiable-Identity (NFI)'} body={'dfgfdhdftgyertg'}/>,
    //     <PageForum title={'What is the difference between a NFT and PaperMasters NFI'} body={'dfgfdhdftgyertg'}/>,
    //     <PageForum title={'What are the benefits of having a PaperMasters NFI?'} body={'dfgfdhdftgyertg'}/>,
    //     <PageForum title={'Mint PaperMasters NFI required fields'} body={'using your name field combined with the ' +
    //         'description field and an arbatary seceret word obtained via a hidden generator is used to create a uniqiue ' +
    //         '64bit hash (66 charactors onces the 0x is added to it)'}/>,
    // ]


    return (

        <Flex
            w={"100%"}
        >
            {/*<Flex >*/}
            {/*    <Sidebar/>*/}
            {/*</Flex>*/}
            <Box flex={'auto'}>
                <PageForum forumPageHeader={'FAQ'} title={'What is an NFI'} body={'An NFI is a Non-Fungible Token that....'} />
                <PageForum forumPageHeader={'What can I do with my NFI'} title={'WWhat can you not do with it'} body={'-You can....'} />
            </Box>
        </Flex>
    )
};

export default Learn;

