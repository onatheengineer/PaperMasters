import * as React from 'react';
import type {FC} from 'react';
import {Link as ReachLink, useParams} from "react-router-dom";
import {
    Avatar, AvatarGroup, Box, Button, Flex, Grid, GridItem, Icon, Image, Link, MenuItem,
    Stack, Switch, Text, useColorModeValue, HStack, useDisclosure, Tooltip, VStack,
    Container, AspectRatio, AvatarBadge, Divider, Center, InputRightElement, useStyleConfig,
    TabPanel, TabPanels, TabList, Tabs, Tab, Select, Heading, Spacer,
} from "@chakra-ui/react";
import {useMemo} from "react";
import {useAppSelector} from "../../app/hooks";
import {FaFacebook, FaInstagram, FaPlus, FaTwitter} from "react-icons/fa";
import ImageArchitect1 from "../../assets/img/ImageArchitect1.png";
import ImageArchitect2 from "../../assets/img/ImageArchitect2.png";
import ImageArchitect3 from "../../assets/img/ImageArchitect3.png";
import {Carousel } from 'react-responsive-carousel';




interface Interface {

}


export const Projects:FC<Interface>=()=> {



    const {walletAccount} = useParams();

    const filledAccountsArr = useAppSelector((state) => state.register.accounts);


    return(

        <Box
            p="16px"
            my="24px"
            mx={{xl: '32px'}}
            borderRadius='15px'
            bg='white'
            px="24px"
        >
            <Box
                //border={'1px solid blue'}
            >
                <HStack>
                    <Heading mb="18px">
                        <Flex direction="column">
                            <Text mb={'5px'} fontSize="18px" color={'pmpurple.13'} fontWeight="bold" align={'left'}>
                                Projects
                            </Text>
                            <Text fontSize="15px" color={'pmpurple.13'} fontWeight="400" align={'left'}>
                                PaperMasters protect the Blockchain
                            </Text>
                        </Flex>
                    </Heading>
                    <Spacer/>
                    <Button
                        //style={{border: '1px solid #b59eb5'}}
                        px="6px"
                        py={'4px'}
                        //bg="transparent"
                        color={'pmpurple.13'}
                        border="1px solid"
                        borderColor={'pmpurple.2'}
                        //borderRadius="15px"
                        //minHeight={{sm: "200px", md: "100%"}}
                        rightIcon={<FaPlus fontSize="10px"/>}
                    >
                            <Text fontSize="sm" fontWeight="bold">
                                Add Project
                            </Text>
                    </Button>
                </HStack>
            </Box>

            <Box px="5px">
                <Grid
                    templateColumns={{sm: "1fr", md: "1fr 1fr", xl: "repeat(5, 1fr)"}}
                    templateRows={{sm: "1fr 1fr 1fr auto", md: "1fr 1fr", xl: "1fr"}}
                    gap="24px"
                >

                    <Flex style={{border: '1px solid #b59eb5'}} mx={{xl: "15px"}} m='5px'
                          borderRadius='15px' bg='white' p="16px" direction="column"
                    justifyContent={'space-evenly'}
                    >
                        {/*<Carousel autoPlay={true} showArrows={true} >*/}
                        <Box mb="20px" position="relative" borderRadius="15px">
                            <Image src={ImageArchitect1} borderRadius="15px"/>
                            <Box
                                w="100%"
                                h="100%"
                                position="absolute"
                                top="0"
                                borderRadius="15px"
                                bg="linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)"
                            ></Box>
                        </Box>
                        <Flex direction="column">
                            <Text fontSize="md" color="gray.500" fontWeight="600" mb="10px">
                                Project #1
                            </Text>
                            <Text
                                fontSize="xl"
                                color={'pmpurple.13'}
                                fontWeight="bold"
                                mb="10px"
                            >
                                My future project...
                            </Text>
                            <Text fontSize="md" color={'pmpurple.13'} fontWeight="400" mb="20px">
                                As I look through my bucket list, I find my next endeavor...
                            </Text>
                            <Flex justifyContent="space-between">
                                <Button
                                    variant="outline"
                                    color={'pmpurple.13'}
                                    minW="110px"
                                    h="36px"
                                    fontSize="xs"
                                    px="1.5rem"
                                >
                                    VIEW PROJECT
                                </Button>
                                <AvatarGroup size="xs">
                                    <Avatar name="Nautica Nieder" src={'PMlogo.png'}/>
                                    <Avatar name="Ammon Nieder" src={'legoLavendar.png'}/>
                                    <Avatar name="Atlas Nieder" src={'legoLavendar.png'}/>
                                    <Avatar name="Elijah Early" src={'PMlogo.png'}/>
                                </AvatarGroup>
                            </Flex>
                        </Flex>
                        {/*</Carousel>*/}
                    </Flex>
                    {/*<Flex style={{border: '1px solid #b59eb5'}} mx={{xl: "15px"}} m='5px'*/}
                    {/*      borderRadius='15px' bg='white' p="16px" direction="column">*/}
                    {/*    <Box mb="20px" position="relative" borderRadius="15px">*/}
                    {/*        <Image src={ImageArchitect2} borderRadius="15px"/>*/}
                    {/*        <Box*/}
                    {/*            w="100%"*/}
                    {/*            h="100%"*/}
                    {/*            position="absolute"*/}
                    {/*            top="0"*/}
                    {/*            borderRadius="15px"*/}
                    {/*            bg="linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)"*/}
                    {/*        ></Box>*/}
                    {/*    </Box>*/}
                    {/*    <Flex direction="column">*/}
                    {/*        <Text fontSize="md" color="gray.500" fontWeight="600" mb="10px">*/}
                    {/*            Project #2*/}
                    {/*        </Text>*/}
                    {/*        <Text*/}
                    {/*            fontSize="xl"*/}
                    {/*            color={'pmpurple.13'}*/}
                    {/*            fontWeight="bold"*/}
                    {/*            mb="10px"*/}
                    {/*        >*/}
                    {/*            Back in the day*/}
                    {/*        </Text>*/}
                    {/*        <Text fontSize="md" color="gray.500" fontWeight="400" mb="20px">*/}
                    {/*            Drawing was the thing to do, now it's digital art.*/}
                    {/*        </Text>*/}
                    {/*        <Flex justifyContent="space-between">*/}
                    {/*            <Button*/}
                    {/*                variant="outline"*/}
                    {/*                colorScheme="purple"*/}
                    {/*                minW="110px"*/}
                    {/*                h="36px"*/}
                    {/*                fontSize="xs"*/}
                    {/*                px="1.5rem"*/}
                    {/*            >*/}
                    {/*                VIEW PROJECT*/}
                    {/*            </Button>*/}
                    {/*            <AvatarGroup size="xs">*/}
                    {/*                <Avatar name="Matthias Early" src={'legoLavendar.png'}/>*/}
                    {/*                <Avatar name="Zechariah Early" src={'PMlogo.png'}/>*/}
                    {/*                <Avatar name="Elijah Early" src={'legoLavendar.png'}/>*/}
                    {/*                <Avatar name="Andrew Nieder" src={'PMlogo.png'}/>*/}
                    {/*            </AvatarGroup>*/}
                    {/*        </Flex>*/}
                    {/*    </Flex>*/}
                    {/*</Flex>*/}
                    {/*<Flex style={{border: '1px solid #b59eb5'}} mx={{xl: "15px"}} m='5px'*/}
                    {/*      borderRadius='15px' bg='white' p="16px" direction="column">*/}
                    {/*    <Box mb="20px" position="relative" borderRadius="15px">*/}
                    {/*        <Image src={ImageArchitect3} borderRadius="15px"/>*/}
                    {/*        <Box*/}
                    {/*            w="100%"*/}
                    {/*            h="100%"*/}
                    {/*            position="absolute"*/}
                    {/*            top="0"*/}
                    {/*            borderRadius="15px"*/}
                    {/*            bg="linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)"*/}
                    {/*        ></Box>*/}
                    {/*    </Box>*/}
                    {/*    <Flex direction="column">*/}
                    {/*        <Text fontSize="md" color={'pmpurple.13'} fontWeight="600" mb="10px">*/}
                    {/*            Project #3*/}
                    {/*        </Text>*/}
                    {/*        <Text*/}
                    {/*            fontSize="xl"*/}
                    {/*            color={'pmpurple.13'}*/}
                    {/*            fontWeight="bold"*/}
                    {/*            mb="10px"*/}
                    {/*        >*/}
                    {/*            Nowadays*/}
                    {/*        </Text>*/}
                    {/*        <Text fontSize="md" color={'pmpurple.13'} fontWeight="400" mb="20px">*/}
                    {/*            Different people have different taste, especially various*/}
                    {/*            types of NFTs.*/}
                    {/*        </Text>*/}
                    {/*        <Flex justifyContent="space-between">*/}
                    {/*            <Button*/}
                    {/*                variant="outline"*/}
                    {/*                color={'pmpurple.13'}*/}
                    {/*                minW="110px"*/}
                    {/*                h="36px"*/}
                    {/*                fontSize="xs"*/}
                    {/*                px="1.5rem"*/}
                    {/*            >*/}
                    {/*                VIEW PROJECT*/}
                    {/*            </Button>*/}
                    {/*            <AvatarGroup size="xs">*/}
                    {/*                <Avatar name="Nautica Nieder" src={'PMlogo.png'}/>*/}
                    {/*                <Avatar name="Ammon Nieder" src={'legoLavendar.png'}/>*/}
                    {/*                <Avatar name="Nautica Nieder" src={'PMlogo.png'}/>*/}
                    {/*                <Avatar name="Ammon Nieder" src={'legoLavendar.png'}/>*/}
                    {/*            </AvatarGroup>*/}
                    {/*        </Flex>*/}
                    {/*    </Flex>*/}
                    {/*</Flex>*/}

                </Grid>
            </Box>
        </Box>


    )

};

export default Projects;