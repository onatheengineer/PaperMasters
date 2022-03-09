import * as React from 'react';
import type {FC} from 'react';
import {Link as ReachLink, useParams} from "react-router-dom";
import {
    Avatar, AvatarGroup, Box, Button, Flex, Grid, GridItem, Icon, Image, Link, MenuItem,
    Stack, Switch, Text, useColorModeValue, HStack, useDisclosure, Tooltip, VStack,
    Container, AspectRatio, AvatarBadge, Divider, Center, InputRightElement, useStyleConfig,
    TabPanel, TabPanels, TabList, Tabs, Tab, Select, Heading,
} from "@chakra-ui/react";
import { RiShareForwardLine} from 'react-icons/ri';

// Custom components
import { BsFillCloudRainFill } from 'react-icons/bs'
// Assets
import ImageArchitect1 from "../../assets/img/ImageArchitect1.png";
import ImageArchitect2 from "../../assets/img/ImageArchitect2.png";
import ImageArchitect3 from "../../assets/img/ImageArchitect3.png";
import ProfileBgImage from "../../assets/img/ProfileBackground.png";
import { FaCube, FaFacebook, FaInstagram, FaPenFancy, FaPlus, FaTwitter,} from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";
import Sidebar from "../Sidebar";
import {GiNewShoot} from "react-icons/gi";
import {useAppSelector} from "../../app/hooks";
import {SiSololearn} from "react-icons/si";
import {accountsArr} from "../../features/RequestWalletSlice";
import {addressHasIdentityBool} from "../../features/MintedNFISlice";
import {MdOutlineColorLens} from "react-icons/md";
import AvatarNFI from "../AvatarNFI";
import bgImage from '../../assets/legoLavendarheadercroped.png'
import {FormEvent, useMemo, useState} from "react";
import {Mentions} from "../identity/Mentions";
import {AiOutlineComment} from "react-icons/ai";

import { createBreakpoints } from '@chakra-ui/theme-tools';
import {filledInputClasses} from "@mui/material";
import Header from "../identity/Header";
import Projects from "../identity/Projects";
import ValidationsReports from "../identity/ValidationsReports";
import {getDBAccountDictionaryDic} from "../../features/AccountSlice";

interface Interface {

}

