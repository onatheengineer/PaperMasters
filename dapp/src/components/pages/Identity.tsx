import * as React from 'react';
import type {FC} from 'react';
import {Link as ReachLink, useNavigate, useParams} from "react-router-dom";
import {
    Box, Button, Flex, Stack, Text, HStack,  Divider,
} from "@chakra-ui/react";
import { RiShareForwardLine} from 'react-icons/ri';
import {useAppSelector, useAppDispatch} from "../../app/hooks";
import AvatarNFI from "../AvatarNFI";
import bgImage from '../../assets/legoLavendarheadercroped.png'
import {FormEvent, useEffect, useMemo, useReducer, useState} from "react";
import Header, {Mailto} from "../identity/Header";
import Projects from "../identity/Projects";
import ValidationsReports from "../identity/ValidationsReports";
import ModalForIdentNoUseParams from '../identity/ModalForIdentNoUseParams';
import {AccountLedger} from '../identity/AccountLedger'
import {apiHarmonyOneAction} from "../../features/ledger/LedgerSlice";


export const Identity=()=> {
//TODO as soon as they connect - redirect them to their identity page - this is important for the hasIdentityBool slice to work
    const {walletAcc} = useParams();
    console.log(`this is walletAccparams: ${walletAcc}`)
    const dispatch = useAppDispatch();
    const paramsWalletAcc = useAppSelector((state) => state.identUseParams.paramsWalletAcc);
    const paramsAddressHasIdentityBoolBC = useAppSelector((state) => state.identUseParams.addressHasIdentityBC);
    const requestReceiptUsingParams = useAppSelector((state) => state.identUseParams.requestReceiptUsingParams);
    const requestStructUsingParamsFromBC = useAppSelector((state) => state.identUseParams.requestStructUsingParamsFromBC);
    const paramsRequestAccountDictionary = useAppSelector((state) => state.identUseParams.requestAccountDictionary);
    console.log('paramsRequestAccountDictionary:', paramsRequestAccountDictionary)

    useEffect(() => {
        if (walletAcc !== undefined && walletAcc !== "" && walletAcc !== 'undefined') {
            dispatch(paramsWalletAccAction(walletAcc));
            dispatch(apiHarmonyOneAction(walletAcc));
        }
    }, [walletAcc]);

    const logicDescriptionMemo = useMemo(() => {
        console.log(paramsRequestAccountDictionary, paramsWalletAcc, paramsAddressHasIdentityBoolBC, requestReceiptUsingParams)
        if (paramsAddressHasIdentityBoolBC && requestReceiptUsingParams !== undefined && paramsRequestAccountDictionary.ownerDescription !== undefined) {
            if (paramsRequestAccountDictionary.ownerDescription.length > 0) {
                return (
                    paramsRequestAccountDictionary['ownerDescription']
                )
            }
        }
        if (paramsAddressHasIdentityBoolBC && requestReceiptUsingParams !== undefined) {
            if (requestReceiptUsingParams.hasOwnProperty('identityStruct') && requestReceiptUsingParams['identityStruct'].length > 0 && requestReceiptUsingParams['identityStruct'][7].length > 0) {
                if (requestReceiptUsingParams.identityStruct[7].split("|||")[0].length > 0) {
                    return (
                        requestReceiptUsingParams.identityStruct[7].split("|||")[0]
                    )
                }
            }
        }
        return (
            " Mathematics may not teach us how to add love or subtract hate, but it gives us every reason to hope that every problem has a solution."
        );
    }, [paramsRequestAccountDictionary, paramsWalletAcc, paramsAddressHasIdentityBoolBC, requestReceiptUsingParams])

    console.log('paramsWalletAcc.length:', paramsWalletAcc.length)
    console.log('paramsAddressHasIdentityBoolBC:', paramsAddressHasIdentityBoolBC)
    console.log('requestStructUsingParamsFromBC.walletAccount.length:', requestStructUsingParamsFromBC.walletAccount.length)

    return (
        <Box
            //border={'4px solid red'}
            //borderRadius='15px'
            px='0px'
            display='flex'
            flexDirection='column'
            //align='center'
        >
            {paramsWalletAcc !== undefined && walletAcc !== 'undefined' && walletAcc !== "" && paramsWalletAcc.length !== 0 ?
                <Stack
                    //border={'4px solid yellow'}
                >
                    <Box
                        bgImage={bgImage}
                        w="100%"
                        h="200px"
                        bgPosition="0%"
                        bgRepeat="repeat"
                        position="relative"
                        display="flex"
                        justifyContent="center"
                        mb={'60px'}
                        top={'0px'}
                        right={'0px'}
                        left={'0px'}
                        backgroundPosition="center"
                        objectFit={'cover'}
                        //border={'4px solid blue'}
                    />
                    <Header/>
                    <Stack p={'10px'}
                        //border={'4px solid blue'}
                    >
                        <Box borderRadius='15px' bg='white' p="12px" px="24px" overflow={'none'}>
                            {/*<Heading p="12px 5px" mb="0px">*/}
                            {/*    <Text fontSize="16px" color='pmpurple.13' fontWeight="bold" align={'left'}>*/}
                            {/*        Description*/}
                            {/*    </Text>*/}
                            {/*</Heading>*/}
                            <Box px="5px"
                                //justifyContent={'space-evenly'}
                                //alignItems={'flex-start'}
                                //alignContent={'space-evenly'}
                            >
                                <Flex direction="column">
                                    <Text fontSize="md" color={'pmpurple.13'} fontWeight="400"
                                          align={'left'}>
                                        {logicDescriptionMemo}
                                    </Text>
                                </Flex>
                            </Box>
                        </Box>
                        <Box>
                            <HStack spacing={'10px'}
                                    align='stretch'
                                    justify={'space-evenly'}
                                    minH={"400px"}
                            >
                                <Box w='38%' borderRadius='15px' bg='white' p="16px" overflow={'none'}
                                     whiteSpace={"pre-line"}
                                >
                                    <ValidationsReports/>
                                </Box>

                                <Box w='380px' borderRadius='15px' bg='white'
                                     px="16px"
                                     py={'28px'}
                                     overflow={'none'} whiteSpace={'break-spaces'}
                                >
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
                                            as={ReachLink}
                                            to={'/register'}
                                            w={'100%'}
                                            bg={'pmpurple.2'}
                                            h='10.00rem'
                                            //size='lg'
                                            borderRadius={'20px'}
                                            borderStyle={'4px solid'}
                                            borderColor={'pmpurple.6'}
                                            textDecoration={'none'}
                                            cursor={'pointer'}
                                            alignItems={'center'}
                                            _hover={{
                                                transform: 'translateY(-2px)',
                                                boxShadow: 'xl',
                                                textDecoration: 'none'
                                            }}
                                        >
                                            <Text p='12px' textAlign={'center'} fontSize="xl"
                                                  color={'pmpurple.13'}
                                                  fontWeight="bold" whiteSpace={'pre-wrap'}>
                                                NFI will display here, please mint an NFI to your wallet account
                                            </Text>
                                            <Box position={"absolute"} bottom={'10px'} right={"10px"}
                                                 color={'pmpurple.13'}>
                                                <RiShareForwardLine fontSize={'40px'}/>
                                            </Box>
                                        </Button>
                                    }
                                </Box>
                                <Box w='38%' borderRadius='15px' bg='white' p="12px" pb={'16px'}
                                     overflow={'none'}
                                     whiteSpace={"pre-line"}
                                >
                                    <Box
                                        overflow={'hidden'}
                                        whiteSpace={"pre-line"}
                                        h={'100%'}
                                        //w={'30vW'}
                                        //border={'4px solid blue'}
                                    >
                                        {/*{provider === */}
                                        {/*<Text mb={'5px'} fontSize="17px" color={'pmpurple.13'} align={'center'}>*/}
                                        {/*    Ethereum Ledger*/}
                                        {/*</Text>*/}

                                        <Text mb={'5px'} fontSize="16px" color={'pmpurple.13'} align={'center'}>
                                            Harmony Ledger
                                        </Text>
                                        <Divider
                                            border={'1px solid'}
                                            borderColor={'pmpurple.8'}
                                        />
                                        <AccountLedger/>
                                    </Box>
                                </Box>
                            </HStack>
                        </Box>
                        <Projects/>
                    </Stack>
                </Stack>
                :
                <ModalForIdentNoUseParams/>
            }
        </Box>
    )
};

export default Identity;

