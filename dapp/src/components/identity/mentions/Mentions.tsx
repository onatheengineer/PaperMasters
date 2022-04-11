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
import {BsCircleFill} from "react-icons/bs";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useParams} from "react-router-dom";
import Sparkle from "react-sparkle";
import {
    mentionsStateDictionaryInterface,
    singleMention,
    allMentionsAction,
    singleMentionAction
} from '../../../features/accountDB/mentions/MentionsSlice'
import DisplayMentions from "./DisplayMentions";

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
        case 'reset':
            return {...state, messageBody: "", radioType: -1};
        default:
            throw new Error();
    }
}


interface Interface {

}

export const Mentions: FC<Interface>=()=> {

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

    const submitMentionsHandler = () => {
        const mentionsSubmitStateDictionary: mentionsStateDictionaryInterface = {
            walletAcc: walletAcc as string,
            fromWallet: filledAccountsArr[0],
            messageBody: state.messageBody,
            radioType: state.radioType,
            fakeDelete: false,
            mentionId: "",
            timeStamp: 0,
            replyToMentionId: ""
        }
        dispatch(singleMentionAction(mentionsSubmitStateDictionary));
        mentionsDictionary({
            type: 'reset'
        })
        onClose();
    }
    console.log('mentionsSubmitStateDictionary', state.mentionsSubmitStateDictionary)
    console.log('walletAcc', state.walletAcc)
    console.log('messageBody', state.messageBody)
    console.log('radioType', state.radioType)


    return (
        <Flex
            flexDirection={'column'}
            h={'full'}
        >
            <Box>
                <HStack>
                    <Heading mb="18px">
                        <Flex direction="column">
                            <Text mb={'5px'} fontSize="18px" color={'pmpurple.13'} fontWeight="bold" align={'left'}>
                                Mentions
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
                        onClick={() => {
                            onOpen()
                        }}
                        rightIcon={<AiOutlineComment fontSize="18px"/>}
                    >
                        <Text fontSize="sm" fontWeight="bold">
                            Give Mention
                        </Text>
                    </Button>
                </HStack>
            </Box>
            <Divider
                border={'1px solid'}
                borderColor={'pmpurple.8'}
            />
            <Box
                //position={'relative'}
                //h={'100%'}
                px="5px"
                //border={'1px solid blue'}
                flexGrow={1}
                display={'flex'}
                overflow={'auto'}
            >
                <DisplayMentions mentionsFullDisplayWindowBool={false}/>
            </Box>
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
                            borderBottomWidth='1px'
                        >
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
                            <DisplayMentions mentionsFullDisplayWindowBool={true}/>
                            <Stack spacing='24px'>
                                {filledAccountsArr.length !== 0 ?
                                    <Box
                                        flex={'max-content'}
                                        mt={'18px'}
                                        //border={'2px solid blue'}
                                        position={'sticky'}
                                    >
                                        <HStack>
                                            <RadioGroup
                                                defaultValue='neutral'
                                            >
                                                <Stack direction='row' spacing={5}>
                                                    <Radio
                                                        isChecked={(state.radioType === 1)}
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
                                                    >Positive</Radio>
                                                    <Radio
                                                        isChecked={(state.radioType === 0)}
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
                                                        isChecked={(state.radioType === -1)}
                                                        // color='pmpurple.15'
                                                        // bg={'pmpurple.6'}
                                                        colorScheme='blue'
                                                        //value={state.radioType}
                                                        value={'neutral'}
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
                                        mt={'18px'}
                                    >
                                        <Text
                                            p={'14px'} fontSize={'16px'} fontWeight={'bold'} color={'pmpurple.13'}
                                        >
                                            Please connect your wallet account.
                                        </Text>
                                    </Box>
                                }
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
        </Flex>
    )
};

export default Mentions;
