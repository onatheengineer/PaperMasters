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
    Select,
    Heading,
    FormControl,
    FormLabel,
    InputGroup,
    Input,
    InputRightAddon,
    InputLeftElement,
    Popover,
    PopoverTrigger,
    Portal,
    PopoverContent,
    PopoverBody,
    Modal,
    VStack,
    HStack,
    Tooltip,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    RadioGroup,
    Radio, Textarea, DrawerFooter, useDisclosure, Center, Menu, MenuButton, MenuList, MenuDivider,
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


function initialState(paramsRequestAccountDictionary:any) {
    return {
        ownerName: "",
        ownerEmail: "",
        ownerDescription: "Mathematics may not teach us how to add love or subtract hate, but it gives us every reason to hope that every problem has a solution.",
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


function Mailto({ email, subject, body, ...props }: any) {
    return (
        <a href={`mailto:${email}?subject=${subject || ""}&body=${body || ""}`}>
            {props.children}
        </a>
    );
}

interface Interface {

}

export const DrawerComponent:FC<Interface>=()=> {

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

    if(state === undefined){
        return (null);
    }
    return (
        <>
        {userRequestWalletArr.length !== 0 && userRequestWalletArr[0].toLowerCase() === paramsWalletAcc?.toLowerCase() && paramsAddressHasIdentityBoolBC ?
                <Box
                    right={"2px"}
                    top={"2px"}
                    position="absolute"
                >
                    <Tooltip hasArrow label='Edit Account Profile' placement={'left'} border={'1px solid #694b69'}
                             borderRadius={'5px'} bg='pmpurple.3' color='pmpurple.13'  >
                        <Button
                            onClick={onOpen}
                            color={'pmpurple.15'}>
                            <FaRegEdit/>
                        </Button>
                    </Tooltip>
                    <Drawer
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
                                Account Profile
                            </DrawerHeader>
                            <DrawerBody>
                                <Stack spacing='24px'>
                                    <Box>
                                        <FormLabel
                                            mt={'22px'}
                                            color='pmpurple.15'
                                            htmlFor='username'>Name</FormLabel>
                                        <Input
                                            focusBorderColor='pmpurple.9'
                                            border={'1px solid'}
                                            borderColor={'pmpurple.8'}
                                            bg={'pmpurple.2'}
                                            color='pmpurple.15'
                                            value={state.name}
                                            id='account Name'
                                            onChange={(e) => {
                                                dispatchAccountProfileDictionary({
                                                    type: 'name',
                                                    payload: e.currentTarget.value
                                                })
                                            }}
                                            //placeholder={paramsRequestAccountDictionary.ownerName}
                                        />
                                        <FormLabel
                                            mt={'22px'}
                                            color='pmpurple.15'
                                            htmlFor='username'>Email</FormLabel>
                                        <Input
                                            focusBorderColor='pmpurple.9'
                                            border={'1px solid'}
                                            borderColor={'pmpurple.8'}
                                            bg={'pmpurple.2'}
                                            color='pmpurple.15'
                                            value={state.email}
                                            id='email'
                                            onChange={(e) => {
                                                dispatchAccountProfileDictionary({
                                                    type: 'email',
                                                    payload: e.currentTarget.value
                                                })
                                            }}
                                            //placeholder={getDBAccountDictionary{${ownerName}}}
                                        />

                                        <FormLabel
                                            mt={'22px'}
                                            color='pmpurple.15'
                                            htmlFor='username'>Social Media Links</FormLabel>
                                        <HStack>
                                            <SocialButton label={'GitHub'}
                                                          href={'https://discord.com/channels/ramonajenny#1512'}>
                                                <FaDiscord/>
                                            </SocialButton>
                                            <Input
                                                focusBorderColor='pmpurple.9'
                                                border={'1px solid'}
                                                borderColor={'pmpurple.8'}
                                                bg={'pmpurple.2'}
                                                color='pmpurple.15'
                                                value={state.aliasProfileLinks}
                                                id='alias'
                                                onChange={(e) => {
                                                    dispatchAccountProfileDictionary({
                                                        type: 'aliasProfileLinks',
                                                        payload: e.currentTarget.value
                                                    })
                                                }}
                                            />
                                        </HStack>

                                        <HStack>
                                            <SocialButton label={'GitHub'}
                                                          href={'https://discord.com/channels/ramonajenny#1512'}>
                                                <FaTwitter/>
                                            </SocialButton>
                                            <Input
                                                focusBorderColor='pmpurple.9'
                                                border={'1px solid'}
                                                borderColor={'pmpurple.8'}
                                                bg={'pmpurple.2'}
                                                color='pmpurple.15'
                                                //value={getDBAccountDictionary{${ownerName}}}
                                                // id='account Name'
                                                //placeholder={getDBAccountDictionary{${ownerName}}}
                                            />
                                        </HStack>
                                        <HStack>
                                            <SocialButton label={'GitHub'}
                                                          href={'https://discord.com/channels/ramonajenny#1512'}>
                                                <FaLinkedin/>
                                            </SocialButton>
                                            <Input
                                                focusBorderColor='pmpurple.9'
                                                border={'1px solid'}
                                                borderColor={'pmpurple.8'}
                                                bg={'pmpurple.2'}
                                                color='pmpurple.15'
                                                //value={getDBAccountDictionary{${ownerName}}}
                                                id='account Name'
                                                //placeholder={getDBAccountDictionary{${ownerName}}}
                                            />
                                        </HStack>
                                        <HStack>
                                            <SocialButton label={'GitHub'}
                                                          href={'https://discord.com/channels/ramonajenny#1512'}>
                                                <Icon as={openseaIcon}/>
                                            </SocialButton>
                                            <Input
                                                focusBorderColor='pmpurple.9'
                                                border={'1px solid'}
                                                borderColor={'pmpurple.8'}
                                                bg={'pmpurple.2'}
                                                color='pmpurple.15'
                                                //value={getDBAccountDictionary{${ownerName}}}
                                                id='account Name'
                                                //placeholder={getDBAccountDictionary{${ownerName}}}
                                            />
                                        </HStack>
                                        <HStack>
                                            <SocialButton label={'GitHub'}
                                                          href={'https://discord.com/channels/ramonajenny#1512'}>
                                                <FaYoutube/>
                                            </SocialButton>
                                            <Input
                                                focusBorderColor='pmpurple.9'
                                                border={'1px solid'}
                                                borderColor={'pmpurple.8'}
                                                bg={'pmpurple.2'}
                                                color='pmpurple.15'
                                                //value={getDBAccountDictionary{${ownerName}}}
                                                id='account Name'
                                                //placeholder={getDBAccountDictionary{${ownerName}}}
                                            />
                                        </HStack>
                                        <HStack>
                                            <SocialButton label={'GitHub'}
                                                          href={'https://discord.com/channels/ramonajenny#1512'}>
                                                <FaInstagram/>
                                            </SocialButton>
                                            <Input
                                                focusBorderColor='pmpurple.9'
                                                border={'1px solid'}
                                                borderColor={'pmpurple.8'}
                                                bg={'pmpurple.2'}
                                                color='pmpurple.15'
                                                //value={getDBAccountDictionary{${ownerName}}}
                                                id='account Name'
                                                //placeholder={getDBAccountDictionary{${ownerName}}}
                                            />
                                        </HStack>
                                        <HStack>
                                            <SocialButton label={'GitHub'}
                                                          href={'https://discord.com/channels/ramonajenny#1512'}>
                                                <FaTwitch/>
                                            </SocialButton>
                                            <Input
                                                focusBorderColor='pmpurple.9'
                                                border={'1px solid'}
                                                borderColor={'pmpurple.8'}
                                                bg={'pmpurple.2'}
                                                color='pmpurple.15'
                                                //value={getDBAccountDictionary{${ownerName}}}
                                                id='account Name'
                                                //placeholder={getDBAccountDictionary{${ownerName}}}
                                            />
                                        </HStack>
                                        <HStack>
                                            <SocialButton label={'GitHub'}
                                                          href={'https://discord.com/channels/ramonajenny#1512'}>
                                                <FaFacebook/>
                                            </SocialButton>
                                            <Input
                                                focusBorderColor='pmpurple.9'
                                                border={'1px solid'}
                                                borderColor={'pmpurple.8'}
                                                bg={'pmpurple.2'}
                                                color='pmpurple.15'
                                                //value={getDBAccountDictionary{${ownerName}}}
                                                id='account Name'
                                                //placeholder={getDBAccountDictionary{${ownerName}}}
                                            />
                                        </HStack>
                                        <HStack>
                                            <SocialButton label={'GitHub'}
                                                          href={'https://discord.com/channels/ramonajenny#1512'}>
                                                <MdOutlinePeopleOutline/>
                                            </SocialButton>
                                            <Input
                                                focusBorderColor='pmpurple.9'
                                                border={'1px solid'}
                                                borderColor={'pmpurple.8'}
                                                bg={'pmpurple.2'}
                                                color='pmpurple.15'
                                                //value={getDBAccountDictionary{${ownerName}}}
                                                id='account Name'
                                                placeholder={'Add social media link'}
                                            />
                                        </HStack>
                                        <HStack>
                                            <SocialButton label={'GitHub'}
                                                          href={'https://discord.com/channels/ramonajenny#1512'}>
                                                <MdOutlinePeopleOutline/>
                                            </SocialButton>
                                            <Input
                                                focusBorderColor='pmpurple.9'
                                                border={'1px solid'}
                                                borderColor={'pmpurple.8'}
                                                bg={'pmpurple.2'}
                                                color='pmpurple.15'
                                                //value={getDBAccountDictionary{${ownerName}}}
                                                id='social media'
                                                placeholder={'Add social media link'}
                                                onChange={(e) => {
                                                    dispatchAccountProfileDictionary({
                                                        type: 'aliasProfileLinks',
                                                        payload: e.currentTarget.value
                                                    })
                                                }}
                                            />
                                        </HStack>
                                    </Box>
                                    <Box>
                                        <FormLabel
                                            mt={'0px'}
                                            color='pmpurple.15'
                                            htmlFor='desc'>Description</FormLabel>
                                        <Textarea
                                            focusBorderColor='pmpurple.9'
                                            color='pmpurple.13'
                                            border={'1px solid'}
                                            borderColor={'pmpurple.6'}
                                            bg={'pmpurple.2'}
                                            h={'400px'}
                                            id='desc'
                                            ref={firstField}
                                            placeholder='Add description'
                                            value={state.ownerDescription}
                                            onChange={(e) => {
                                                dispatchAccountProfileDictionary({
                                                    type: 'description',
                                                    payload: e.currentTarget.value
                                                })
                                            }}
                                        />
                                    </Box>
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
                                <Button
                                    color='pmpurple.12'
                                    border={'1px solid'}
                                    borderColor={'pmpurple.6'}
                                    bg={'pmpurple.4'}
                                    onClick={submitHandler}
                                > Submit </Button>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </Box>
                : null
        }
        </>
        )
};

export default DrawerComponent;