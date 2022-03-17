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
import { FaCube, FaFacebook, FaInstagram, FaPenFancy, FaPlus, FaTwitter,} from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";
import Sidebar from "../Sidebar";
import {GiNewShoot} from "react-icons/gi";
import {useAppSelector, useAppDispatch} from "../../app/hooks";
import {SiSololearn} from "react-icons/si";
import {accountsArr} from "../../features/UserWalletSlice";
import {addressHasIdentityBool} from "../../features/MintedNFISlice";
import {MdOutlineColorLens} from "react-icons/md";
import AvatarNFI from "../AvatarNFI";
import bgImage from '../../assets/legoLavendarheadercroped.png'
import {FormEvent, useEffect, useMemo, useState} from "react";
import NewMention from "../identity/mentions/NewMention";
import {AiOutlineComment} from "react-icons/ai";
import { createBreakpoints } from '@chakra-ui/theme-tools';
import {filledInputClasses} from "@mui/material";
import Header from "../identity/Header";
import Projects from "../identity/Projects";
import ValidationsReports from "../identity/ValidationsReports";
import {paramsWalletAccAction, paramsWalletAcc} from "../../features/IdentityPageUseParamsSlice";
import ModalForIdentNoUseParams from '../identity/ModalForIdentNoUseParams';

interface Interface {

}

export const Identity:FC<Interface>=()=> {

    const {isOpen, onOpen, onClose} = useDisclosure()
    const initialRef = React.useRef()
    const finalRef = React.useRef()
    const {walletAcc} = useParams();
    console.log(`this is walletAccparams: ${walletAcc}`)

    const userRequestWalletArr = useAppSelector((state) => state.register.accounts);
    const userTokenIDtoIdentityStruct = useAppSelector((state) => state.minted.tokenIDtoIdentityStruct);
    const userAccountDictionary = useAppSelector((state) => state.account.getDBAccountDictionary);
    const userWalletAccount = useAppSelector((state) => state.account.getDBAccountDictionary.walletAccount);

    const paramsWalletAcc = useAppSelector((state) => state.identUseParams.paramsWalletAcc);
    const paramsAddressHasIdentityBoolBC = useAppSelector((state) => state.identUseParams.addressHasIdentityBC);
    const requestReceiptUsingParams = useAppSelector((state) => state.identUseParams.requestReceiptUsingParams);
    const requestStructUsingParamsFromBC = useAppSelector((state) => state.identUseParams.requestStructUsingParamsFromBC);
    const paramsRequestAccountDictionary = useAppSelector((state) => state.identUseParams.requestAccountDictionary);


    console.log(`this is the tokenIDtoIdentityStruct[0]: ${userTokenIDtoIdentityStruct.walletAccount}`);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (walletAcc !== undefined && walletAcc !== 'undefined' && walletAcc !== "") {
            dispatch(paramsWalletAccAction(walletAcc));
        }
    }, [walletAcc]);

    const breakpoints = createBreakpoints({
        sm: '30em',
        md: '48em',
        lg: '62em',
        xl: '80em',
        '2xl': '96em',
    })

    return (
        <Box

            //borderRadius='15px'
            px='0px'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            //align='center'
        >

            {paramsWalletAcc !== undefined && walletAcc !== 'undefined' && walletAcc !== "" ?

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
                                        <Text fontSize="md" color={'pmpurple.8'} fontWeight="400" mb="20px"
                                              align={'left'}>
                                            {paramsRequestAccountDictionary.hasOwnProperty('ownerDescription') ?
                                                paramsRequestAccountDictionary['ownerDescription']
                                                :
                                                <Text fontSize="md" color={'pmpurple.8'} fontWeight="400" mb="20px"
                                                      align={'left'}>
                                                    Mathematics may not teach us how to add love or subtract hate, but
                                                    it
                                                    gives
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

                                    {paramsWalletAcc.length !== 0 && paramsAddressHasIdentityBoolBC !== false && requestStructUsingParamsFromBC.walletAccount.length !== 0 ?

                                        <AvatarNFI accountNumber={requestStructUsingParamsFromBC.walletAccount}
                                                   name={requestStructUsingParamsFromBC.name.split("|||")[0]}
                                                   nameColor={requestStructUsingParamsFromBC.name.split("|||")[1]}
                                                   email={requestStructUsingParamsFromBC.email.split("|||")[0]}
                                                   emailColor={requestStructUsingParamsFromBC.email.split("|||")[1]}
                                                   profession={requestStructUsingParamsFromBC.profession.split("|||")[0]}
                                                   professionColor={requestStructUsingParamsFromBC.profession.split("|||")[1]}
                                                   organization={requestStructUsingParamsFromBC.organization.split("|||")[0]}
                                                   organizationColor={requestStructUsingParamsFromBC.organization.split("|||")[1]}
                                                   slogan={requestStructUsingParamsFromBC.slogan.split("|||")[0]}
                                                   sloganColor={requestStructUsingParamsFromBC.slogan.split("|||")[1]}
                                                   website={requestStructUsingParamsFromBC.website.split("|||")[0]}
                                                   websiteColor={requestStructUsingParamsFromBC.website.split("|||")[1]}
                                                   uniqueYou={requestStructUsingParamsFromBC.uniqueYou.split("|||")[0]}
                                                   uniqueYouColor={requestStructUsingParamsFromBC.uniqueYou.split("|||")[1]}
                                                   avatarBG={requestStructUsingParamsFromBC.bgRGB}
                                                   originDate={parseInt(requestStructUsingParamsFromBC.originDate)}
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
                                    <NewMention/>
                                </Box>
                            </HStack>
                            <Projects/>
                        </Stack>
                    </Stack>
                </Flex>
                :
                <ModalForIdentNoUseParams/>
            }
        </Box>
    )
};

export default Identity;

