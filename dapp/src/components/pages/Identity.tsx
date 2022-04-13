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
import {apiHarmonyOneAction} from "../../features/accountBC/ledger/LedgerSlice";
import {ParamsURLInterface} from "../../features/accountDB/AccountDBSlice.types";
import {paramsChainId, paramsWallet, singleAccountDictionaryDBAction} from "../../features/accountDB/AccountDBSlice";


export const Identity=()=> {
//TODO as soon as they connect - redirect them to their identity page - this is important for the hasIdentityBool slice to work
    const {chainId, walletAcc} = useParams();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (walletAcc !== undefined && walletAcc !== "" && walletAcc !== 'undefined') {
            dispatch(paramsChainId(chainId));
            dispatch(paramsWallet(walletAcc));
            dispatch(apiHarmonyOneAction(walletAcc));
            dispatch(singleAccountDictionaryDBAction({ chainIdURL: chainId, paramsWalletURL: walletAcc } as ParamsURLInterface))}
    }, [walletAcc, chainId]);

    const addressHasTokenBoolBool = useAppSelector((state) => state.accountBC.addressHasTokenBool);
    const singleStructBC = useAppSelector((state) => state.accountBC.getStructBC);
    const singleAccountDictionaryDBDB = useAppSelector((state) => state.accountDB.singleAccountDictionaryDB);

    const logicDescriptionMemo = useMemo(() => {
        console.log(singleAccountDictionaryDBDB, walletAcc, addressHasTokenBoolBool, singleStructBC)
        if (addressHasTokenBoolBool && singleStructBC !== undefined && singleAccountDictionaryDBDB.ownerDescription !== undefined) {
            if (singleAccountDictionaryDBDB.ownerDescription.length > 0) {
                return (
                    singleAccountDictionaryDBDB['ownerDescription']
                )
            }
        }
        if (addressHasTokenBoolBool && singleStructBC !== undefined) {
            if (Object.prototype.hasOwnProperty.call(singleStructBC,'identityStruct') && singleStructBC['identityStruct'].length > 0 && requestReceiptUsingParams['identityStruct'][7].length > 0) {
                if (singleStructBC.identityStruct[7].split("|||")[0].length > 0) {
                    return (
                        singleStructBC.identityStruct[7].split("|||")[0]
                    )
                }
            }
        }
        return (
            " Mathematics may not teach us how to add love or subtract hate, but it gives us every reason to hope that every problem has a solution."
        );
    }, [singleAccountDictionaryDBDB, walletAcc, addressHasTokenBoolBool, singleStructBC])


    return (
        <Box
            //border={'4px solid red'}
            //borderRadius='15px'
            px='0px'
            display='flex'
            flexDirection='column'
            //align='center'
        >
            {walletAcc !== undefined && walletAcc !== 'undefined' && walletAcc !== "" && walletAcc.length !== 0 ?
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
                                    {walletAcc.length !== 0 && addressHasTokenBoolBool !== false && singleStructBC !== null && singleStructBC.walletAccount.length !== 0 ?
                                        <AvatarNFI accountNumber={singleStructBC.walletAccount}
                                                   name={singleStructBC.name.split("|||")[0]}
                                                   nameColor={singleStructBC.name.split("|||")[1]}
                                                   email={singleStructBC.email.split("|||")[0]}
                                                   emailColor={singleStructBC.email.split("|||")[1]}
                                                   profession={singleStructBC.profession.split("|||")[0]}
                                                   professionColor={singleStructBC.profession.split("|||")[1]}
                                                   organization={singleStructBC.organization.split("|||")[0]}
                                                   organizationColor={singleStructBC.organization.split("|||")[1]}
                                                   slogan={singleStructBC.slogan.split("|||")[0]}
                                                   sloganColor={singleStructBC.slogan.split("|||")[1]}
                                                   website={singleStructBC.website.split("|||")[0]}
                                                   websiteColor={singleStructBC.website.split("|||")[1]}
                                                   uniqueYou={singleStructBC.uniqueYou.split("|||")[0]}
                                                   uniqueYouColor={singleStructBC.uniqueYou.split("|||")[1]}
                                                   avatarBG={singleStructBC.bgRGB}
                                                   originDate={parseInt(singleStructBC.originDate)}
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

