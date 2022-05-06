//import React { useEffect, useState, useRef } from "react";
import type {FC} from 'react'
import {
    Box, Heading, useMergeRefs,
    Button,
    Flex,
    Menu, MenuButton, MenuDivider,
    MenuItem, MenuList, StackDivider, Text, useColorModeValue, Stack, Collapse, useDisclosure,
} from '@chakra-ui/react';
import RoutesRoutes from "../../app/RoutesRoutes";
import {Link as ReachLink} from "react-router-dom";
import {setRef} from "@mui/material";
import PageForum from "./PageForum";
import React from "react";




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
            {/*    <RoutesRoutes/>*/}
            {/*</Flex>*/}
            <Box
                flex={'auto'}
                border={'2px solid'}
                borderColor={'pmpurple.10'}
                bgColor={'pmpurple.1'}
                borderRadius={'10px'}
                m={30}
            >
                <Box
                flexGrow={1}
                m={8}
                >
                    <Heading
                        textAlign={'center'}
                        fontSize={'40px'}
                        fontWeight={'600'}
                        fontStyle={'bold'}
                    >
                        Learning Center
                    </Heading>
                </Box>
                <PageForum title={'What is a Non-Fungible-Identity (NFI)?'} body={'NFIs are transparent identites...'} />
                <PageForum title={'Benefits of becoming a PaperMaster?'} body={'You can....'} />
                <PageForum title={'What is NFI Protection and Validation?'} body={'You can....'} />
                <PageForum title={'How to search the NFI Catalog'} body={'You can....'} />
            </Box>
        </Flex>
    )
};

export default Learn;

