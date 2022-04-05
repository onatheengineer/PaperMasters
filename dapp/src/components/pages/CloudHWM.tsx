import * as React from 'react';
import type {FC} from 'react';
import {
    Stack, Box, Flex, Button, Text, VStack, useBreakpointValue } from '@chakra-ui/react';
import {Route, Routes} from "react-router-dom";
import WithAction from "../Navbar";
import BackgroundLogo from '../../assets/legoLavendarheadercroped.png';
import SecondFooterHome from '../Footers/SecondFooterHome';




interface Interface {

}

export const CloudHWM: FC<Interface>=()=> {

        return (
            <Flex
                w={'100vw'}
                h={'60vh'}
                //backgroundImage={BackgroundLogo}
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
                            CloudHWM
                        </Text>
                        <Text
                            color={'white'}
                            fontWeight={300}
                            lineHeight={1.2}
                            fontSize={useBreakpointValue({base: '4xl', md: '3xl'})}>
                            Bringing Hardware Protection to Blockchain Miners (coming soon)
                        </Text>
                        <Stack direction={'row'}>
                            <Button
                                bg={'whiteAlpha.300'}
                                rounded={'full'}
                                color={'white'}
                                _hover={{bg: 'whiteAlpha.500'}}>
                                Show me more
                            </Button>
                        </Stack>
                    </Stack>
                </VStack>
            </Flex>
    )
};

export default CloudHWM;