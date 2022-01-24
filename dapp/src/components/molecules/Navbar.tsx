import React, { ReactNode } from 'react';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
} from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import {Link as ReachLink} from "react-router-dom";
import {HamburgerIcon, CloseIcon, AddIcon, EditIcon, LinkIcon} from '@chakra-ui/icons';
import { Icon } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFileAlt, faLink, faChartLine, faBookmark, faPaperclip, faScroll, faUserCheck } from '@fortawesome/free-solid-svg-icons'
import Logo from '../../PaperMastersLogoGIMP.png';
import PMLogo from '../../legoLavendar.png';
import ConnectAccounts from "../atoms/ConnectAccounts";
// import {Folder} from 'react-kawaii';

const NavLink = (props: any) => (

    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
          //  bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}>
        {props.children}
    </Link>

);


export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box border={'1px solid #daceda'} bg={useColorModeValue('#f2eef2', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box><Link as={ReachLink} to="/"><img src={Logo}/></Link></Box>

                        <HStack spacing={12} alignItems={'right'}>
                            <Menu >
                                <Menu >
                                    <MenuButton
                                        as={Button}
                                        color='#5c415c'
                                        size='md'
                                        square={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        _hover={{ color: '#906e90' }}
                                        _active={{
                                            color: '#906e90',
                                            transform: 'scale(1.08)'
                                        }}
                                        minW={0}> Products
                                    </MenuButton>
                                    <MenuList >
                                        <MenuItem as={ReachLink} to='/Analytics'  icon={<FontAwesomeIcon icon={faChartLine} />} >PM Identity</MenuItem>
                                        <MenuDivider />
                                        <MenuItem as={ReachLink} to='/Create'   icon={<FontAwesomeIcon icon={faBookmark} />} > Create</MenuItem>
                                        <MenuItem as={ReachLink} to='/Validate'   icon={<FontAwesomeIcon icon={faUserCheck} />} >Validate</MenuItem>
                                        <MenuItem as={ReachLink} to='/Attach'  icon={<FontAwesomeIcon icon={faScroll} />} >Attach</MenuItem>
                                        <MenuItem as={ReachLink} to='/Search'  icon={<FontAwesomeIcon icon={faSearch} />} >Search</MenuItem>
                                    </MenuList>
                                </Menu>
                                <Menu >
                                    <MenuButton
                                        as={Button}
                                        color='#5c415c'
                                        size='md'
                                        square={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        _hover={{ color: '#906e90' }}
                                        _active={{
                                            color: '#906e90',
                                            transform: 'scale(1.08)'
                                        }}
                                        minW={0}> Analytics
                                    </MenuButton>
                                    <MenuList >
                                        <MenuItem as={ReachLink} to='/Analytics'  icon={<FontAwesomeIcon icon={faChartLine} />} >Analytics</MenuItem>
                                    </MenuList>
                                </Menu>
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        color='#5c415c'
                                        size='md'
                                        square={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        _hover={{ color: '#906e90' }}
                                        _active={{
                                            color: '#906e90',
                                            transform: 'scale(1.08)'
                                        }}
                                        minW={0}> Learn
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem as={ReachLink} to='/mint' >Catalog of PM Identities</MenuItem>
                                        <MenuDivider />
                                        <MenuItem as={ReachLink} to='/catalog'> Create a PM Identity</MenuItem>
                                        <MenuItem as={ReachLink} to='/authenticate' >Validation of PM Identities</MenuItem>
                                    </MenuList>
                                </Menu>
                                <Menu >
                                    <MenuButton
                                        as={Button}
                                        color='#5c415c'
                                        size='md'
                                        square={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        _hover={{ color: '#906e90' }}
                                        _active={{
                                            color: '#906e90',
                                            transform: 'scale(1.08)'
                                        }}
                                        minW={0}> Company
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem as={ReachLink} to='/Analytics' >Analytics</MenuItem>
                                        <MenuItem as={ReachLink} to='/AboutUs' >About Us</MenuItem>
                                        <MenuItem as={ReachLink} to='/ContactUs' >Contact Us</MenuItem>
                                        <MenuItem as={ReachLink} to='/SupportUs' >Support Us</MenuItem>
                                        <MenuItem as={ReachLink} to='/News' >News</MenuItem>
                                    </MenuList>
                                </Menu>
                                <Menu >
                                    <MenuButton
                                        as={Button}
                                        color='#5c415c'
                                        size='md'
                                        square={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        _hover={{ color: '#906e90' }}
                                        _active={{
                                            color: '#906e90',
                                            transform: 'scale(1.08)'
                                        }}
                                        minW={0}> Security
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem as={ReachLink} to='/mint' >Create a PM Identity</MenuItem>
                                        <MenuItem as={ReachLink} to='/authenticate' >Validation of PM Identities</MenuItem>
                                        <MenuDivider />
                                        <MenuItem as={ReachLink} to='/catalog'>Catalog of PM Identities</MenuItem>
                                    </MenuList>
                                </Menu>
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        color='#5c415c'
                                        size='md'
                                        square={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        _hover={{ color: '#906e90' }}
                                        _active={{
                                            color: '#906e90',
                                            transform: 'scale(1.08)'
                                        }}
                                        minW={0}> FAQ
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem as={ReachLink} to='/FAQ' >FAQ</MenuItem>
                                    </MenuList>
                                </Menu>
                                <Menu >
                                    <MenuButton
                                        as={Button}
                                        color='#5c415c'
                                        size='md'
                                        square={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        _hover={{ color: '#906e90' }}
                                        _active={{
                                            color: '#906e90',
                                            transform: 'scale(1.08)'
                                        }}
                                        minW={0}> News and Events
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem as={ReachLink} to='/mint' >Create a PM Identity</MenuItem>
                                        <MenuItem as={ReachLink} to='/authenticate' >Validation of PM Identities</MenuItem>
                                        <MenuDivider />
                                        <MenuItem as={ReachLink} to='/catalog'>Catalog of PM Identities</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Menu>
                        </HStack>
                    </HStack>

                    <Flex alignItems={'center'}>
                        {/*<Button*/}
                        {/*    variant={'solid'}*/}
                        {/*    colorScheme={'purple'}*/}
                        {/*    size={'sm'}*/}
                        {/*    mr={4}*/}
                        {/*    leftIcon={<AddIcon />}>*/}
                        {/*    Needs to connect to Wallet?*/}
                        {/*</Button>*/}
                        <ConnectAccounts/>

                    </Flex>
                </Flex>


            </Box>
        </>
    );
}