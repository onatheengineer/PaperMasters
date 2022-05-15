import * as React from 'react';
import {useState, useEffect, MouseEventHandler, useMemo} from "react";
import Web3 from "web3";
//import {getFilledAccountsArr}
import type {FC} from 'react';
import {
    FormControl, FormLabel, Input, Stack, Box, Button, Heading, Text, Flex,
    Center,
    FormErrorMessage,
    Divider,
    InputGroup,
    InputRightAddon,
    InputRightElement,
    PopoverContent,
    PopoverBody,
    PopoverTrigger,
    Popover,
    Portal,
    MenuItem,
    InputLeftElement,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Container, VStack, SimpleGrid, GridItem, Select,
    useBreakpointValue, border,
} from '@chakra-ui/react';

export const Report:FC=()=> {

    const[count, setCount] = useState(0)

    const increament=()=>{
        setCount(count+1);
    }

    const decreament=()=> {
        if (count > 0) {
            setCount(count - 1);
        }
    }
        return (
            <Box>Comming Soon...</Box>
        )
    };

export default Report;