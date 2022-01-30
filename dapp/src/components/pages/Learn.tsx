import React, { useEffect, useState } from "react";
import type {FC} from 'react'
import {
    Box, Heading,
    Button,
    Flex,
    Menu, MenuButton, MenuDivider,
    MenuItem, MenuList, StackDivider, Text, useColorModeValue, Stack, Collapse, useDisclosure,
} from '@chakra-ui/react';
import Sidebar from "../molecules/Sidebar";
import {Link as ReachLink} from "react-router-dom";
import CollapseButton from "../atoms/CollapseButton";


interface Interface {

}

export const Learn:FC<Interface>=()=> {

    return (

        <Flex justify-content={'space-between'}>
            <Flex >
                <Sidebar/>
            </Flex>
            <Box flex='auto' mx={{sm: '12px', xl: '18px'}} borderRadius='15px' bg='white' p="26px"
                 px="24px" my={{sm: "14px", xl: "16px"}}>

                <Heading fontSize={'26px'}>
                    Frequently Asked Questions
                </Heading>

                <Stack
                    divider={<StackDivider borderColor='pmpurple.3'/>}
                    spacing={4}
                    justify={''}
                    px={'24px'}
                >
                    <CollapseButton title={'What is a Non-Fungiable-Identity (NFI)'} body={'dfgfdhdftgyertg'}/>
                    <CollapseButton title={'What is the difference between a NFT and PaperMasters NFI'} body={'dfgfdhdftgyertg'}/>
                    <CollapseButton title={'What are the benefits of having a PaperMasters NFI?'} body={'dfgfdhdftgyertg'}/>
                    <CollapseButton title={'Mint PaperMasters NFI required fields'} body={'using your name field combined with the description field and an arbatary seceret word obtained via a hidden generator is used to create a uniqiue 64bit hash (66 charactors onces the 0x is added to it)'}/>

                    <StackDivider borderColor='pmpurple.3'/>

                </Stack>

            </Box>

        </Flex>
    )
};

export default Learn;

//What is a Non-Fungiable-Identity (NFI)