export const Identity:FC<Interface>=()=> {

    const {isOpen, onOpen, onClose} = useDisclosure()
    const initialRef = React.useRef()
    const finalRef = React.useRef()
    const {walletAccountParams} = useParams();
    console.log("this is walletAccount:")
    console.log(walletAccountParams)

    const filledAccountsArr = useAppSelector((state) => state.register.accounts);
    const tokenIDtoIdentityStruct = useAppSelector((state) => state.minted.tokenIDtoIdentityStruct);
    const accountDictionary = useAppSelector((state) => state.account.getDBAccountDictionary);
    const walletAccount = useAppSelector((state) => state.account.getDBAccountDictionary.walletAccount);

    const breakpoints = createBreakpoints({
        sm: '30em',
        md: '48em',
        lg: '62em',
        xl: '80em',
        '2xl': '96em',
    })


    console.log(tokenIDtoIdentityStruct[0]);

    return (

        <Flex>


            <Stack bg={"pmpurple.2"}>
                <Box
                    bgImage={bgImage}
                    w="100%"
                    h="200px"
                    bgPosition="0%"
                    bgRepeat="repeat"
                    position="relative"
                    display="flex"
                    justifyContent="center"
                    mb={'110px'}
                    top={'0px'}
                    right={'0px'}
                    left={'0px'}
                    backgroundPosition="center"
                    objectFit={'cover'}
                >

                    <Header/>

                </Box>
                    <Stack p={'10px'}>

                        <Box borderRadius='15px' bg='white' p="12px" px="24px">
                            <Heading p="12px 5px" mb="0px">
                                <Text fontSize="lg" color='pmpurple.13' fontWeight="bold" align={'left'}>
                                    Description
                                </Text>
                            </Heading>
                            <Box px="5px">
                                <Flex direction="column">
                                    <Text fontSize="md" color={'pmpurple.8'} fontWeight="400" mb="20px" align={'left'}>
                                        {tokenIDtoIdentityStruct[0] === walletAccount && filledAccountsArr[0] ?
                                            accountDictionary['ownerDescription']
                                            //{accountDictionary.hasOwnProperty('description')}
                                            :
                                            <Text fontSize="md" color={'pmpurple.8'} fontWeight="400" mb="20px" align={'left'}>
                                                Mathematics may not teach us how to add love or subtract hate, but it gives
                                                us every reason to hope that every problem has a solution.
                                            </Text>
                                        }
                                    </Text>
                                </Flex>
                            </Box>
                        </Box>

                        <HStack spacing={'10px'} align='stretch' justify={'space-evenly'}>
                            <Box w='33%' borderRadius='15px' bg='white' p="16px" px="24px">
                                <ValidationsReports/>
                            </Box>

                            <Box w='33%' borderRadius='15px' bg='white' p="16px" px="24px">

                                {filledAccountsArr.length !== 0 && tokenIDtoIdentityStruct.length !== 0 ?

                                    <AvatarNFI accountNumber={tokenIDtoIdentityStruct[0]}
                                               name={tokenIDtoIdentityStruct[1].split("|||")[0]}
                                               nameColor={tokenIDtoIdentityStruct[1].split("|||")[1]}
                                               email={tokenIDtoIdentityStruct[2].split("|||")[0]}
                                               emailColor={tokenIDtoIdentityStruct[2].split("|||")[1]}
                                               profession={tokenIDtoIdentityStruct[3].split("|||")[0]}
                                               professionColor={tokenIDtoIdentityStruct[3].split("|||")[1]}
                                               organization={tokenIDtoIdentityStruct[4].split("|||")[0]}
                                               organizationColor={tokenIDtoIdentityStruct[4].split("|||")[1]}
                                               slogan={tokenIDtoIdentityStruct[5].split("|||")[0]}
                                               sloganColor={tokenIDtoIdentityStruct[5].split("|||")[1]}
                                               website={tokenIDtoIdentityStruct[6].split("|||")[0]}
                                               websiteColor={tokenIDtoIdentityStruct[6].split("|||")[1]}
                                               uniqueYou={tokenIDtoIdentityStruct[7].split("|||")[0]}
                                               uniqueYouColor={tokenIDtoIdentityStruct[7].split("|||")[1]}
                                               avatarBG={tokenIDtoIdentityStruct[8]}
                                               originDate={parseInt(tokenIDtoIdentityStruct[9])}
                                    />

                                    :

                                    <Button
                                        w={'100%'}
                                        p={"6px"}
                                        mt={'32px'}
                                        bg={'pmpurple.2'}
                                        h='10.00rem'
                                        //size='lg'
                                        borderRadius={'20px'}
                                        borderStyle={'solid'}
                                        border={'4px'}
                                        borderColor={'pmpurple.6'}
                                        textDecoration={'none'}
                                        _hover={{
                                            transform: 'translateY(-2px)',
                                            boxShadow: 'xl',
                                        }}
                                    >
                                        <Link as={ReachLink} to='/register'
                                              _hover={{textDecor: 'none'}}
                                              cursor={'pointer'}
                                        >
                                            <Text p='12px' textAlign={'center'} fontSize="xl" color={'pmpurple.13'}
                                                  fontWeight="bold" whiteSpace={'pre-wrap'}>
                                                NFI will display here, please mint an NFI to your wallet account
                                            </Text>
                                            <Box position={"absolute"} bottom={'10px'} right={"10px"}>
                                                <RiShareForwardLine fontSize={'40px'}/>
                                            </Box>

                                        </Link>
                                    </Button>
                                }
                            </Box>

                            <Box w='33%' borderRadius='15px' bg='white' p="16px" px="24px">
                                <Mentions/>
                            </Box>
                        </HStack>

                        <Projects/>
                    </Stack>
            </Stack>
        </Flex>

    )
};

export default Identity;

