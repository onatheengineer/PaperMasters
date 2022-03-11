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
import {useMemo, useReducer, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {FaCube, FaFacebook, FaInstagram, FaTwitter, FaRegEdit, FaDiscord, FaLinkedin, FaYoutube, FaTwitch} from "react-icons/fa";
import {MdOutlineColorLens, MdOutlineQrCode, MdOutlinePeopleOutline} from "react-icons/md";
import {BsFillPersonLinesFill} from "react-icons/bs";
import {SketchPicker} from "react-color";

import {SocialButton} from "../Footers/Footer";
import {openseaIcon} from '../../assets/icons/openseaIcon';
import {putDBAccountDictionary} from '../../features/AccountSlice';
import {accountDictionaryInterface} from "../../features/RequestWalletSlice";
import {ChevronDownIcon} from "@chakra-ui/icons";



interface Interface {

}

function init(tokenIDtoIdentityStruct:any) {
    if(tokenIDtoIdentityStruct.length > 0 ){
        return {
            name: tokenIDtoIdentityStruct[1].split('|||')[0],
            email: tokenIDtoIdentityStruct[2].split('|||')[0],
            ownerDescription: "Mathematics may not teach us how to add love or subtract hate, but it gives us every reason to hope that every problem has a solution.",
            aliasProfileLinks: ""
        };
    }
}

function reducer(state:any, action:any) {
    switch (action.type) {
        case 'name':
            return {...state, name: action.payload};
        case 'email':
            return {...state, email: action.payload};
        case 'ownerDescription':
            return {...state, ownerDescription: action.payload};
        case 'aliasProfileLinks':
            return {...state, aliasProfileLinks: action.payload};

        default:
            throw new Error();
    }
}

export const Header:FC<Interface>=()=> {
    const {walletAccountParams} = useParams();
    const dispatch = useAppDispatch();
    const requestWalletArr = useAppSelector((state) => state.register.accounts);
    const getDBAccountDictionary = useAppSelector((state) => state.account.getDBAccountDictionary)
    const addressHasIdentityBool = useAppSelector((state) => state.minted.addressHasIdentity);
    const tokenIDtoIdentityStruct = useAppSelector((state) => state.minted.tokenIDtoIdentityStruct);
    //this walletaccount has to be fixed
    const walletAccount = useAppSelector((state) => state.register.putWalletInDBStatus);

    const {isOpen, onOpen, onClose} = useDisclosure()
    const firstField = useRef<HTMLTextAreaElement>(null)
    const [resize, setResize] = useState('horizontal')

    const [state, dispatchAccountProfileDictionary] = useReducer(reducer, tokenIDtoIdentityStruct, init);
    console.log(`this is the state in my useReducer: ${state}`);

    const submitHandler = () => {
        const accountProfileDictionary: accountDictionaryInterface = {
            walletAccount: walletAccount as string,
            ownerName: state.name,
            ownerEmail: state.email,
            ownerDescription: state.ownerDescription,
            aliasProfileLinks: state.aliasProfileLinks,
            emailValidationNotification: false,
            emailReportNotification: false
        }
        dispatch(putDBAccountDictionary(accountProfileDictionary));
        onClose();
    }

    return (

        <Flex
            direction={{sm: "column", md: "row"}}
            left={'10px'}
            right={'10px'}
            //maxH="330px"
            justifyContent={{sm: "center", md: "space-between"}}
            backdropFilter="saturate(100%) blur(50px)"
            position="absolute"
            boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
            border="2px solid "
            borderColor='pmpurple.13'
            p="18px"
            borderRadius="20px"
            transform={{
                sm: "translateY(45%)",
                md: "translateY(90%)",
                lg: "translateY(75%)",
            }}
        >
            {requestWalletArr.length !== 0 && requestWalletArr[0].toLowerCase() === walletAccount?.toLowerCase() && addressHasIdentityBool ?
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
                                            //placeholder={getDBAccountDictionary{${ownerName}}}
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
                                                id='account Name'
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
                                                    type: 'ownerDescription',
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

            <Flex
                align="center"
                direction={{sm: "column", md: "row"}}
                w={{sm: "100%"}}
                //textAlign={{sm: "center", md: "start"}}
                bg={'transparent'}
                border="2px solid yellow"
                m={"0px"}
                p={'0px'}
            >
                <Avatar
                    me={{md: "22px"}}
                    src='' //this is the profile image
                    w="98px"
                    h="98px"
                    mb={"6px"}
                    borderRadius="10px"
                />
                <Stack>
                    <Flex direction="column" maxWidth="100%"
                          m={"0px"}
                          p={'0px'}
                          h={'100%'}
                          border="2px solid "
                          borderColor='red'
                    >
                        {/*{addressHasIdentityBool ?*/}

                        <Text
                            fontSize={'20px'}
                            color='pmpurple.16'
                            fontWeight="bold"
                            ms={{sm: "8px", md: "0px"}}
                        >
                            {/*{tokenIDtoIdentityStruct[1].split("|||")[0]}*/}
                        </Text>
                         {/* {requestWalletArr.length === 0 ?*/}
                            <Text
                                fontSize={{sm: "lg", lg: "xl"}}
                                color='pmpurple.13'
                                fontWeight="semibold"
                                ms={{sm: "8px", md: "0px"}}
                            >
                                {/*{walletAccount?.length !== 0 ?*/}
                                {/*    walletAccount*/}
                                {/*    : 'Non - Registered Wallet Account'*/}

                            </Text>
                            {/* :*/}
                            <Flex  color='pmpurple.13' fontWeight="semibold" alignItems={'center'}>
                                {/*{requestWalletArr[0]}*/}
                            </Flex>
                        {/*}*/}
                        <Text
                            fontSize={{sm: "sm", md: "md"}}
                            color='pmpurple.13'
                            fontWeight="semibold"
                        >
                            email goes here
                        </Text>
                        <Box
                            //border={'1px solid blue'}
                            p={'0px'}
                        >
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rightIcon={<ChevronDownIcon fontSize={'18px'}/>}
                                    leftIcon={<BsFillPersonLinesFill size={'16px'}/>}
                                    //focusBorderColor='pmpurple.4'
                                    w={'100%'}
                                    border={'0px solid'}
                                    //borderColor={'pmpurple.6'}
                                    color='pmpurple.13'
                                    m={'0px'}
                                    bg={'pmpurple.4'}
                                    //h='1.75rem'
                                    size='xs'
                                    p={'2px'}
                                    borderRadius={'0px'}
                                    // _hover={{
                                    //     transform: 'translateY(-2px)',
                                    //     boxShadow: 'lg',
                                    // }}
                                    _active={{
                                        transform: 'scale(1.0)',
                                    }}
                                    boxShadow={'0px'}
                                    // _focus={{
                                    //     boxShadow:
                                    //         '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                                    // }}
                                >
                                    <Text
                                        fontSize={'15px'}
                                        color='pmpurple.13'
                                        fontWeight="semibold"
                                        textAlign={'left'}
                                    >
                                        Persona
                                    </Text>
                                </MenuButton>



                                <MenuList
                                    w={'2px'}
                                >
                                    <Box
                                        border={'1px solid red'}
                                    >
                                    <HStack
                                        spacing='-165px'
                                    >
                                    <MenuItem
                                        border={'1px solid blue'}
                                    >
                                        <Link
                                            border={'1px solid green'}
                                            href="#"
                                            color='pmpurple.13'
                                            fontSize="lg"
                                            //me="10px"
                                            _hover={{color: "#9c7e9c"}}
                                        >
                                            <Icon as={FaDiscord}/>
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link
                                            href="#"
                                            color='pmpurple.13'
                                            fontSize="lg"
                                            //me="10px"
                                            _hover={{color: "#9c7e9c"}}
                                        >
                                            <Icon as={FaTwitter}/>
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link
                                            href="#"
                                            color='pmpurple.13'
                                            fontSize="lg"
                                            //me="10px"
                                            _hover={{color: "#9c7e9c"}}
                                        >
                                            <Icon as={FaLinkedin}/>
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link
                                            mt={'-6px'}
                                            href="#"
                                            fontSize="lg"
                                            //me="10px"
                                            _hover={{color: "#9c7e9c"}}
                                        >
                                            <Icon as={openseaIcon}/>
                                        </Link>
                                    </MenuItem>
                                    </HStack>
                                    <HStack
                                        spacing='-165px'
                                    >
                                    <MenuItem>
                                        <Link
                                            href="#"
                                            color='pmpurple.13'
                                            fontSize="lg"
                                            //me="10px"
                                            _hover={{color: "#9c7e9c"}}
                                        >
                                            <Icon as={FaYoutube}/>
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link
                                            href="#"
                                            color='pmpurple.13'
                                            fontSize="lg"
                                            //me="10px"
                                            _hover={{color: "#9c7e9c"}}
                                        >
                                            <Icon as={FaInstagram}/>
                                        </Link>
                                    </MenuItem>
                                        <MenuItem>
                                            <Link
                                                href="#"
                                                color='pmpurple.13'
                                                fontSize="lg"
                                                //me="10px"
                                                _hover={{color: "#9c7e9c"}}
                                            >
                                                <Icon as={FaTwitch}/>
                                            </Link>
                                        </MenuItem>
                                    <MenuItem>
                                        <Link
                                            href="#"
                                            color='pmpurple.13'
                                            fontSize="lg"
                                            //me="10px"
                                            _hover={{color: "#9c7e9c"}}
                                        >
                                            <Icon as={FaFacebook}/>
                                        </Link>
                                    </MenuItem>
                                    </HStack>
                                    <MenuDivider/>
                                    <MenuItem
                                        _hover={{color: "#9c7e9c"}}
                                    >
                                        <Box
                                            //cursor={'pointer'}
                                            //focusBorderColor='pmpurple.8'
                                            border={'1px solid'}
                                            borderColor={'pmpurple.6'}
                                            bg={'pmpurple.2'}
                                            color='pmpurple.15'
                                            //value={state.alias}
                                            id='social media'
                                            //size={'sm'}
                                            //placeholder={getDBAccountDictionary{${ownerName}}}
                                        >
                                            <Link>
                                                <Text
                                                    fontSize={'14px'}
                                                    color='pmpurple.13'
                                                    fontWeight="semibold"
                                                    textAlign={'left'}
                                                    px={'4px'}
                                                >
                                                    Social Media Link
                                                </Text>
                                            </Link>
                                        </Box>
                                    </MenuItem>
                                    <MenuItem>
                                        <Box
                                            //cursor={'pointer'}
                                            //focusBorderColor='pmpurple.8'
                                            border={'1px solid'}
                                            borderColor={'pmpurple.6'}
                                            bg={'pmpurple.2'}
                                            color='pmpurple.15'
                                            //value={state.alias}
                                            id='social media'
                                            //size={'sm'}
                                            //placeholder={getDBAccountDictionary{${ownerName}}}
                                        >
                                            <Link>
                                                <Text
                                                    fontSize={'14px'}
                                                    color='pmpurple.13'
                                                    fontWeight="semibold"
                                                    textAlign={'left'}
                                                    px={'4px'}
                                                >
                                                    Social Media Link
                                                </Text>
                                            </Link>
                                        </Box>
                                    </MenuItem>

                                    </Box>
                                </MenuList>

                            </Menu>
                        </Box>
                        {/*{requestWalletArr[0] === walletAccount ?*/}
                            <Link
                                href="#"
                                color='pmpurple.13'
                                fontSize="md"
                                me="10px"
                                _hover={{color: "#9c7e9c"}}
                            >
                                <HStack>
                                    <Icon as={MdOutlineQrCode}/>
                                    <Text fontSize="sm" color='pmpurple.13' fontWeight="semibold">
                                        NFI QR Code: comming soon
                                    </Text>
                                </HStack>

                            </Link>
                            {/*:*/}
                            <Text
                                fontSize="md"
                                color='pmpurple.13'
                                fontWeight="bold"
                                me="10px"
                            >
                                NFI QR code:
                            </Text>
                        {/*}*/}
                    </Flex>
                </Stack>
            </Flex>
            <VStack direction={'row'} justify={'center'} spacing={6}
                // border="2px solid "
                // borderColor='red'
            >
                <Flex
                    direction={{sm: "column", lg: "row"}}
                    w={{sm: "100%", md: "50%", lg: "auto"}}
                    mx={'22px'}
                    // border="2px solid "
                    // borderColor='blue'
                >
                    <Button
                        // border="2px solid "
                        //borderColor='blue'
                        p="0px" bg="transparent" _hover={{bg: "none"}}
                    >
                        <Flex
                            align="center"
                            w={'100%'}
                            bg="hsla(0,0%,100%,.3)"
                            borderRadius="15px"
                            justifyContent="center"
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
                            <Icon as={FaCube} me="6px"/>
                            <Text fontSize="sm" color='pmpurple.13' fontWeight="bold">
                                {/*TODO: when I click on this button I want it to route me to the validations page*/}
                                <Link as={ReachLink} to={'/validate'} _hover={{textDecor: 'none'}}>
                                    {/*{addressHasIdentityBool === false ?*/}
                                        <Text fontSize={'18px'} color={'red.600'} letterSpacing={'1px'}
                                              textShadow={'#F7FAFC 0px 0px 10px'}>
                                            Non-Registered Wallet Account
                                        </Text>
                                        {/*// :*/}
                                        {/*NFI Transaction Hash: ${ of any user}*/}
                                    {/*// }*/}
                                </Link>
                            </Text>
                        </Flex>
                    </Button>
                </Flex>
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
                        <Tooltip hasArrow label='Total Mentions about this PaperMaster' bg='pmpurple.4'
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
                                 label='Number of Validations this PaperMaster has given to other Blockchain accounts'
                                 bg='pmpurple.4' color='pmpurple.13'>
                            <Text fontSize={'sm'} color={'pmpurple.11'}>
                                Given Validations
                            </Text>
                        </Tooltip>
                    </Stack>
                </HStack>
            </VStack>
        </Flex>
    )
};

export default Header;
