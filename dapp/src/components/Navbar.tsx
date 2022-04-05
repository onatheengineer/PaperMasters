import React, {FC, ReactNode, useEffect} from 'react';
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
    Collapse,
    Popover,
    PopoverTrigger,
    PopoverContent,

    useBreakpointValue,
    MenuIcon, Spacer, Icon, Tooltip,
} from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { AddIcon, EditIcon, LinkIcon} from '@chakra-ui/icons';
import { FaScroll } from "react-icons/fa";
import { SiSololearn } from "react-icons/si";
import { ImBooks } from "react-icons/im";
import {GiBookshelf, GiNewShoot, GiHeatHaze, GiDiscussion, GiBookCover, GiFlowerPot, GiFlowerHat} from "react-icons/gi";
import Logo from '../assets/PaperMastersLogoGIMP.png';
import PMLogo from '../assets/legoLavendar.png';
import {IoMdCheckmarkCircleOutline} from "react-icons/io";
import {RiPlantFill} from "react-icons/ri";
import {FiTrendingUp} from "react-icons/fi";
import Web3 from "web3";
import RegisterSlice, {
    requestUserWalletAction,
    statusOfArr
} from '../features/UserWalletSlice';
import detectEthereumProvider from "@metamask/detect-provider";
import identity from "./pages/Identity";
import {AiOutlineFileSearch} from "react-icons/ai";
import {BiBookmarkHeart, BiHomeHeart} from "react-icons/bi";
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons';
import {MdManageAccounts, MdOutlineReport, MdOutlineWarningAmber, MdOutlineNaturePeople} from "react-icons/md";
import PMGIMPResized from '../assets/PMGIMPResized.png';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {Link as ReachLink, To, useParams} from "react-router-dom";
import PMLogoFull from '../assets/icons/PMLogoFull';



