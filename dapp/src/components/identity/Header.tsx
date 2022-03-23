import * as React from 'react';
import type {FC} from 'react';
import {Link as ReachLink, useParams} from "react-router-dom";
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Icon,
    Image,
    Link,
    MenuItem,
    Stack,
    Switch,
    Text,
    VStack,
    HStack,
    Tooltip,
  useDisclosure
} from "@chakra-ui/react";
import {useEffect, useMemo, useReducer, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {FaCube, FaFacebook, FaInstagram, FaTwitter, FaRegEdit, FaDiscord, FaLinkedin, FaYoutube, FaTwitch} from "react-icons/fa";
import {MdOutlineColorLens, MdOutlineQrCode, MdOutlinePeopleOutline, MdOutlineEmail} from "react-icons/md";
import {BsFillPersonLinesFill} from "react-icons/bs";
import {SketchPicker} from "react-color";
import {SocialButton} from "../Footers/Footer";
import {openseaIcon} from '../../assets/icons/openseaIcon';
import {putDBAccountDictionary, putDBAccountDictionaryAction} from '../../features/AccountSlice';
import {accountDictionaryInterface} from "../../features/UserWalletSlice";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {paramsWalletAccAction} from "../../features/IdentityPageUseParamsSlice";
import DrawerComponent from "./DrawerComponent";
import {SocialMedia} from "./SocialMedia";


function initialState(paramsRequestAccountDictionary:any) {
        return {
            ownerName: "",
            ownerEmail: "",
            ownerDescription: "",
            aliasProfileLinks: ""
        };
}

function reducer(state:any, action:any) {
    switch (action.type) {
        case 'name':
            return {...state, ownerName: action.payload};
        case 'email':
            return {...state, ownerEmail: action.payload};
        case 'description':
            return {...state, ownerDescription: action.payload};
        case 'aliasProfileLinks':
            return {...state, aliasProfileLinks: action.payload};
        default:
            throw new Error();
    }
}

interface mailToInterface{
    email: string,
    subject: string,
    body: string,
    children: any,
}

export const Mailto:FC<mailToInterface> = ({ email, subject, body, ...props })=> {
    return (
        <a href={`mailto:${email}?subject=${subject || ""}&body=${body || ""}`}>
            {props.children}
        </a>
    );
}


interface Interface {

}

export const Header:FC<Interface>=()=> {

    const userRequestWalletArr = useAppSelector((state) => state.register.accounts);
    const userTokenIDtoIdentityStruct = useAppSelector((state) => state.minted.tokenIDtoIdentityStruct);
    const userAccountDictionary = useAppSelector((state) => state.account.getDBAccountDictionary);
    const userWalletAccount = useAppSelector((state) => state.account.getDBAccountDictionary.walletAccount);

    const paramsWalletAcc = useAppSelector((state) => state.identUseParams.paramsWalletAcc);
    const paramsAddressHasIdentityBoolBC = useAppSelector((state) => state.identUseParams.addressHasIdentityBC);
    const requestReceiptUsingParams = useAppSelector((state) => state.identUseParams.requestReceiptUsingParams);
    const requestStructUsingParamsFromBC = useAppSelector((state) => state.identUseParams.requestStructUsingParamsFromBC);
    const paramsRequestAccountDictionary = useAppSelector((state) => state.identUseParams.requestAccountDictionary);


    console.log('this is the tokenIDtoIdentityStruct[0]:', userTokenIDtoIdentityStruct.walletAccount);
    console.log('requestReceiptUsingParams:', requestReceiptUsingParams);

    const [state, dispatchAccountProfileDictionary] = useReducer(reducer, paramsRequestAccountDictionary, initialState);
    console.log('this is the state in my useReducer:', state);
    const dispatch = useAppDispatch();

    const submitHandler = () => {
        const accountProfileDictionary: accountDictionaryInterface = {
            walletAccount: paramsWalletAcc as string,
            ownerName: state.ownerName,
            ownerEmail: state.ownerEmail,
            ownerDescription: state.ownerDescription,
            aliasProfileLinks: state.aliasProfileLinks,
            emailValidationNotification: false,
            emailReportNotification: false
        }
        dispatch(putDBAccountDictionaryAction(accountProfileDictionary));
        onClose();
    }

    const {isOpen, onOpen, onClose} = useDisclosure()
    const firstField = useRef<HTMLTextAreaElement>(null)
    const [resize, setResize] = useState('horizontal')

    const logicTransactionHashMemo = useMemo(() => {
        console.log(paramsWalletAcc, paramsAddressHasIdentityBoolBC, requestReceiptUsingParams)
        if (paramsWalletAcc.length > 0 && paramsAddressHasIdentityBoolBC && requestReceiptUsingParams !== undefined) {
            if(requestReceiptUsingParams.transactionHash !== undefined){
                if(requestReceiptUsingParams.transactionHash.length){
                    return (
                        <Text fontSize={'16px'} color={'red.600'} letterSpacing={'1px'}
                              textShadow={'#F7FAFC 0px 0px 10px'}>
                            {requestReceiptUsingParams.transactionHash}
                        </Text>
                    )
                }
            }
        }
        if (paramsAddressHasIdentityBoolBC ){
            return (
                <Text fontSize={'16px'} color={'pmpurple.13'} letterSpacing={'1px'}
                          textShadow={'#F7FAFC 0px 0px 10px'}>
                    Registered Wallet Account
                </Text>
            )
        }
            return (
                <Text fontSize={'16px'} color={'red.600'} letterSpacing={'1px'}
                          textShadow={'#F7FAFC 0px 0px 10px'}>
                    Non-Registered Wallet Account
                </Text>
            )
    }, [paramsWalletAcc, paramsAddressHasIdentityBoolBC, requestReceiptUsingParams])

    const logicNameMemo = useMemo(() => {
        console.log(paramsRequestAccountDictionary, paramsWalletAcc, paramsAddressHasIdentityBoolBC, requestReceiptUsingParams)
        if(paramsAddressHasIdentityBoolBC && requestReceiptUsingParams !== undefined && paramsRequestAccountDictionary.ownerName !== undefined ) {
            if(paramsRequestAccountDictionary.ownerName.length > 0 ) {
                return (
                    paramsRequestAccountDictionary['ownerName']
                )
            }
        }
        if(paramsAddressHasIdentityBoolBC && requestReceiptUsingParams !== undefined ){
            if(requestReceiptUsingParams.hasOwnProperty('identityStruct') && requestReceiptUsingParams['identityStruct'].length > 0 && requestReceiptUsingParams['identityStruct'][1].length > 0 ) {
                if(requestReceiptUsingParams.identityStruct[1].split("|||")[0].length > 0 ){
                    return (
                        requestReceiptUsingParams.identityStruct[1].split("|||")[0]
                    )}
            }
        }
        return (
            paramsWalletAcc
        );

    }, [paramsRequestAccountDictionary, paramsWalletAcc, paramsAddressHasIdentityBoolBC, requestReceiptUsingParams])


    const logicEmailMemo = useMemo(() => {

        if(paramsAddressHasIdentityBoolBC && requestReceiptUsingParams !== undefined && paramsRequestAccountDictionary.ownerEmail !== undefined ){
                return(
                    <Mailto
                        email={paramsRequestAccountDictionary['ownerEmail']}
                        subject="Hello PaperMaster"
                        body="Nice to meet you PaperMaster!">
                        <MdOutlineEmail fontSize={'20px'} color={'#5c415c'}/>
                    </Mailto>
                )
            }

        if(paramsAddressHasIdentityBoolBC && requestReceiptUsingParams !== undefined ){
            if(requestReceiptUsingParams.hasOwnProperty('identityStruct') && requestReceiptUsingParams['identityStruct'].length > 0 && requestReceiptUsingParams['identityStruct'][3].length > 0 ) {
                return (
                    <Mailto
                        email={requestReceiptUsingParams.identityStruct[3].split("|||")[0]}
                        subject="Hello PaperMaster"
                        body="Nice to meet you PaperMaster!">
                        <MdOutlineEmail fontSize={'20px'} color={'#5c415c'}/>
                    </Mailto>
                )
            }
        }
        return (
            <MdOutlineEmail fontSize={'20px'} color={'#5c415c'}/>
        );
    }, [paramsWalletAcc, paramsAddressHasIdentityBoolBC, requestReceiptUsingParams])


    // const logicQRCodeMemo = useMemo(()=>{
    //     return(
    //
    //     <Link
    //         href="#"
    //         color='pmpurple.13'
    //         fontSize="md"
    //         me="10px"
    //         _hover={{color: "#9c7e9c"}}
    //     >
    //         <HStack>
    //             <Icon as={MdOutlineQrCode}/>
    //             <Text fontSize="sm" color='pmpurple.13' fontWeight="semibold">
    //                 NFI QR Code: comming soon
    //             </Text>
    //         </HStack>
    //
    //     </Link>
    //
    //     <Text
    //         fontSize="md"
    //         color='pmpurple.13'
    //         fontWeight="bold"
    //         me="10px"
    //     >
    //         NFI QR code:
    //     </Text>
    //
    // )}, [paramsWalletAcc, paramsAddressHasIdentityBoolBC, requestStructUsingParamsFromBC, requestReceiptUsingParams] )


    const logicAliasProfileLinks = useMemo(() => {
        return (
            <>
            </>
        )
    }, [state.aliasProfileLinks, paramsWalletAcc, paramsAddressHasIdentityBoolBC, requestStructUsingParamsFromBC, requestReceiptUsingParams])

    const logicGivenValidationsMemo = useMemo(() => {
        return (
            <>
            </>
        )
    }, [paramsWalletAcc, paramsAddressHasIdentityBoolBC, requestStructUsingParamsFromBC, requestReceiptUsingParams])

    const logicReportMemo = useMemo(() => {
        return (
            <>
            </>
        )
    }, [state.emailReportNotification, paramsWalletAcc, paramsAddressHasIdentityBoolBC, requestStructUsingParamsFromBC, requestReceiptUsingParams])

    const logicValidationsMemo = useMemo(() => {
        return (
            <>
            </>
        )
    }, [state.emailValidationNotification, paramsWalletAcc, paramsAddressHasIdentityBoolBC, requestStructUsingParamsFromBC, requestReceiptUsingParams])



    return (

        <Flex
            direction={{ sm: "column", md: "row" }}
            //w={{ sm: "90%", xl: "95%" }}
            align='center'
            left={'10px'}
            right={'10px'}
            justifyContent={{sm: "center", md: "space-between"}}
            backdropFilter="saturate(100%) blur(50px)"
            position="absolute"
            boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
            border="2px solid "
            borderColor='pmpurple.13'
            p="18px"
            pr={'38px'}
            borderRadius="20px"
            transform={{
                sm: "translateY(45%)",
                md: "translateY(90%)",
                lg: "translateY(75%)",
            }}
        >
            <DrawerComponent/>

            <Flex
                mb={{ sm: "10px", md: "0px" }}
                direction={{ sm: "column", md: "row" }}
                w={{ sm: "100%" }}
                textAlign={{ sm: "center", md: "start" }}
                align="center"
                bg={'transparent'}
                //border="2px solid yellow"
                m={"0px"}
                p={'0px'}
>
                <Avatar
                    me={{md: "22px"}}
                    src='' //this is the profile image
                    w="90px"
                    h="90px"
                    mb={"6px"}
                    borderRadius="10px"
                />
                <Stack>
                    <Flex direction="column"
                          maxWidth="100%"
                          m={"0px"}
                          p={'0px'}
                          h={'100%'}
                        //border="2px solid purple"
                    >
                        <Box
                            //border={'1px solid blue'}
                            p={'2px'}
                            my={'0px'}
                        >
                            <HStack
                                spacing={4}
                            >
                                <Box
                                    //border={'1px solid blue'}
                                    pt={'4px'}
                                    my={'0px'}
                                >
                                    <Text
                                        fontSize={'18px'}
                                        color='pmpurple.13'
                                        fontWeight="semibold"
                                    >
                                {logicNameMemo}
                                    </Text>
                                </Box>

                                <Box
                                    //border={'1px solid blue'}
                                    pt={'6px'}
                                    my={'0px'}
                                >
                                {logicEmailMemo}
                                </Box>
                            </HStack>
                        </Box>
                        <SocialMedia/>
                        {/*{logicQRCodeMemo}*/}
                    </Flex>
                </Stack>
            </Flex>
            <Flex
                align="center"
                direction={{sm: "column", md: "row"}}
                w={{sm: "100%"}}
                //textAlign={'right'}
                bg={'transparent'}
                //border="2px solid purple"
                m={"0px"}
                p={'0px'}
                maxWidth="100%"
                h="100%"
                justify={'right'}
            >

                <VStack direction={'row'} justify={'right'} spacing={6}
                    //border="2px solid purple"
                >
                        <Button
                            //border="2px solid purple"
                            p="0px" bg="transparent" _hover={{bg: "none"}}

                        >
                            <Flex
                                align="right"
                                w={'100%'}
                                bg="hsla(0,0%,100%,.3)"
                                borderRadius="15px"
                                justifyContent="right"
                                mt={'0px'}
                                py="12px"
                                px="14px"
                                mx={'0px'}
                                boxShadow="inset 0 0 1px 1px hsl(0deg 0% 100% / 90%), 0 20px 27px 0 rgb(0 0 0 / 5%)"
                                border="1px solid gray.500"
                                cursor="pointer"
                                _hover={{
                                    transform: 'translateY(4px)',
                                    //boxShadow: 'md',
                                }}
                            >

                                    <Icon as={FaCube} me="6px" />
                                    <Text fontSize="sm" color='pmpurple.13' fontWeight="bold">
                                        {/*TODO: when I click on this button I want it to route me to the registration & validations page*/}
                                        <Link as={ReachLink} to={'/validate'} _hover={{textDecor: 'none'}}>
                                            {logicTransactionHashMemo}
                                        </Link>
                                    </Text>


                            </Flex>
                        </Button>

                    <HStack spacing={'34px'}>
                        <Stack spacing={'0px'} align={'center'}>
                            <Text fontWeight={600}>57</Text>
                            <Tooltip hasArrow label='Total received Validations from other Blockchain accounts'
                                     bg='pmpurple.4' color='pmpurple.13'>
                                <Text fontSize={'sm'} color={'pmpurple.11'}>
                                    Validations
                                </Text>
                            </Tooltip>
                        </Stack>
                        <Stack spacing={0} align={'center'}>
                            <Text fontWeight={600}>23k</Text>
                            <Tooltip hasArrow label='Total Mentions about PaperMaster' bg='pmpurple.4'
                                     color='pmpurple.13'>
                                <Text fontSize={'sm'} color={'pmpurple.11'}>
                                    Mentions
                                </Text>
                            </Tooltip>
                        </Stack>
                        <Stack spacing={0} align={'center'}>
                            <Text fontWeight={600}>23k</Text>
                            <Tooltip hasArrow label='Total reports made about PaperMaster' bg='pmpurple.4'
                                     color='pmpurple.13'>
                                <Text fontSize={'sm'} color={'pmpurple.11'}>
                                    Reported
                                </Text>
                            </Tooltip>
                        </Stack>
                        <Stack spacing={0} align={'center'}>
                            <Text fontWeight={600}>3k</Text>
                            <Tooltip hasArrow
                                     label='Number of Validations PaperMaster has given to other Blockchain accounts'
                                     bg='pmpurple.4' color='pmpurple.13'>
                                <Text fontSize={'sm'} color={'pmpurple.11'}>
                                    Validations Given
                                </Text>
                            </Tooltip>
                        </Stack>
                    </HStack>
                </VStack>
            </Flex>
        </Flex>

    )
};

export default Header;
