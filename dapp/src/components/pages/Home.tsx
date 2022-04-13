import {
    Stack, Box, Flex, Button, Text, VStack, useBreakpointValue } from '@chakra-ui/react';
import React from "react";
import {} from '@chakra-ui/react';
import BackgroundLogo from "../../assets/legoLavendarheadercroped.png";
import SecondFooter from '../Footers/SecondFooterHome'

export default function Home() {
    return (
        <Flex
        h={'100%'}
        border={'1px solid green'}
        flexDirection={'column'}
        >
            <Flex
                w={'100vW'}
                alignItems={'stretch'}
                flexGrow = {1}
                //h={'80vh'}
                backgroundImage={BackgroundLogo}
                backgroundSize={'cover'}
                backgroundPosition={'center center'}
            >
                <VStack
                    w={'full'}
                    justify={'center'}
                    px={useBreakpointValue({base: 4, md: 8})}
                    bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
                    <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
                        <Text
                            color={'white'}
                            fontWeight={600}
                            lineHeight={1.2}
                            fontSize={useBreakpointValue({base: '3xl', md: '6xl'})}>
                            The PaperMasters
                        </Text>
                        <Text
                            color={'white'}
                            fontWeight={300}
                            lineHeight={1.2}
                            fontSize={useBreakpointValue({base: '4xl', md: '3xl'})}>
                            Providing protection and legitimacy for People, Companies and Contracts by bringing Non-Fungable-Identities (NFIs) to the Blockchain
                        </Text>
                    </Stack>
                </VStack>

            </Flex>
            <Flex
            flexShrink={1}
            >
                <SecondFooter/>
            </Flex>

        </Flex>
    )
}