//
//
// interface navMenuItem {
//     dropDown: boolean,
//     navMenuName: string,
//     iconNav: JSX.Element,
//     menuSubArr: JSX.Element[]
//
// }
// //{`/identity/${requestAccountsArr[0]}`}
// //MdManageAccounts
// export const NavMenuItem:FC<navMenuItem> = ({ dropDown, navMenuName, iconNav, menuSubArr}) => {
//
//     return (
//         <Flex>
//             <Menu>
//                 <MenuButton
//                     as={Button}
//                     leftIcon={iconNav}
//                     color={'pmpurple.13'}
//                     focusBorderColor='none !important'
//                     boxShadow="none !important"
//                     _focus={
//                         {boxShadow: "none !important"}}
//                     _hover={{color: 'pmpurple.9'}}
//                     _expanded={{bg: 'none !important'}}
//                     _active={{
//                         color: 'pmpurple.9',
//                         transform: 'scale(0.98)',
//                     }}
//                 >
//                     <Text pl={'2px'} textAlign={'center'} fontSize="lg" color={'pmpurple.13'}
//                           fontWeight="bold">
//                         {navMenuName}
//                     </Text>
//                 </MenuButton>
//
//                 {dropDown &&
//                     <MenuList>
//                         {menuSubArr}
//                     </MenuList>
//                 }
//             </Menu>
//         </Flex>
//     )
// }
//
//
// export default function Navbar() {
//     //const {isOpen, onOpen, onClose} = useDisclosure();
//     const tokenIDtoIdentityStruct = useAppSelector((state) => state.minted.tokenIDtoIdentityStruct);
//     const {walletAccount} = useParams();
//     const requestAccountsArr = useAppSelector((state) => state.register.accounts);
//     const dispatch = useAppDispatch();
//
//
//     return (
//         <Box
//             //maxW={'container.xl'}
//             // width={[
//             //     "100%", // base
//             //     "50%", // 480px upwards
//             //     "25%", // 768px upwards
//             //     "15%", // 992px upwards
//             // ]}
//             h={'fit-content'}
//             p={0}
//             border={'2px solid red'}
//             //alignItems={'center'}
//             //flexBasis={{ base: "100%", md: "auto" }}
//         >
//             <Flex
//                 //w={'full'}
//                 //h={{base: 'auto', md: '100vh'}}
//                 //py={[0, 3, 6]}
//                 direction={{base: "column", md: 'row'}}
//                 border={'2px solid blue'}
//             >
//
//                 <HStack
//                     //spacing={8}
//                     alignItems={'center'}>
//                     <Link as={ReachLink} to="/"><img src={Logo}/></Link>
//                     <Menu>
//
//                         <NavMenuItem navMenuName={'Non-Fungible Identity'}
//                                      iconNav={<MdManageAccounts fontSize={'18px'}/>}
//                                      dropDown={true}
//                                      menuSubArr={[<NavSubItem menuSubName={'Identity'}
//                                                               reachSubLink={`/identity/${requestAccountsArr[0]}`}
//                                                               iconSubItem={<MdManageAccounts fontSize={'18px'}/>}/>,
//                                          <MenuDivider/>,
//                                          <NavSubItem menuSubName={'Register'} reachSubLink={'/register'}
//                                                      iconSubItem={<BiBookmarkHeart fontSize={'18px'}/>}/>,
//                                          <NavSubItem menuSubName={'Validate'} reachSubLink={'/validate'}
//                                                      iconSubItem={<IoMdCheckmarkCircleOutline fontSize={'18px'}/>}/>,
//                                          <NavSubItem menuSubName={'Report'} reachSubLink={'/report'}
//                                                      iconSubItem={<MdOutlineReport fontSize={'18px'}/>}/>
//                                      ]}
//                         />
//                         <Link as={ReachLink} to={"/search"}>
//                             <NavMenuItem navMenuName={'Search'}
//                                          iconNav={<MdOutlineNaturePeople fontSize={'18px'} fontWeight={'bolder'}/>}
//                                          dropDown={false}
//                                          menuSubArr={[]}
//                             />
//                         </Link>
//
//                         <Link as={ReachLink} to={"/cloudhwm"}>
//                             <NavMenuItem navMenuName={'CloudHWM'} iconNav={<GiHeatHaze fontSize={'18px'}/>}
//                                          dropDown={false}
//                                          menuSubArr={[]}
//                             />
//                         </Link>
//
//                         <NavMenuItem navMenuName={'Learning Center'} iconNav={<ImBooks fontSize={'18px'}/>}
//                                      dropDown={true}
//                                      menuSubArr={[<NavSubItem menuSubName={'Frequently Asked Questions'}
//                                                               reachSubLink={'/learningCenter'}
//                                                               iconSubItem={<GiDiscussion fontSize={'18px'}/>}/>,
//                                          <MenuDivider/>,
//                                          <NavSubItem menuSubName={'New & Updated Features'}
//                                                      reachSubLink={'/learningCenter'}
//                                                      iconSubItem={<GiFlowerPot fontSize={'18px'}/>}/>,
//                                          <NavSubItem menuSubName={'Report Suspicious Activity'}
//                                                      reachSubLink={'/learningCenter'}
//                                                      iconSubItem={<MdOutlineWarningAmber fontSize={'18px'}/>}/>,
//                                      ]}
//                         />
//
//                         <NavMenuItem navMenuName={'Your People'} iconNav={<FaScroll fontSize={'18px'}/>}
//                                      dropDown={true}
//                                      menuSubArr={[<NavSubItem menuSubName={'About Us'} reachSubLink={'/about'}
//                                                               iconSubItem={<GiFlowerHat fontSize={'18px'}/>}/>,
//                                          <MenuDivider/>,
//                                          <NavSubItem menuSubName={'Analytics'} reachSubLink={'/analytics'}
//                                                      iconSubItem={<FiTrendingUp fontSize={'18px'}/>}/>,
//                                          <NavSubItem menuSubName={'Support'} reachSubLink={'/support'}
//                                                      iconSubItem={<RiPlantFill fontSize={'18px'}/>}/>,
//                                      ]}
//                         />
//
//                         {/*<Spacer/>*/}
//
//                         <MenuItem>
//                             {requestAccountsArr.length === 0 ?
//                                 <MenuButton
//                                     //border={'1px solid blue'}
//                                     as={Button}
//                                     color={'pmpurple.13'}
//                                     onClick={() => {
//                                         console.log('i am clicked')
//                                         dispatch(requestAccountsAsyncAction());
//                                     }}
//                                     _hover={{color: 'pmpurple.9'}}
//                                     // _active={{
//                                     //     color: '#c1aec1',
//                                     //     transform: 'scale(0.96)'
//                                     // }}
//                                 >
//                                     <MenuItem
//                                         _focus={{boxShadow: 'none'}}
//                                         fontSize={'18px'} fontWeight={'Bold'}
//                                         icon={<SiSololearn fontSize={'16px'}/>}>Connect Wallet</MenuItem>
//
//
//
//                                 </MenuButton>
//
//                                 :
//
//                                 <MenuButton>
//                                     <MenuItem
//                                         _focus={{boxShadow: 'none !important'}}
//                                         color={'pmpurple.13'} fontSize={'18px'} fontWeight={'Bold'}
//                                         icon={<SiSololearn fontSize={'16px'}/>}>Connected</MenuItem>
//                                 </MenuButton>
//                             }
//
//                         </MenuItem>
//                     </Menu>
//                 </HStack>
//             </Flex>
//         </Box>
//     )
// };



