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
    Stack, Text,
} from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import {Link as ReachLink} from "react-router-dom";
import {HamburgerIcon, CloseIcon, AddIcon, EditIcon, LinkIcon} from '@chakra-ui/icons';
import { Icon } from '@chakra-ui/react';
import { FaPlug, FaSearch, FaFileAlt, FaLink, FaChartLine, FaBookmark, FaPaperclip, FaScroll, FaForumbee, FaUserCheck, FaQuestionCircle, FaConnectdevelop, FaServicestack } from "react-icons/fa";
import { SiSololearn } from "react-icons/si";
import { ImBooks } from "react-icons/im";
import {GiBookshelf, GiNewShoot, GiHeatHaze, GiDiscussion} from "react-icons/gi";
import { MdManageAccounts } from "react-icons/md";
import Logo from '../assets/PaperMastersLogoGIMP.png';
import PMLogo from '../assets/legoLavendar.png';
import PMGIMPResized from '../assets/PMGIMPResized.png';
import {IoMdCheckmarkCircleOutline} from "react-icons/io";
import {FiTrendingUp} from "react-icons/fi";
import Web3 from "web3";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import RegisterSlice, {accountsArr, RequestAccountsAsyncAction, statusOfArr} from '../features/RequestWalletAccountSlice';


export default function Navbar() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const getAccountsArr = useAppSelector((state)=> state.register.accounts);
    const dispatch = useAppDispatch();

    return (
        <>
            <Box alignItems={'center'} border={'1px solid #daceda'} bg={"pmpurple.2"} px={16}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon/> : <HamburgerIcon/>}
                        aria-label={'Open Menu'}
                        display={{md: 'none'}}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box><Link as={ReachLink} to="/"><img src={Logo}/></Link></Box>

                        <HStack spacing={10} alignItems={'right'}>
                            <Menu>
                                <Menu>
                                    <Link as={ReachLink} to='/identity' variant={'navLinks'}>
                                        <MenuButton
                                            as={Button}
                                            size='lg'
                                            square={'full'}
                                            variant={'link'}
                                            cursor={'pointer'}
                                            _hover={{color: 'pmpurple.9'}}
                                            _active={{
                                                color: '#906e90',
                                                transform: 'scale(0.96)',
                                            }}
                                            minW={0}>
                                            <MenuItem fontSize={'18px'} fontWeight={'Bold'}
                                                      icon={<MdManageAccounts fontSize={'20px'}/>}>Identity</MenuItem>
                                        </MenuButton>
                                    </Link>
                                </Menu>

                                <Menu>


                                    <Link as={ReachLink} to='/search' variant={'navLinks'} >
                                        <MenuButton
                                            as={Button}
                                            size='lg'
                                            square={'full'}
                                            variant={'link'}
                                            cursor={'pointer'}
                                            _hover={{color: 'pmpurple.9'}}
                                            _active={{
                                                color: '#906e90',
                                                transform: 'scale(0.96)'
                                            }}
                                            minW={0}>
                                            <MenuItem fontSize={'18px'} fontWeight={'Bold'}
                                                      icon={<FaScroll fontSize={'16px'}/>}>Search</MenuItem>
                                        </MenuButton>
                                    </Link>
                                </Menu>

                                <Menu>


                                    <Link as={ReachLink} to='/CloudHWM'  variant={'navLinks'} >
                                        <MenuButton
                                            as={Button}
                                            size='lg'
                                            square={'full'}
                                            variant={'link'}
                                            cursor={'pointer'}
                                            _hover={{color: 'pmpurple.9'}}
                                            _active={{
                                                color: '#906e90',
                                                transform: 'scale(0.96)'
                                            }}
                                            minW={0}>
                                            <MenuItem fontSize={'18px'} fontWeight={'Bold'}
                                                      icon={<GiHeatHaze fontSize={'18px'}/>}>CloudHWM</MenuItem>
                                        </MenuButton>
                                    </Link>
                                </Menu>
                                <Menu>


                                    <Link as={ReachLink} to='/communityforum'  variant={'navLinks'} >
                                        <MenuButton
                                            as={Button}
                                            size='lg'
                                            square={'full'}
                                            variant={'link'}
                                            cursor={'pointer'}
                                            _hover={{color: 'pmpurple.9'}}
                                            _active={{
                                                color: '#906e90',
                                                transform: 'scale(0.96)'
                                            }}
                                            minW={0}>
                                            <MenuItem fontSize={'18px'} fontWeight={'Bold'} icon={<GiDiscussion fontSize={'16px'}/>}>Community
                                                Forum</MenuItem>
                                        </MenuButton>
                                    </Link>
                                </Menu>
                                <Menu>
                                    <Link as={ReachLink} to='/learn'  variant={'navLinks'} >
                                        <MenuButton
                                            as={Button}
                                            size='lg'
                                            square={'full'}
                                            variant={'link'}
                                            cursor={'pointer'}
                                            _hover={{color: 'pmpurple.9'}}
                                            _active={{
                                                color: '#906e90',
                                                transform: 'scale(0.96)'
                                            }}
                                            minW={0}>
                                            <MenuItem fontSize={'18px'} fontWeight={'Bold'}
                                                      icon={<ImBooks fontSize={'16px'}/>}>Learn</MenuItem>
                                        </MenuButton>
                                    </Link>
                                </Menu>

                                <Menu>
                                    <Link as={ReachLink} to='/yourpeople'  variant={'navLinks'} >
                                        <MenuButton
                                            as={Button}
                                            size='lg'
                                             square={'full'}
                                            variant={'link'}
                                            cursor={'pointer'}
                                            _hover={{color: 'pmpurple.9'}}
                                            _active={{
                                                color: '#906e90',
                                                transform: 'scale(0.96)'
                                            }}
                                            minW={0}>
                                            <MenuItem fontSize={'18px'} fontWeight={'Bold'} icon={<GiNewShoot fontSize={'16px'}/>}>Your
                                                People</MenuItem>
                                        </MenuButton>
                                    </Link>
                                </Menu>
                                <Menu>
                                    {getAccountsArr.length === 0 ?
                                        <MenuButton
                                            as={Button}
                                            size='lg'
                                            color={'pmgreen.16'}
                                            onClick={()=> {
                                                console.log('i am clicked')
                                                dispatch(RequestAccountsAsyncAction());
                                            }}
                                            square={'full'}
                                            variant={'link'}
                                            cursor={'pointer'}
                                            _hover={{color: '#b4eeb4'}}
                                            // _active={{
                                            //     //color: '#7fa37f',
                                            //     transform: 'scale(0.96)'
                                            // }}
                                            minW={0}
                                        >
                                            <MenuItem fontSize={'18px'} fontWeight={'Bold'} icon={<SiSololearn fontSize={'16px'}/>}>Connect Wallet</MenuItem>

                                        </MenuButton>
                                        :  <MenuItem color={'pmgreen.21'} fontSize={'18px'} fontWeight={'Bold'} icon={<SiSololearn fontSize={'16px'}/>}>Connected</MenuItem>   }
                                </Menu>
                            </Menu>
                        </HStack>
                    </HStack>

                </Flex>
            </Box>
        </>
    );
}



