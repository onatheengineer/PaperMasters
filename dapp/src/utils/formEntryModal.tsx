import * as React from 'react';
import type {FC} from 'react';
import {useRef} from 'react';
import {Link as ReachLink, useParams} from "react-router-dom";
import {
    Box, Button, Flex, Grid, GridItem, Icon, Image,
    Link, MenuItem, Stack, Text, useColorModeValue,
    HStack, useDisclosure, FormControl, FormLabel, Input,
    VStack, Container, AspectRatio, AvatarBadge, Divider, Center, InputRightElement, useStyleConfig,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from "@chakra-ui/react";

interface formEntryModalInterface{
    text: string,
}

export const formEnterModal:FC<formEntryModalInterface> = () => {

    const { isOpen, onToggle, onClose } = useDisclosure()
    const initialRef = useRef()
    const finalRef = useRef()

    return (
        <>
            <Button onClick={onToggle}>Open Modal</Button>
            {/*<Button ml={4} ref={finalRef}>*/}
            {/*    I'll receive focus on close*/}
            {/*    <Icon name="check-circle" size="24px" />*/}
            {/*</Button>*/}

            {/*<Modal*/}
            {/*    initialFocusRef={initialRef}*/}
            {/*    finalFocusRef={finalRef}*/}
            {/*    isOpen={isOpen}*/}
            {/*    onClose={onClose}*/}
            {/*>*/}
            {/*    <ModalOverlay />*/}
            {/*    <ModalContent>*/}
            {/*        <ModalHeader>Create your account</ModalHeader>*/}
            {/*        <ModalCloseButton />*/}
            {/*        <ModalBody pb={6}>*/}
            {/*            <FormControl>*/}
            {/*                <FormLabel>First name</FormLabel>*/}
            {/*                <Input ref={initialRef} placeholder='First name' />*/}
            {/*            </FormControl>*/}

            {/*            <FormControl mt={4}>*/}
            {/*                <FormLabel>Last name</FormLabel>*/}
            {/*                <Input placeholder='Last name' />*/}
            {/*            </FormControl>*/}
            {/*        </ModalBody>*/}

            {/*        <ModalFooter>*/}
            {/*            <Button colorScheme='blue' mr={3}>*/}
            {/*                Save*/}
            {/*            </Button>*/}
            {/*            <Button onClick={onClose}>Cancel</Button>*/}
            {/*        </ModalFooter>*/}
            {/*    </ModalContent>*/}
            {/*</Modal>*/}
        </>
    )
};

export default formEnterModal;