import React, { ReactNode, ReactText, useState, useEffect } from 'react';
import {Route, Routes, useLocation, useParams, useNavigate, Navigate, BrowserRouter} from 'react-router-dom';
import { AiOutlineFileSearch } from "react-icons/ai";
import { GiFlowerPot } from "react-icons/gi";
import { BiHomeHeart, BiBookmarkHeart } from 'react-icons/bi';
import { IoMdCheckmarkCircleOutline, IoMdAttach } from 'react-icons/io';
import {
    IconButton,
    Box,
    Flex,
    Icon,
    Link,
    Text,
    Heading,
    Menu,
    MenuButton,
    Divider,
    Avatar,
} from '@chakra-ui/react';
import {FiTrendingUp, FiMenu} from 'react-icons/fi';
import { IconType } from 'react-icons';
import type {FC} from 'react';
import Register from "./pages/Register";
import Search from './pages/Search'
import {Link as ReachLink, To} from "react-router-dom";
import {MdOutlineFeedback, MdOutlineReport, MdOutlineWarningAmber} from "react-icons/md";
import {GiBookCover, GiBookmark, GiDiscussion, GiSuspicious} from "react-icons/gi";
import Home from "./pages/Home";
import Identity from "./pages/Identity";
import CloudHWM from "./pages/CloudHWM";
import YourPeople from "./pages/YourPeople";
import Validate from "./pages/Validate";
import Analytics from "./pages/Analytics";
import Learn from "./pages/Learn";
import News from "./pages/News";
import Security from "./pages/Security";
import {useAppSelector} from "../app/hooks";
import Report from "./pages/Report";
import {accountArr} from "../features/accountArr/getAccountArrSlice";


interface InterfaceNavItem {
    title?: string;
    icon?: IconType;
    active?: boolean;
    navItemSize?: string;
    path: To;
}

interface InterfaceSidebar{
    icon?: IconType;
    profileName?: string;
}


export const NavItem: FC<InterfaceNavItem> = ({ icon, title, active,
                                                  navItemSize, path} ) => {


    return (
            <Flex
                mt={'28px'}
                flexDir="column"
                w="100%"
                h={'100%'}
                alignItems={navItemSize == "small" ? "center" : "flex-start"}
            >
                <Menu placement="right">
                    <Link
                        as={ReachLink}
                        to={path}
                        backgroundColor={active ? "#e6dee6" : "none"}
                        p={3}
                        borderRadius={8}
                        _hover={{textDecor: 'none', backgroundColor: "#c1aec1"}}
                        w={navItemSize ? "large" : "100%"}
                    >
                        <MenuButton w="100%">
                            <Flex>
                                <Icon as={icon} fontSize="xl" color={"#694b69"}/>
                                <Text ml={5} display={navItemSize == "small" ? "none" : "flex"}>{title}</Text>
                            </Flex>

                        </MenuButton>
                    </Link>
                </Menu>
            </Flex>
    )
}

