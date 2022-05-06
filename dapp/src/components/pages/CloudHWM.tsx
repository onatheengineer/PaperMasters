import * as React from 'react';
import type {FC} from 'react';
import {
    Stack, Box, Flex, Button, Text, VStack, useBreakpointValue, Container, Grid, GridItem, Heading, Link, Center
} from '@chakra-ui/react';
import {Link as ReachLink} from "react-router-dom";

export const CloudHWM: FC=()=> {
    return (
        <Flex
            flexDirection={'column'}
        >
            <Flex
                w={'100vw'}
                flexGrow={1}
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
            <Flex
            flexShrink={1}
            >
                <Box as={Container}
                     display={'flex'}
                     //flexGrow={1}
                     maxW="full"
                     py={16}
                     justifyContent={'space-evenly'}
                     alignItems={'flex-start'}
                     alignContent={'space-evenly'}
                     bg={'pmpurple.3'}
                     color={'pmpurple.12'}
                    //border={'1px solid'}
                    //borderColor={'pmpurple.8'}
                >
                    <Grid
                        templateColumns={{
                            base: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(2, 1fr)',
                            lg: 'repeat(3, 1fr)',
                        }}
                        gap={{base: '6', sm: '12', md: '16'}}>
                        <GridItem>
                            <Heading fontSize="xl" fontWeight="600" fontStyle={'bold'}>
                                <Link
                                    as={ReachLink}
                                    to="/learn"
                                >
                                    What is CloudHWM?
                                </Link>
                                <Text fontSize="lg" fontWeight="400">
                                    CloudHWM is...
                                </Text>
                            </Heading>
                        </GridItem>
                        <GridItem>
                            <Heading fontSize="xl" fontWeight="600" fontStyle={'bold'}>
                                <Link
                                    as={ReachLink}
                                    to="/learn"
                                >
                                    Benefits of CloudHWM service?
                                </Link>
                                <Text fontSize="lg" fontWeight="400">
                                    Hardware heat protection...
                                </Text>
                            </Heading>
                        </GridItem>
                        <GridItem>
                            <Heading fontSize="xl" fontWeight="600" fontStyle={'bold'}>
                                <Link
                                    as={ReachLink}
                                    to="/learn"
                                >
                                    What is CLoudHWM Protection?
                                </Link>
                                <Text fontSize="lg" fontWeight="400">
                                    Protection to Miners hardware...
                                </Text>
                            </Heading>
                        </GridItem>
                        {/*<GridItem>*/}
                        {/*    <Heading fontSize="xl" fontWeight="600" fontStyle={'bold'}>*/}
                        {/*        <Link*/}
                        {/*            as={ReachLink}*/}
                        {/*            to="/learn"*/}
                        {/*        >*/}
                        {/*            How to search the NFI Catalog*/}
                        {/*        </Link>*/}
                        {/*        <Text fontSize="lg" fontWeight="400" >*/}
                        {/*            NFIs are transparent identites...*/}
                        {/*        </Text>*/}
                        {/*    </Heading>*/}
                        {/*</GridItem>*/}
                    </Grid>
                </Box>
            </Flex>
        </Flex>
    )
};

export default CloudHWM;