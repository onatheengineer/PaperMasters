import * as React from 'react';
import {FC, useEffect, useReducer, useRef, useState} from "react";
import moment from 'moment';
import {
    Avatar, AvatarGroup, Box, Button, Flex, Grid, GridItem, Icon, Image, Link, MenuItem,
    Stack, Switch, Text, useColorModeValue, HStack, useDisclosure, Tooltip, VStack,
    Container, AspectRatio, AvatarBadge, Divider, Center, InputRightElement, useStyleConfig,
    TabPanel, TabPanels, TabList, Tabs, Tab, Select, RadioGroup, Radio, Textarea,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton, FormLabel, InputGroup, InputLeftAddon, InputRightAddon, Input, Heading, Spacer,
} from "@chakra-ui/react";
import {AiOutlineComment} from "react-icons/ai";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useParams} from "react-router-dom";
import Sparkle from "react-sparkle";
import {
    mentionsStateDictionaryInterface,
    singleMention,
    allMentionsAction,
    singleMentionAction
} from '../../../features/MentionsSlice'

function initialState():mentionsStateDictionaryInterface {
    return {
        walletAcc: "",
        fromWallet: "",
        messageBody: "",
        radioType: -1,
        fakeDelete: false,
        timeStamp: 0,
        replyToMentionId: "",
        mentionId: ""
    };
}

function reducer(state:any, action:any) {
    switch (action.type) {
        case 'paramsWallet':
            return {...state, walletAcc: action.payload};
        case 'connectedWallet':
            return {...state, fromWallet: action.payload};
        case 'messageBody':
            return {...state, messageBody: action.payload};
        case 'radioType':
            return {...state, radioType: action.payload};
        case 'fakeDelete':
            return {...state, fakeDelete: action.payload};
        case 'replyToMentionId':
            return {...state, replyToMentionId: action.payload};
        case 'mentionId':
            return {...state, mentionId: action.payload};
        default:
            throw new Error();
    }
}


interface Interface {

}