{/*    <MenuItem as={ReachLink} to='/analytics'  icon={<FaChartLine />} >PM Identity</MenuItem>*/}
{/*    <MenuDivider />*/}
{/*    <MenuItem as={ReachLink} to='/register'   icon={<FaBookmark />} > Register</MenuItem>*/}
{/*    <MenuItem as={ReachLink} to='/validate'   icon={<FaUserCheck />} >Validate</MenuItem>*/}
{/*    <MenuItem as={ReachLink} to='/attach'  icon={<FaScroll />}>Attach</MenuItem>*/}

    {/*} <MenuItem icon={<FaServicestack />} >Services</MenuItem>

 <MenuItem as={ReachLink} to='/analytics' icon={<FiTrendingUp fontSize={'17px'}/>} >Analytics</MenuItem>
 <MenuItem as={ReachLink} to='/Learn' icon={<FaQuestionCircle fontSize={'14px'} />} >Learn</MenuItem>
 <MenuItem as={ReachLink} to='/communityforum' icon={<FaQuestionCircle fontSize={'14px'} />} >Community Forum</MenuItem>
 <MenuItem as={ReachLink} to='/security' icon={<FaLink fontSize={'14px'} />} >Security</MenuItem>
    <MenuItem as={ReachLink} to='/PrivacyPolicy' >Privacy Policy</MenuItem>
  <MenuItem as={ReachLink} to='/TermsOfService' >Terms of Service</MenuItem>
    <MenuItem as={ReachLink} to='/Company' icon={<FaScroll fontSize={'16px'}/>} >Company</MenuItem>
    <MenuItem as={ReachLink} to='/AboutUs' >About Us</MenuItem>
    <MenuItem as={ReachLink} to='/ContactUs' >Contact Us</MenuItem>
    <MenuItem as={ReachLink} to='/SupportProject' >Support the Project</MenuItem> */}