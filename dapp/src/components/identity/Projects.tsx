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
import {AiOutlineComment} from "react-icons/ai";
import ImageArchitect1 from "../../assets/img/ImageArchitect1.png";
import ImageArchitect2 from "../../assets/img/ImageArchitect2.png";
import ImageArchitect3 from "../../assets/img/ImageArchitect3.png";
import {Carousel } from 'react-responsive-carousel';
import Mentions from "./mentions/Mentions";
import DisplayMentions from "./mentions/DisplayMentions";




interface Interface {

}


export const Projects:FC<Interface>=()=> {


    const {walletAccount} = useParams();

    const filledAccountsArr = useAppSelector((state) => state.register.accounts);


    return (
        <HStack
        h={'455px'}
        >
            <Box
                w={'50%'}
                p="16px"
                //my="24px"
                //mx={{xl: '32px'}}
                borderRadius='15px'
                bg='white'
                px="24px"
                //border={'1px solid red'}
                h={'100%'}
            >
                <Box
                    //border={'1px solid blue'}
                    // borderBottom={'1px solid'}
                    // borderColor={'pmpurple.6'}
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
                <Divider
                    border={'1px solid'}
                    borderColor={'pmpurple.8'}
                />
                <Box px="5px"
                     //border={'1px solid orange'}
                >
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

                    </Grid>
                </Box>
            </Box>
            <Box
                w={'50%'}
                p="16px"
                //my="24px"
                //mx={{xl: '32px'}}
                borderRadius='15px'
                bg='white'
                px="24px"
                //border={'1px solid red'}
                h={'100%'}
                >
                <Mentions/>
            </Box>

        </HStack>
    )
};

export default Projects;