import React, { useEffect, useState, useRef } from "react";
import type {FC} from 'react'
import {
    Box, Heading, useMergeRefs,
    Button,
    Flex,
    Menu, MenuButton, MenuDivider,
    MenuItem, MenuList, StackDivider, Text, useColorModeValue, Stack, Collapse, useDisclosure,
} from '@chakra-ui/react';
import Sidebar from "../molecules/Sidebar";
import {Link as ReachLink} from "react-router-dom";
import {setRef} from "@mui/material";


interface InterfaceFORUM {
    title: string,
    body: string,
    pageHeading: string,
}

export const ForumPageTemplate:FC<InterfaceFORUM>=({title, body, pageHeading})=> {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const titleRef = useRef()


    //

    //

    //

    return (

        <Flex justify-content={'space-between'}>
            {/*<Flex >*/}
            {/*    <Sidebar/>*/}
            {/*</Flex>*/}

            <Box flex='auto' mx={{sm: '12px', xl: '18px'}} borderRadius='15px' bg='white' p="26px"
                 px="24px" my={{sm: "14px", xl: "16px"}}>

                <Heading fontSize={'26px'}>
                    {pageHeading}
                </Heading>

                <Stack
                    divider={<StackDivider borderColor='pmpurple.3'/>}
                    spacing={4}
                    justify={''}
                    px={'24px'}
                >
                    <Menu>
                        <MenuButton
                            as={Button}
                            onClick={() => {
                                setIsOpen(!isOpen)
                            }}
                            color='#5c415c'
                            size='md'
                            textAlign={'left'}
                            square={'full'}
                            variant={'link'}
                            cursor={'pointer'}
                            _hover={{color: '#906e90'}}
                            _active={{
                                color: '#906e90',
                                transform: 'scale(.98)'
                            }}
                            minW={0}>

                            {/*<Text ref={internalRef} fontSize="lg" color={'pmpurple.13'} fontWeight="bold">*/}
                            {/*    {title}*/}
                            {/*</Text>*/}
                        </MenuButton>
                        <Collapse in={isOpen} animateOpacity>
                            <Box
                                p='26px'
                                color='pmpurple.10'
                                mt='4'
                                bg='pmpurple.2'
                                rounded='md'
                                shadow='md'
                            >
                                <Text fontSize="md" color={'pmpurple.13'} fontWeight="bold">
                                    {body}
                                </Text>
                            </Box>
                        </Collapse>
                    </Menu>

                   /////

                    <StackDivider borderColor='pmpurple.3'/>

                </Stack>

            </Box>

        </Flex>
    )


};

export default ForumPageTemplate;

