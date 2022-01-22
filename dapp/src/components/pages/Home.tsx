import {
    Stack,
    Flex,
    Button,
    Text,
    VStack,
    useBreakpointValue,
} from '@chakra-ui/react';
import React from "react";
import {} from '@chakra-ui/react';
import WithAction from "../molecules/Navbar";

import BackgroundLogo from '../../legoLavendarheadercroped.png';
import SecondFooterHome from '../molecules/SecondFooterHome';

export default function Home() {
    return (
       <div>
        <Flex
            w={'full'}
            h={'71vh'}
            backgroundImage={BackgroundLogo}
            backgroundSize={'cover'}
            backgroundPosition={'center center'}>
            <VStack
                w={'full'}
                justify={'center'}
                px={useBreakpointValue({ base: 4, md: 8 })}
                bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
                <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
                    <Text
                        color={'white'}
                        fontWeight={700}
                        lineHeight={1.2}
                        fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
                        The PaperMasters
                    </Text>
                    <Text
                        color={'white'}
                        fontWeight={300}
                        lineHeight={0.2}
                        fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
                        Bringing Legitimacy to the Blockchain
                    </Text>
                    <Stack direction={'row'}>
                        <Button
                            bg={'blue.400'}
                            rounded={'full'}
                            color={'white'}
                            _hover={{ bg: 'blue.500' }}>
                            Show me more
                        </Button>
                        <Button
                            bg={'whiteAlpha.300'}
                            rounded={'full'}
                            color={'white'}
                            _hover={{ bg: 'whiteAlpha.500' }}>
                            Show me more
                        </Button>
                    </Stack>
                </Stack>
            </VStack>
        </Flex>
           <Flex>
               <SecondFooterHome/>
           </Flex>
       </div>
    );
}