// interface navSubItemInterface {
//     reachSubLink: To,
//     menuSubName: string,
//     iconSubItem: JSX.Element,
// }
//     export const NavSubItem:FC<navSubItemInterface> = ({reachSubLink, menuSubName, iconSubItem}) =>{
//     return(
//         <Box
//             textAlign={'center'}
//             _focus={
//                 {boxShadow: "none !important"}}
//         >
//         <MenuItem
//             as={ReachLink} to={reachSubLink}
//             _hover={{color: 'pmpurple.9'}}
//             //_expanded={{ bg: 'none !important' }}
//             _active={{
//                 color: 'pmpurple.9',
//                 transform: 'scale(0.98)',
//             }}
//             pl={'20px'}
//             color={'pmpurple.13'}
//             icon={iconSubItem}
//         >
//             <Text fontSize="md" color={'pmpurple.13'} fontWeight="semi-bold">
//                 {menuSubName}
//             </Text>
//         </MenuItem>
//         </Box>
//     ) }





export default function WithSubnavigation() {
    const {isOpen, onToggle} = useDisclosure();
    const tokenIDtoIdentityStruct = useAppSelector((state) => state.minted.tokenIDtoIdentityStruct);
    const {walletAccount} = useParams();
    const requestAccountsArr = useAppSelector((state) => state.register.accounts);
    const dispatch = useAppDispatch();


    return (
        <Box>
            <Flex
                bg={useColorModeValue('pmpurple.2', 'gray.800')}
                color={useColorModeValue('pmpurple.13', 'white')}
                minH={'60px'}
                py={{base: 2}}
                px={{base: 4}}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('pmpurple.8', 'gray.900')}
                align={'center'}>
                <Flex
                    flex={{base: 1, md: 'auto'}}
                    ml={{base: -2}}
                    //border={'1px solid blue'}
                    display={{base: 'flex', md: 'flex', lg: 'flex', xl: 'none'}}>
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? <CloseIcon w={3} h={3}/> : <HamburgerIcon w={5} h={5}/>
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{base: 1}} justify={{base: 'center', md: 'start'}}>
                    <Link
                        as={ReachLink}
                        to={'/'}
                        textAlign={useBreakpointValue({base: 'center', md: 'left'})}
                        fontFamily={'heading'}
                        color={useColorModeValue('pmpurple.13', 'white')}
                    >
                        <PMLogoFull fill={'#5c415c'} width={'155px'}/>
                    </Link>

                    <Flex display={{base: 'none', xl: 'flex'}} ml={10}>
                        <DesktopNav/>
                    </Flex>
                </Flex>
                <Stack
                    flex={{base: 1, md: 0}}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}>
                    {/*this box in necessary for sparkle to work correctly*/}
                    <Box>
                        {requestAccountsArr.length === 0 ?
                            <Tooltip hasArrow label='Metamask is waiting for you to make a move' placement={'bottom-end'} border={'1px solid #694b69'}
                                     borderRadius={'3px'} bg='pmpurple.5' color='pmpurple.13' m={'-10px'} >
                            <Box style={{position: 'relative'}}
                                //border={'1px solid red'}
                            >

                            <Button
                                display={{base: 'inline-flex', md: 'inline-flex'}}
                                fontSize={'md'}
                                fontWeight={600}
                                color={'pmpurple.13'}
                                bg={'pmpurple.2'}
                                //href={'#'}
                                _hover={{
                                    bg: 'pmpurple.3',
                                }}
                                onClick={() => {
                                         console.log('i am clicked')
                                         dispatch(requestUserWalletAction());
                                     }}
                            >

                                    <HStack>
                                        <SiSololearn fontSize={'16px'}/>
                                        <Text
                                            pl={2}
                                        >
                                            Connect Wallet
                                        </Text>
                                    </HStack>

                            </Button>

                            <Sparkle
                                color="#694b69"
                                count={15}
                                minSize={5}
                                maxSize={10}
                                overflowPx={0}
                                fadeOutSpeed={20}
                                flicker={false}
                                //newSparkleOnFadeOut={false}
                                //flickerSpeed="fast"
                            />
                            </Box>
                            </Tooltip>
                            :
                            <Box
                                display={{base: 'inline-flex', md: 'inline-flex'}}
                                fontSize={'md'}
                                fontWeight={600}
                                color={'pmpurple.8'}
                                bg={'pmpurple.2'}
                                //href={'#'}
                        //         _hover={{
                        //             bg: 'pmpurple.3',
                        // }}
                            >

                                <HStack>
                                    <SiSololearn fontSize={'16px'}/>
                                    <Text>
                                        Connected
                                    </Text>
                                </HStack>
                            </Box>
                        }
                    </Box>
                </Stack>
            </Flex>
            <Collapse in={isOpen} animateOpacity>
                <MobileNav/>
            </Collapse>
        </Box>
    );
}

