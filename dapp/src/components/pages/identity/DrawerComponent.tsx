import * as React from 'react';
import type {FC} from 'react';
import {Link as ReachLink, useParams} from "react-router-dom";
import {
    Box,
    Button,
    Icon,
    Stack,
    FormLabel,
    InputGroup,
    Input,
    HStack,
    Tooltip,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    Textarea, DrawerFooter, useDisclosure,
} from "@chakra-ui/react";
import {useEffect, useMemo, useReducer, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {
    FaCube,
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaRegEdit,
    FaDiscord,
    FaLinkedin,
    FaYoutube,
    FaTwitch,
    FaGithub, FaReddit
} from "react-icons/fa";
import {MdOutlineColorLens, MdOutlineQrCode, MdOutlinePeopleOutline, MdOutlineEmail} from "react-icons/md";
import {BsFillPersonLinesFill} from "react-icons/bs";
import {SketchPicker} from "react-color";
import {SocialButton} from "../../Footers/Footer";
import {openseaIcon} from '../../../assets/icons/openseaIcon';
import {ChevronDownIcon} from "@chakra-ui/icons";
import {postSingleAccountDictionaryDBAction} from "../../../features/accountDB/AccountDBSlice";
import {AccountDBInterface, ParamsURLInterface} from "../../../features/accountDB/AccountDBSlice.types";


function initialState(paramsRequestAccountDictionary:any) {
    return {
        ownerName: "",
        ownerEmail: "",
        ownerDescription: "",
        socialMediaLinks: ""
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
        case 'socialMediaLinks':
            return {...state, socialMediaLinks: action.payload};
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

export const DrawerComponent:FC<ParamsURLInterface>=({chainIdURL, paramsWalletURL})=> {

    const accountArrArr = useAppSelector((state) => state.accountBC.accountArr);
    const addressHasIdentityBoolBool = useAppSelector((state) => state.accountBC.addressHasIdentityBool);
    const getStructBCBC = useAppSelector((state) => state.accountBC.getStructBC);
    const singleNFIReceiptDBDB = useAppSelector((state) => state.accountDB.singleNFIReceiptDB);
    const singleAccountDictionaryDBDB = useAppSelector((state) => state.accountDB.singleAccountDictionaryDB);

    const [state, dispatchAccountProfileDictionary] = useReducer(reducer, singleAccountDictionaryDBDB, initialState);
    console.log('this is the state in my useReducer:', state);
    const dispatch = useAppDispatch();

    const submitHandler = () => {
        const accountProfileDictionary: AccountDBInterface = {
            chainId: chainIdURL as string,
            walletAccount: paramsWalletURL as string,
            createDate: singleAccountDictionaryDBDB.createDate,
            ownerName: state.ownerName,
            ownerEmail: state.ownerEmail,
            ownerDescription: state.ownerDescription,
            socialMediaLinks: state.socialMediaLinks,
            emailValidationNotification: false,
            emailReportNotification: false
        }
        dispatch(postSingleAccountDictionaryDBAction(accountProfileDictionary));
        onClose();
    }

    const {isOpen, onOpen, onClose} = useDisclosure()
    const firstField = useRef<HTMLTextAreaElement>(null)
    const [resize, setResize] = useState('horizontal')

    if(state === undefined){
        return (null);
    }
    return (
        //TODO - should I permit a name change
        <>
        {accountArrArr.length !== 0 && accountArrArr[0] === paramsWalletURL && addressHasIdentityBoolBool ?
                <Box
                    right={"2px"}
                    top={"2px"}
                    position="absolute"
                >
                    <Tooltip hasArrow label='Edit Account Profile' placement={'left'} border={'1px solid #694b69'}
                             borderRadius={'3px'} bg='pmpurple.3' color='pmpurple.13' m={'-14px'} >
                        <Button
                            onClick={onOpen}
                            color={'pmpurple.15'}
                            mr={'-6px'}
                            mt={'-4px'}
                        >
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
                                                value={state.socialMediaLinks}
                                                id='socialMedia'
                                                onChange={(e) => {
                                                    dispatchAccountProfileDictionary({
                                                        type: 'socialMediaLinks',
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
                                                // id='accountDB Name'
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
                                                <FaReddit/>
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
                                                <FaGithub/>
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
                                                        type: 'socialMediaLinks',
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