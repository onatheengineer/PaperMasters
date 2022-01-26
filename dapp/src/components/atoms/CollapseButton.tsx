import React, { useEffect, useState } from "react";
import type {FC} from 'react'
import {
    Box, Heading,
    Button,
    Flex,
    Menu, MenuButton, MenuDivider,
    MenuItem, MenuList, StackDivider, Text, useColorModeValue, Stack, Collapse, useDisclosure,
} from '@chakra-ui/react';
import SidebarCreate from "../molecules/Sidebars/SidebarCreate";
import {Link as ReachLink} from "react-router-dom";


interface Interface {
    title: string,
    body: string,

}

export const CollapseButton:FC<Interface>=({title, body})=> {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
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
                <Text fontSize="xl" color={'pmpurple.13'} fontWeight="bold">
                    {title}
                </Text>
            </MenuButton>
            <Collapse in={isOpen} animateOpacity>
                <Box
                    p='40px'
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
    )
};

export default CollapseButton;