const DesktopNav = () => {
    const linkColor = 'pmpurple.13';
    const linkHoverColor = 'pmpurple.8';
    const popoverContentBgColor = 'pmpurple.4';

    return (
        <Stack direction={'row'} spacing={8}
        alignItems={'center'}
        >
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <HStack
                            //spacing={5}
                            >
                                {!navItem.navLink ?
                                    <Link
                                        as={Link}
                                        display={'inline'}
                                        p={2}
                                        fontSize={'md'}
                                        fontWeight={500}
                                        color={linkColor}
                                        _hover={{
                                            textDecoration: 'none',
                                            color: linkHoverColor,
                                        }}>
                                        <HStack
                                            //border={'1px solid blue'}
                                        >
                                            {navItem.navIcon}
                                            <Text>
                                                {navItem.label}
                                            </Text>
                                        </HStack>

                                    </Link>
                                    :
                                    <Link
                                        as={ReachLink}
                                        to={navItem.navLink}
                                        p={2}
                                        fontSize={'md'}
                                        fontWeight={500}
                                        color={linkColor}
                                        _hover={{
                                            textDecoration: 'none',
                                            color: linkHoverColor,
                                        }}>
                                        <HStack
                                            //border={'1px solid blue'}
                                        >
                                            {navItem.navIcon}
                                            <Text>
                                                {navItem.label}
                                            </Text>
                                        </HStack>
                                    </Link>
                                }

                            </HStack>

                        </PopoverTrigger>


                        {navItem.children && (
                            <PopoverContent
                                border={'1px solid'}
                                borderColor={'pmpurple.10'}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                //rounded={'xl'}
                                minW={'sm'}>
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, subLabel, navLink, navIcon }: NavItem) => {

    return (

        <Link
            as={ReachLink}
            to={navLink as To}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('pmpurple.5', 'gray.900'),
                textDecoration: 'none'
            }}>
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        // _groupHover={{ color: 'pmpurple.13' }}
                        fontWeight={500}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
            </Stack>
        </Link>
    );
};

