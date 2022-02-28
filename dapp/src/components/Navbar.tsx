import React, { ReactNode } from 'react';
import Sparkle from 'react-sparkle';
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
    Stack, Text, Container,
} from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import {Link as ReachLink, useParams} from "react-router-dom";
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
import RegisterSlice, {accountsArr, requestAccountsAsyncAction, statusOfArr} from '../features/RequestWalletAccountSlice';

export const SparklyComponent = () => (
    // Note: the parent of Sparkle must be positioned relatively or absolutely
    <div style={{ position: 'relative' }}>
        <Sparkle />
    </div>
)

export default function Navbar() {
    //const {isOpen, onOpen, onClose} = useDisclosure();
    const getAccountsArr = useAppSelector((state) => state.register.accounts);
    const tokenIDtoIdentityStruct = useAppSelector((state) => state.minted.tokenIDtoIdentityStruct);
    const { walletAccount } = useParams();

    const dispatch = useAppDispatch();

    return (
        <Box p={'4px'} alignItems={'center'} border={'0px solid'} borderColor={"pmpurple.8"} bg={"pmpurple.2"}>
            <HStack spacing={0} alignItems={'center'}>
                <Box px={'16px'}><Link as={ReachLink} to="/"><img src={Logo}/></Link></Box>
                <Menu>

                    <Menu>
                        <Link as={ReachLink} to='/identity'>
                            <MenuButton
                                as={Button}
                                color={'pmpurple.13'}
                                _hover={{color: 'pmpurple.9'}}
                                //_expanded={{ bg: 'none !important' }}
                                _active={{
                                    color: 'pmpurple.9',
                                    transform: 'scale(0.96)',
                                }}
                              >
                                <MenuItem
                                    _focus={{ boxShadow: 'none' }}
                                    fontSize={'18px'} fontWeight={'Bold'}
                                          icon={<MdManageAccounts fontSize={'20px'}/>}>Identity</MenuItem>
                            </MenuButton>
                        </Link>
                    </Menu>

                    <Menu>
                        <Link as={ReachLink} to='/search' variant={'navLinks'}>
                            <MenuButton
                                as={Button}
                                color={'pmpurple.13'}
                                _hover={{color: 'pmpurple.9'}}
                                _active={{
                                    color: 'pmpurple.9',
                                    transform: 'scale(0.96)',
                                }}
                            >
                                <MenuItem
                                    _focus={{ boxShadow: 'none' }}
                                    fontSize={'18px'} fontWeight={'Bold'}
                                          icon={<FaScroll fontSize={'16px'}/>}>Search</MenuItem>
                            </MenuButton>
                        </Link>
                    </Menu>

                    <Menu>


                        <Link as={ReachLink} to='/CloudHWM' variant={'navLinks'}>
                            <MenuButton
                                as={Button}
                                color={'pmpurple.13'}
                                _hover={{color: 'pmpurple.9'}}
                                _active={{
                                    color: 'pmpurple.9',
                                    transform: 'scale(0.96)',
                                }}
                            >
                                <MenuItem
                                    _focus={{ boxShadow: 'none' }}
                                    fontSize={'18px'} fontWeight={'Bold'}
                                          icon={<GiHeatHaze fontSize={'18px'}/>}>CloudHWM</MenuItem>
                            </MenuButton>
                        </Link>
                    </Menu>
                    <Menu>


                        <Link as={ReachLink} to='/communityforum' variant={'navLinks'}>
                            <MenuButton
                                as={Button}
                                color={'pmpurple.13'}
                                _hover={{color: 'pmpurple.9'}}
                                _active={{
                                    color: 'pmpurple.9',
                                    transform: 'scale(0.96)',
                                }}
                            >
                                <MenuItem
                                    _focus={{ boxShadow: 'none' }}
                                    fontSize={'18px'} fontWeight={'Bold'}
                                          icon={<GiDiscussion fontSize={'16px'}/>}>Community
                                    Forum</MenuItem>
                            </MenuButton>
                        </Link>
                    </Menu>
                    <Menu>
                        <Link as={ReachLink} to='/learn' variant={'navLinks'}>
                            <MenuButton
                                as={Button}
                                color={'pmpurple.13'}
                                _hover={{color: 'pmpurple.9'}}
                                _active={{
                                    color: 'pmpurple.9',
                                    transform: 'scale(0.96)',
                                }}
                            >
                                <MenuItem
                                    _focus={{ boxShadow: 'none' }}
                                    fontSize={'18px'} fontWeight={'Bold'}
                                          icon={<ImBooks fontSize={'16px'}/>}>Learn</MenuItem>
                            </MenuButton>
                        </Link>
                    </Menu>

                    <Menu>
                        <Link as={ReachLink} to='/yourpeople' variant={'navLinks'}>
                            <MenuButton
                                as={Button}
                                color={'pmpurple.13'}
                                _hover={{color: 'pmpurple.9'}}
                                _active={{
                                    color: 'pmpurple.9',
                                    transform: 'scale(0.96)',
                                }}
                            >
                                <MenuItem
                                    _focus={{ boxShadow: 'none' }}
                                    fontSize={'18px'} fontWeight={'Bold'}
                                          icon={<GiNewShoot fontSize={'16px'}/>}>Your
                                    People</MenuItem>
                            </MenuButton>
                        </Link>
                    </Menu>

                    <Menu>

                        {getAccountsArr.length === 0 ?

                            <MenuButton
                                //border={'1px solid blue'}
                                as={Button}
                                color={'pmpurple.13'}
                                onClick={() => {
                                    console.log('i am clicked')
                                    dispatch(requestAccountsAsyncAction());
                                }}
                                _hover={{color: 'pmpurple.9'}}
                                // _active={{
                                //     color: '#c1aec1',
                                //     transform: 'scale(0.96)'
                                // }}
                            >
                                <MenuItem
                                    _focus={{boxShadow: 'none'}}
                                    fontSize={'18px'} fontWeight={'Bold'}
                                    icon={<SiSololearn fontSize={'16px'}/>}>Connect Wallet</MenuItem>

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

                            </MenuButton>

                            :
                            <MenuButton>
                                <MenuItem
                                    _focus={{boxShadow: 'none !important'}}
                                    color={'pmpurple.13'} fontSize={'18px'} fontWeight={'Bold'}
                                    icon={<SiSololearn fontSize={'16px'}/>}>Connected</MenuItem>
                            </MenuButton>
                        }

                    </Menu>
                </Menu>
            </HStack>
        </Box>
    )
};