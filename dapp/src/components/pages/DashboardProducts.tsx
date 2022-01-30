import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
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


interface Interface {
    title: string,
    body: string,

}

export const DashboardProducts:FC<Interface>=({title, body})=> {

    return (

        <Flex justify-content={'space-between'}>


            <Box flex='auto' mx={{sm: '12px', xl: '18px'}} borderRadius='15px' bg='white' p="26px" px="24px" my={{sm: "14px", xl: "16px"}}>

                <Heading variant={'contentHeader'}>
                    Frequently Asked Questions
                </Heading>

                <Stack
                    divider={<StackDivider borderColor='pmpurple.3'/>}
                    spacing={4}
                    justify={''}
                    px={'24px'}
                >
                     <Text fontSize="xl" color={'pmpurple.13'} fontWeight="bold">
                        {'lksdjhgfdlkfhgfd'}
                    </Text>

                    <Text fontSize="md" color={'pmpurple.13'} fontWeight="bold">
                        {'sdkjherktjherkjhtg'}
                    </Text>

                    <StackDivider borderColor='pmpurple.3'/>

                </Stack>
            </Box>
        </Flex>
        // <Outlet/>
    )
};

export default DashboardProducts;

//What is a Non-Fungiable-Identity (NFI)