const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue('pmpurple.13', 'pmpurple.6')}
            p={4}
            display={{ lg: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, navLink, navIcon }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();
    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                // to={navLink ? navLink : null}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text
                    fontWeight={600}
                    color={useColorModeValue('pmpurple.13', 'pmpurple.13')}>
                    {navIcon}
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>
            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('pmpurple.8', 'pmpurple.8')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <Link
                                  // to={child.navLink}
                                  key={child.label} py={2} >
                                {navIcon}
                                {child.label}
                            </Link>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    navIcon?: JSX.Element;
    navLink?: To,
}

const NAV_ITEMS: Array<NavItem> = [
    // {
    //     label: '',
    //     navIcon: <PMLogoFull fill={'#5c415c'} width={'170px'}/>,
    //     navLink: '/',
    // },
    {
        label: 'Non-Fungible Identity',
        navIcon: <MdManageAccounts fontSize={'18px'}/>,
        children: [
            {
                label: 'Identity',
                subLabel: 'Your Authentic Identity',
                navIcon: <MdManageAccounts fontSize={'18px'}/>,
                navLink: '/identity/${requestAccountsArr[0]}',
            },
            {
                label: 'Register',
                subLabel: 'Register your wallet account',
                navIcon: <BiBookmarkHeart fontSize={'18px'}/>,
                navLink: '/register',
            },
            {
                label: 'Validate (coming soon)',
                subLabel: 'Authenticate a wallet account',
                navIcon: <IoMdCheckmarkCircleOutline fontSize={'18px'}/>,
                navLink: '/validate',
            },
            {
                label: 'Report (coming soon)',
                subLabel: 'Report a wallet account for wrongful activity',
                navIcon: <MdOutlineReport fontSize={'18px'}/>,
                navLink: 'report',
            },
        ],
    },
    {
        label: 'Search',
        navIcon: <MdOutlineNaturePeople fontSize={'18px'} fontWeight={'bolder'}/>,
        navLink: '/search',
    },
    {
        label: 'Learning Center',
        navIcon: <ImBooks fontSize={'18px'}/>,
        children: [
            {
                label: 'FAQ',
                subLabel: 'Frequently Asked Questions',
                navIcon: <GiDiscussion fontSize={'18px'}/>,
                navLink: '/learn',
            },
            {
                label: 'New & Updated Features',
                subLabel: 'Stories to come',
                navIcon: <GiFlowerPot fontSize={'18px'}/>,
                navLink: '/learn',
            },
            // {
            //     label: 'Report Suspicious Activity',
            //     subLabel: 'An exclusive list for contract work',
            //     navIcon: <MdOutlineWarningAmber fontSize={'18px'}/>,
            //     navLink: '/learn',
            // },
        ],
    },
    {
        label: 'CloudHWM',
        navIcon: <GiHeatHaze fontSize={'18px'}/>,
        navLink: '/cloudhwm',
    },
    {
        label: 'Your People',
        navIcon: <FaScroll fontSize={'18px'}/>,
        children: [
            {
                label: 'About Us',
                subLabel: 'Were not going anywhere',
                navIcon: <GiFlowerHat fontSize={'18px'}/>,
                navLink: '/yourpeople',
            },
            {
                label: 'Support',
                subLabel: 'Support the project',
                navIcon: <RiPlantFill fontSize={'18px'}/>,
                navLink: '/yourpeople',

            },
            {
                label: 'Analytics',
                navIcon: <FiTrendingUp fontSize={'18px'}/>,
                subLabel: 'Project Statistics',
                navLink: '/analytics'
            },
        ],
    },
];