export const Mention: FC<Interface>=()=> {

    const [resize, setResize] = useState('horizontal')
    const {isOpen, onOpen, onClose} = useDisclosure()
    const firstField = useRef<HTMLTextAreaElement>(null)
    const filledAccountsArr = useAppSelector((state) => state.register.accounts);
    const allMentionsArr = useAppSelector((state) => state.mentions.allMentions);

    const {walletAcc} = useParams();
    console.log('this is walletAccparamsfromMentions:', walletAcc)


    const dateFormated = moment().format('MMM DD YYYY, hh:mm:ss a');

    const dispatch = useAppDispatch();

    const [state, mentionsDictionary] = useReducer(reducer, {}, initialState);

    useEffect(() => {
        if (walletAcc !== undefined && walletAcc !== 'undefined' && walletAcc !== "") {
            dispatch(allMentionsAction(walletAcc));
            mentionsDictionary({
                type: 'paramsWallet',
                payload: walletAcc
            });
        }
    }, [walletAcc]);

    useEffect(() => {
        if (filledAccountsArr.length > 0 ) {
            mentionsDictionary({
                type: 'connectedWallet',
                payload: filledAccountsArr[0]
            });
        }
    }, [filledAccountsArr]);

    const submitMentionsHandler = () => {
        const mentionsSubmitStateDictionary: mentionsStateDictionaryInterface = {
            walletAcc: walletAcc as string,
            fromWallet: state.fromWallet,
            messageBody: state.messageBody,
            radioType: state.radioType,
            fakeDelete: false,
            mentionId: "",
            timeStamp: 0,
            replyToMentionId: ""
        }
        dispatch(singleMentionAction(mentionsSubmitStateDictionary));
        onClose();
    }
    console.log('mentionsSubmitStateDictionary', state.mentionsSubmitStateDictionary)
    console.log('walletAcc', state.walletAcc)
    console.log('fromWallet', state.fromWallet)
    console.log('messageBody', state.messageBody)
    console.log('radioType', state.radioType)

    const handleClick = (newSize: any) => {
        // setSize(newSize)
        onOpen()
    }

    // if(state === undefined){
    //     return (null);
    // }
    //

    return (

        <HStack>
            <Box p="5px"
                 border={'2px solid blue'}
            >
                <Button
                    bg={'pmpurple.2'}
                    border={'1px solid'}
                    borderColor={'pmpurple.4'}
                    mt={3}
                    //value={scrollBehavior}
                    //onChange={setScrollBehavior}
                    leftIcon={<AiOutlineComment/>}
                    color={'pmpurple.13'}
                    onClick={() => handleClick(isOpen)}
                >
                    <Text fontSize="18px" color={'pmpurple.13'} fontWeight="bold">
                        Mentions
                    </Text>
                </Button>
            </Box>
            <Box>
                <VStack>
                {allMentionsArr.map((mention)=>{
                    return(
                        <Box>
                            {mention.timeStamp}<br/>
                            {mention.fromWallet}<br/>
                            {mention.messageBody}
                        </Box>
                    )
                }
                )}
                </VStack>
            </Box>


            {filledAccountsArr[0] !== walletAcc ?
                <Box>
                    <Drawer
                        size='xl'
                        isOpen={isOpen}
                        placement='right'
                        initialFocusRef={firstField}
                        onClose={onClose}
                    >
                        <DrawerOverlay/>
                        <DrawerContent>
                            <DrawerCloseButton/>
                            <DrawerHeader
                                color='pmpurple.15'
                                borderBottomWidth='1px'>
                                Mentions
                                <Sparkle
                                    color="#694b69"
                                    count={20}
                                    minSize={7}
                                    maxSize={12}
                                    overflowPx={0}
                                    fadeOutSpeed={30}
                                    flicker={false}
                                    //newSparkleOnFadeOut={false}
                                    //flickerSpeed="fast"
                                />
                            </DrawerHeader>

                            <DrawerBody>

                                <Stack spacing='24px'>

                                    {filledAccountsArr.length !== 0 ?
                                        <Box>

                                            <HStack>

                                                <RadioGroup
                                                    defaultValue='3'
                                                    mt={'28px'}
                                                            mb={'0px'}>
                                                    <Stack direction='row' spacing={5}>
                                                        <Radio
                                                            isChecked = {(state.radioType === 1)}
                                                            //color='pmpurple.15'
                                                           // bg={'pmgreen.15'}
                                                               colorScheme='green'
                                                               //value='Positive'
                                                               //value={state.radioType}
                                                             //value={1}
                                                               // onClick={() => {
                                                               //     //state.radioType === 1;
                                                               // }}
                                                               onChange={(e) => {
                                                                   mentionsDictionary({
                                                                       type: 'radioType',
                                                                       payload: 1
                                                                   })
                                                               }}
                                                        >Postive</Radio>
                                                        <Radio
                                                            isChecked = {(state.radioType === 0)}
                                                            //color='pmpurple.15'
                                                            //bg={'red.600'}
                                                            colorScheme='red'
                                                               //value={0}
                                                            //value={state.radioType}
                                                            //value = {0}
                                                            onChange={(e) => {
                                                                mentionsDictionary({
                                                                    type: 'radioType',
                                                                    payload: 0
                                                                })
                                                            }}
                                                        >Negative</Radio>
                                                        <Radio
                                                            isChecked = {(state.radioType === -1)}
                                                           // color='pmpurple.15'
                                                           // bg={'pmpurple.6'}
                                                               colorScheme='blue'
                                                               //value={state.radioType}
                                                               //value = {-1}
                                                               onChange={(e) => {
                                                                   mentionsDictionary({
                                                                       type: 'radioType',
                                                                       payload: -1
                                                                   })
                                                               }}
                                                        >Neutral</Radio>
                                                    </Stack>
                                                </RadioGroup>
                                            </HStack>


                                            <Textarea
                                                mt={'0px'}
                                                color='pmpurple.13'
                                                border={'1px solid'}
                                                borderColor={'pmpurple.6'}
                                                bg={'pmpurple.2'}
                                                h={'100px'}
                                                id='message body'
                                                ref={firstField}
                                                placeholder='Give a Mention'
                                                value={state.messageBody}
                                                onChange={(e) => {
                                                    mentionsDictionary({
                                                        type: 'messageBody',
                                                        payload: e.currentTarget.value
                                                    })
                                                }}
                                            />
                                        </Box>

                                        :

                                        <Box
                                            color='pmpurple.15'
                                            border={'2px solid'}
                                            borderColor={'pmpurple.6'}
                                            borderRadius={'5px'}
                                            bg={'pmpurple.2'}
                                            id='username'
                                        >
                                            <Text
                                                p={'12px'}
                                            >
                                                Please connect your wallet account.


                                            </Text>
                                        </Box>
                                    }

                                    {/*<Box>*/}
                                    {/*    <Input*/}
                                    {/*        isDisabled={true}*/}
                                    {/*        border={'1px solid'}*/}
                                    {/*        borderColor={'pmpurple.8'}*/}
                                    {/*        bg={'pmpurple.2'}*/}
                                    {/*        color='pmpurple.15'*/}
                                    {/*        value={dateFormated}*/}
                                    {/*        id='username'*/}
                                    {/*        placeholder={'Date'}/>*/}

                                </Stack>
                            </DrawerBody>

                            <DrawerFooter borderTopWidth='1px'>
                                <Button
                                    variant='outline'
                                    color='pmpurple.12'
                                    border={'1px solid'}
                                    borderColor={'pmpurple.6'}
                                    bg={'pmpurple.2'}
                                    mr={3}
                                    onClick={onClose}>
                                    Cancel
                                </Button>
                                {filledAccountsArr.length !== 0 ?
                                    <Button
                                        color='pmpurple.12'
                                        border={'1px solid'}
                                        borderColor={'pmpurple.6'}
                                        bg={'pmpurple.4'}
                                        onClick={submitMentionsHandler}

                                    > Submit </Button>
                                    : null}

                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>

                </Box>

                :
                <Divider
                    pt={'52px'}
                />
            }
        </HStack>

    )
};

export default Mention;