export const Sidebar: FC<InterfaceSidebar>= ({icon, profileName} ) => {

    const location = useLocation();
    const [navSize, changeNavSize] = useState<'small' | 'large'>("small");
    const [navItemsRender, setNavItemRender] = useState<JSX.Element[] | null>([]);
    const [headerTitle, setHeaderTitle] = useState<string>('');
    const [headerText, setHeaderText] = useState<string>('');

    useEffect(() => {
        console.log(location);

        const SidebarIdentity = [
            <NavItem navItemSize={navSize} icon={AiOutlineFileSearch} title="Search NFIs" path={'/search'}/>,
            <NavItem navItemSize={navSize} icon={BiBookmarkHeart} title="Register" path={'/register'}/>,
            <NavItem navItemSize={navSize} icon={IoMdCheckmarkCircleOutline} title="Validate NFI" path={'/validate'}/>,
            <NavItem navItemSize={navSize} icon={MdOutlineReport} title="Report NFI" path={'/report'}/>,
            <NavItem navItemSize={navSize} icon={MdOutlineWarningAmber} title="Report suss" path={'/learn'}/>,
            <NavItem navItemSize={navSize} icon={GiBookCover} title="Learn" path={'/learn'}/>,
            <NavItem navItemSize={navSize} icon={FiTrendingUp} title="Analytics" path={'/analytics'}/>,
        ]

        const SidebarSearch = [
            <NavItem navItemSize={navSize} icon={AiOutlineFileSearch} title="Search NFIs" path={'/search'}/>,
            <NavItem navItemSize={navSize} icon={BiBookmarkHeart} title="Register" path={'/register'}/>,
            <NavItem navItemSize={navSize} icon={IoMdCheckmarkCircleOutline} title="Validate NFI" path={'/validate'}/>,
            <NavItem navItemSize={navSize} icon={MdOutlineReport} title="Report NFI" path={'/report'}/>,
            <NavItem navItemSize={navSize} icon={MdOutlineWarningAmber} title="Report suss" path={'/learn'}/>,
            <NavItem navItemSize={navSize} icon={GiBookCover} title="Learn" path={'/learn'}/>,
            <NavItem navItemSize={navSize} icon={FiTrendingUp} title="Analytics" path={'/analytics'}/>,

        ]

        const SidebarCommunityForum = [
            <NavItem navItemSize={navSize} icon={BiHomeHeart} title="Community Guidelines" path={'/learn'}/>,
            <NavItem navItemSize={navSize} icon={MdOutlineWarningAmber} title="Report Suspicious Activity"
                     path={'/learn'}/>,

        ]

        const SidebarNews = [
            <NavItem navItemSize={navSize} icon={BiHomeHeart} title="News" path={'/news'}/>,
            <NavItem navItemSize={navSize} icon={BiHomeHeart} title="New Features" path={'/news'}/>,
            <NavItem navItemSize={navSize} icon={BiHomeHeart} title="Updated Features" path={'/news'}/>,
            <NavItem navItemSize={navSize} icon={GiFlowerPot} title="Future Features" path={'/news'}/>,
            <NavItem navItemSize={navSize} icon={BiHomeHeart} title="Project Feedback Forum" path={'/news'}/>,
        ]

        const SidebarYourPeople = [
            <NavItem navItemSize={navSize} icon={BiHomeHeart} title="Dashboard" path={'/yourpeople'}/>,
            <NavItem navItemSize={navSize} icon={BiHomeHeart} title="About" path={'/yourpeople'}/>,
            <NavItem navItemSize={navSize} icon={BiHomeHeart} title="Contact" path={'/yourpeople'}/>,
            <NavItem navItemSize={navSize} icon={FiTrendingUp} title="Support" path={'/yourpeople'}/>,
            <NavItem navItemSize={navSize} icon={FiTrendingUp} title="Analytics" path={'/analytics'}/>,
        ]

        const SidebarAnalytics = [
            <NavItem navItemSize={navSize} icon={FiTrendingUp} title="Analytics" path={'/analytics'}/>,
        ]

        const SidebarSecurity = [
            <NavItem navItemSize={navSize} icon={FiTrendingUp} title="Analytics" path={'/analytics'}/>,
        ]

        const SidebarLearn = [
            <NavItem navItemSize={navSize} icon={GiBookCover} title="Learn" path={'/learn'}/>,
            <NavItem navItemSize={navSize} icon={FiTrendingUp} title="Analytics" path={'/analytics'}/>,
        ]

        switch (location.pathname) {
            case '/':
                setNavItemRender(null);
                //setHeaderTitle("");
                //setHeaderText("");
                break;
            case '/register':
            case '/validate':
            case '/report':
                setNavItemRender(SidebarIdentity);
                setHeaderTitle("NFI");
                //setHeaderText("Non-Fungible Token");
                break;
            case '/search':
                setNavItemRender(SidebarSearch);
                setHeaderTitle("Search");
                //setHeaderText("sdfsdfssdfsddf");
                break;
            case '/learn':
                setNavItemRender(SidebarCommunityForum);
                setHeaderTitle("Community");
                setHeaderText("sdfsdfssdfsddf");
                break;
            case '/news':
                setNavItemRender(SidebarNews);
                setHeaderTitle("News");
                //setHeaderText("sdfsdfssdfsddf");
                break;
            case '/yourpeople':
            case '/aboutus':
            case '/supportus':
                setNavItemRender(SidebarYourPeople);
                setHeaderTitle("Your People");
                //setHeaderText("sdfsdfssdfsddf");
                break;
            case '/analytics':
                setNavItemRender(SidebarAnalytics);
                setHeaderTitle("Analytics");
                //setHeaderText("sdfsdfssdfsddf");
                break;
            case '/security':
                setNavItemRender(SidebarSecurity);
                setHeaderTitle("Security");
                //setHeaderText("sdfsdfssdfsddf");
                break;
            default:
                if (location.pathname.startsWith('/identity')) {
                    setNavItemRender(SidebarIdentity);
                    setHeaderTitle("Wallet Account");
                    //setHeaderText("Wallet Account");

                } else {
                    setNavItemRender(null);
                    setHeaderTitle("");
                    setHeaderText("");
                }
        }
    }, [location, navSize]);

    return (

        <Flex
            //border ={'1px solid blue'}
        >
            {/*{navItemsRender == null ? null :*/}
            {/*    <Box*/}
            {/*        // left="5"*/}
            {/*        h="100%"*/}
            {/*        backgroundColor='pmpurple.2'*/}
            {/*        borderRight={'1px'}*/}
            {/*        borderTop={'1px'}*/}
            {/*        borderColor={'red'}*/}
            {/*        // borderRadius={navSize == "small" ? "15px" : "30px"}*/}
            {/*        w={navSize == "small" ? "90px" : "200px"}*/}
            {/*        flexDir="column"*/}
            {/*        justifyContent="space-between"*/}
            {/*    >*/}
            {/*        <Flex*/}
            {/*            as="nav"*/}
            {/*            p="5%"*/}
            {/*            flexDir="column"*/}
            {/*            w="100%"*/}
            {/*            h="100%"*/}
            {/*            alignItems={navSize == "small" ? "center" : "flex-start"}*/}
            {/*        >*/}
            {/*            <Heading textAlign="center" fontSize={'18px'} mt="12px" w='100%' fontWeight="bold">*/}
            {/*                {headerTitle}*/}
            {/*            </Heading>*/}
            {/*            <Text mt="0px" mb="5px" align="center" w='100%' fontWeight="medium">*/}
            {/*                <Text  >*/}
            {/*                    {headerText}*/}
            {/*                </Text>*/}
            {/*            </Text>*/}

            {/*            <Divider display={navSize == "small" ? "none" : "flex"}/>*/}

            {/*            <IconButton*/}
            {/*                color={'pmpurple.13'}*/}
            {/*                background="none"*/}
            {/*                mt={5}*/}
            {/*                _hover={{background: 'none'}}*/}
            {/*                icon={<FiMenu/>}*/}
            {/*                aria-label='Options'*/}
            {/*                onClick={() => {*/}
            {/*                    if (navSize == "small")*/}
            {/*                        changeNavSize("large")*/}
            {/*                    else*/}
            {/*                        changeNavSize("small")*/}
            {/*                }}*/}
            {/*            />*/}

            {/*            {navItemsRender}*/}

            {/*            <Divider display={navSize == "small" ? "none" : "flex"}/>*/}


            {/*            <Flex mt={4} mb={4} align="center">*/}
            {/*                <Avatar size="sm" src="avatar-1.jpg"/>*/}
            {/*                <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>*/}
            {/*                    <Heading as="h3" size="sm">*/}
            {/*                        /!*{profileName}*!/*/}
            {/*                        ramonajenny*/}
            {/*                    </Heading>*/}
            {/*                    <Text color="gray">*/}
            {/*                        PaperMaster*/}
            {/*                    </Text>*/}
            {/*                </Flex>*/}
            {/*            </Flex>*/}


            {/*        </Flex>*/}
            {/*    </Box>*/}
            {/*}*/}

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path={'/identity/:walletAcc'} element={<Identity/>}/>
                {/*{walletAcc === undefined || walletAcc === 'undefined' || walletAcc.length === 0 ?*/}
                {/*    <Route path={'/identity/:walletAcc'} element={<Navigate replace to= "/identity/0x7C097941487f53bBdd39fddea7Bed9AEf3312ED5" />}/>*/}

                {/*:  <Route path={'/identity/:walletAcc'} element={<Identity/>}/>*/}
                {/*}*/}
                {/*{addressHasIdentity ?*/}
                {/*    <Route path={'/register'} element={<Navigate replace to="/search" />}/>*/}
                {/*    :*/}
                {/*    <Route path={'/register'} element={<Register/>}/>*/}
                {/*}*/}
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'/validate'} element={<Validate/>}/>
                <Route path={'/report'} element={<Report/>}/>
                <Route path={'/analytics'} element={<Analytics/>}/>
                <Route path={'/search'} element={<Search/>}/>
                <Route path={'/learn'} element={<Learn/>}/>
                <Route path={'/news'} element={<News/>}/>
                <Route path={'/security'} element={<Security/>}/>
                <Route path={'/CloudHWM'} element={<CloudHWM/>}/>
                <Route path={'/yourpeople'} element={<YourPeople/>}/>
            </Routes>
        </Flex>
    )
};

export default Sidebar;



