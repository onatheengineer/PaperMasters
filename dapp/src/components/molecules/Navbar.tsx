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
import { FaPlug, FaSearch, FaFileAlt, FaLink, FaChartLine, FaBookmark, FaPaperclip, FaScroll, FaUserCheck, FaQuestionCircle, FaConnectdevelop } from "react-icons/fa";
import { SiSololearn } from "react-icons/si";
import { ImBooks } from "react-icons/im";
import { GiBookshelf, GiNewShoot } from "react-icons/gi";
import { MdManageAccounts } from "react-icons/md";
import Logo from '../../PaperMastersLogoGIMP.png';
import PMLogo from '../../legoLavendar.png';
import PMGIMPResized from '../../PMGIMPResized.png';
import ConnectAccounts from "../atoms/ConnectAccounts";
import {IoMdCheckmarkCircleOutline} from "react-icons/io";
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
                                        size='lg'
                                        square={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        _hover={{ color: '#906e90' }}
                                        _active={{
                                            color: '#906e90',
                                            transform: 'scale(0.96)'
                                        }}
                                        minW={0}>

                                        <MenuItem as={ReachLink} to='/Products' icon={<FaPlug />} >Products</MenuItem>
                                    </MenuButton>
                                    <MenuList >
                                        <MenuItem as={ReachLink} to='/Analytics'  icon={<FaChartLine />} >PM Identity</MenuItem>
                                        <MenuDivider />
                                        <MenuItem as={ReachLink} to='/Create'   icon={<FaBookmark />} > Create</MenuItem>
                                        <MenuItem as={ReachLink} to='/Validate'   icon={<FaUserCheck />} >Validate</MenuItem>
                                        <MenuItem as={ReachLink} to='/Attach'  icon={<FaScroll />}>Attach</MenuItem>
                                        <MenuItem as={ReachLink} to='/Search'  icon={<FaSearch />}>Search</MenuItem>
                                    </MenuList>
                                </Menu>
                                <Menu >
                                    <MenuButton
                                        as={Button}
                                        color='#5c415c'
                                        size='lg'
                                        square={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        _hover={{ color: '#906e90' }}
                                        _active={{
                                            color: '#906e90',
                                            transform: 'scale(0.96)'
                                        }}
                                        minW={0}>

                                        <MenuItem as={ReachLink} to='/Analytics' icon={<FaScroll />} >Analytics</MenuItem>
                                    </MenuButton>
                                </Menu>
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        color='#5c415c'
                                        size='lg'
                                        square={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        _hover={{ color: '#906e90' }}
                                        _active={{
                                            color: '#906e90',
                                            transform: 'scale(0.96)'
                                        }}
                                        minW={0}>
                                        <MenuItem as={ReachLink} to='/Learn' icon={<ImBooks fontSize={'16px'} />} >Learn</MenuItem>
                                    </MenuButton>

                                </Menu>
                                <Menu >
                                    <MenuButton
                                        as={Button}
                                        color='#5c415c'
                                        size='lg'
                                        square={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        _hover={{ color: '#906e90' }}
                                        _active={{
                                            color: '#906e90',
                                            transform: 'scale(0.96)'
                                        }}
                                        minW={0}>
                                        <MenuItem as={ReachLink} to='/Company' icon={<FaConnectdevelop fontSize={'16px'}/>} >Company</MenuItem>
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem as={ReachLink} to='/AboutUs' >About Us</MenuItem>
                                        <MenuItem as={ReachLink} to='/ContactUs' >Contact Us</MenuItem>
                                        <MenuItem as={ReachLink} to='/Support the Project' >Support Us</MenuItem>
                                    </MenuList>
                                </Menu>
                                <Menu >
                                    <MenuButton
                                        as={Button}
                                        color='#5c415c'
                                        size='lg'
                                        square={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        _hover={{ color: '#906e90' }}
                                        _active={{
                                            color: '#906e90',
                                            transform: 'scale(0.96)'
                                        }}
                                        minW={0}>
                                        <MenuItem as={ReachLink} to='/Security' icon={<FaLink fontSize={'14px'} />} >Security</MenuItem>

                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem as={ReachLink} to='/PrivacyPolicy' >Privacy Policy</MenuItem>
                                        <MenuItem as={ReachLink} to='/TermsOfService' >Terms of Service</MenuItem>
                                    </MenuList>
                                </Menu>
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        color='#5c415c'
                                        size='lg'
                                        square={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        _hover={{ color: '#906e90' }}
                                        _active={{
                                            color: '#906e90',
                                            transform: 'scale(0.96)'
                                        }}
                                        minW={0}>
                                        <MenuItem as={ReachLink} to='/News' icon={<GiNewShoot fontSize={'16px'} />} >News</MenuItem>
                                    </MenuButton>
                                </Menu>
                                <Menu >
                                    <MenuButton
                                        as={Button}
                                        color='#5c415c'
                                        size='lg'
                                        square={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        _hover={{ color: '#906e90' }}
                                        _active={{
                                            color: '#906e90',
                                            transform: 'scale(0.96)'
                                        }}
                                        minW={0}>
                                        <MenuItem as={ReachLink} to='/FAQ' icon={<FaQuestionCircle fontSize={'14px'} />} >FAQ</MenuItem>
                                    </MenuButton>
                                </Menu>

                            </Menu>
                        </HStack>
                    </HStack>

                    <Flex alignItems={'center'}>

{/*bring in the navbar Avatar*/}

                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                size='lg'
                                minW={0}>
                                <Avatar
                                    size={'22px'}
                                    src={PMGIMPResized}
                                />
                            </MenuButton>

                            <MenuList>
                                {/*opens MetaMask and other wallets*/}

                                    <MenuItem as={ReachLink} to='/Profile' fontSize={'16px'} icon={<SiSololearn fontSize={'16px'} />} >Connect Wallet

                                        {/*<ConnectAccounts/>*/}
                                    </MenuItem>
                                    <MenuDivider />
                                <MenuItem as={ReachLink} to='/Profile' fontSize={'16px'} icon={<MdManageAccounts fontSize={'20px'}/>} >Profile</MenuItem>
                            </MenuList>


                        </Menu>

                    </Flex>
                </Flex>


            </Box>
        </>
    );
}