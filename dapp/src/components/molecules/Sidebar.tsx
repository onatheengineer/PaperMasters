import React, { ReactNode, ReactText, useState, useEffect } from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import PMLogo from '../../PMGIMPResized.png';
import { AiOutlineFileSearch } from "react-icons/ai";
import { BiHomeHeart, BiBookmarkHeart } from 'react-icons/bi';
import { IoMdCheckmarkCircleOutline, IoMdAttach } from 'react-icons/io';
import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Heading,
    Menu,
    MenuButton,
    MenuList,
    Divider,
    Avatar, Button, MenuItem, MenuDivider,
} from '@chakra-ui/react';
import { FaPlug, FaSearch, FaFileAlt, FaLink, FaChartLine, FaBookmark, FaPaperclip, FaScroll,
    FaUserCheck, FaQuestionCircle, FaConnectdevelop, FaServicestack } from "react-icons/fa";

import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
    FiUser,
    FiBriefcase,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import type {FC} from 'react';
import Register from "../pages/Register";
import Search from '../pages/Search'
import {Link as ReachLink, To} from "react-router-dom";
import { faSearch, faFileAlt, faLink, faChartLine, faBookmark, faPaperclip, faScroll,
    faUserCheck } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {MdOutlineFeedback, MdOutlineReport, MdReport} from "react-icons/md";
import {GiBookCover, GiBookmark, GiDiscussion, GiSuspicious} from "react-icons/gi";
import {BsCalendar2Event} from "react-icons/bs";
import Home from "../pages/Home";
import Identity from "../pages/Identity";
import Attach from "../pages/Attach";
import CloudHWM from "../pages/CloudHWM";
import CommunityForum from "../pages/CommunityForum";
import YourPeople from "../pages/YourPeople";


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
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={navItemSize == "small" ? "center" : "flex-start"}
        >
            <Menu placement="right">
                <Link
                    as={ReachLink}
                    to={path}
                    backgroundColor={active ? "#e6dee6" : "none"}
                    p={3}
                    borderRadius={8}
                    _hover={{ textDecor: 'none', backgroundColor: "#c1aec1" }}
                    w={navItemSize ? "large" : "100%"}
                >
                    <MenuButton w="100%">
                        <Flex >
                            <Icon as={icon} fontSize="xl" color={"#694b69"}  />
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
            <NavItem navItemSize={navSize} icon={BiBookmarkHeart} title="Register" path={'/register'}/>,
            <NavItem navItemSize={navSize} icon={IoMdAttach} title="Attach NFTs to your NFI" path={'/attach'}/>,
            <NavItem navItemSize={navSize} icon={IoMdCheckmarkCircleOutline} title="Validate NFI"
                     path={'/validate'}/>,
            <NavItem navItemSize={navSize} icon={AiOutlineFileSearch} title="Search NFIs" path={'/search'}/>,
            <NavItem navItemSize={navSize} icon={MdReport} title="Report NFI" path={'/report'}/>,
            <NavItem navItemSize={navSize} icon={GiSuspicious} title="Report sus" path={'/communityforum'}/>,
            <NavItem navItemSize={navSize} icon={FiTrendingUp} title="Learn" path={'/learn'}/>,
            <NavItem navItemSize={navSize} icon={FiTrendingUp} title="Analytics" path={'/analytics'}/>,

        ]

        const SidebarSearch = [
            <NavItem navItemSize={navSize} icon={BiBookmarkHeart} title="Search NFIs" path={'/search'}/>,
            <NavItem navItemSize={navSize} icon={BiBookmarkHeart} title="Register" path={'/register'}/>,
            <NavItem navItemSize={navSize} icon={IoMdAttach} title="Attach NFTs to your NFI" path={'/attach'}/>,
            <NavItem navItemSize={navSize} icon={IoMdCheckmarkCircleOutline} title="Validate NFI"
                     path={'/validate'}/>,
            <NavItem navItemSize={navSize} icon={MdReport} title="Report NFI" path={'/report'}/>,
            <NavItem navItemSize={navSize} icon={GiSuspicious} title="Report sus" path={'/communityforum'}/>,
            <NavItem navItemSize={navSize} icon={FiTrendingUp} title="Learn" path={'/learn'}/>,
            <NavItem navItemSize={navSize} icon={FiTrendingUp} title="Analytics" path={'/analytics'}/>,

        ]

        const SidebarCommunityForum = [
            <NavItem navItemSize={navSize} icon={BiHomeHeart} title="Community Guidelines" path={'/communityforum'}/>,
            <NavItem navItemSize={navSize} icon={GiDiscussion} title="Community Discussion" path={"/communityforum"}/>,
            <NavItem navItemSize={navSize} icon={BsCalendar2Event} title="Community Events" path={'/communityforum'}/>,
            <NavItem navItemSize={navSize} icon={MdOutlineFeedback} title="Report Suspicious Activity" path={'/communityforum'}/>,

        ]

        const SidebarNews = [
            <NavItem navItemSize={navSize} icon={BiHomeHeart} title="News" path={'/news'}/>,
            <NavItem navItemSize={navSize} icon={BiHomeHeart} title="New Features" path={'/news'}/>,
            <NavItem navItemSize={navSize} icon={BiHomeHeart} title="Updated Features" path={'/news'}/>,
            <NavItem navItemSize={navSize} icon={BiHomeHeart} title="Future Features" path={'/news'}/>,
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

            <NavItem navItemSize={navSize} icon={FiTrendingUp} title="Analytics" path={'/analytics'}/>,


        ]



        switch (location.pathname) {
            case '/':
                setNavItemRender(null);
                setHeaderTitle("");
                setHeaderText("");
                break;
            case '/identity':
            case '/register':
            case '/attach':
            case '/validate':

                setNavItemRender(SidebarIdentity);
                setHeaderTitle("NFI");
                setHeaderText("sdfsdfsdf");
                break;
            case '/search':
                setNavItemRender(SidebarSearch);
                setHeaderTitle("Search");
                setHeaderText("sdfsdfssdfsddf");
                break;
            case '/communityforum':
                setNavItemRender(SidebarCommunityForum);
                setHeaderTitle("Community");
                setHeaderText("sdfsdfssdfsddf");
                break;
            case '/news':
                setNavItemRender(SidebarNews);
                setHeaderTitle("News");
                setHeaderText("sdfsdfssdfsddf");
                break;
            case '/yourpeople':
            case '/aboutus':
            case '/contactus':
            case '/supportus':
                setNavItemRender(SidebarYourPeople);
                setHeaderTitle("Your People");
                setHeaderText("sdfsdfssdfsddf");
                break;
            case '/analytics':
                setNavItemRender(SidebarAnalytics);
                setHeaderTitle("Analytics");
                setHeaderText("sdfsdfssdfsddf");
                break;
            case '/security':
                setNavItemRender(SidebarSecurity);
                setHeaderTitle("Protection");
                setHeaderText("sdfsdfssdfsddf");
                break;
            case '/learn':
                setNavItemRender(SidebarLearn);
                setHeaderTitle("Learn");
                setHeaderText("sdfsdfssdfsddf");
                break;
            default:
                setNavItemRender(null);
                setHeaderTitle("");
                setHeaderText("");
        }
    }, [location, navSize]);


    return (
        <Flex>
            {navItemsRender == null ? null :
                <Box
                    //pos="sticky"
                    // left="5"
                    h="95vh"
                    backgroundColor='pmpurple.2'
                    //marginTop="2.5vh"
                    boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
                    // borderRadius={navSize == "small" ? "15px" : "30px"}
                    w={navSize == "small" ? "75px" : "200px"}
                    flexDir="column"
                    justifyContent="space-between"
                >
                    <Flex
                        p="5%"
                        flexDir="column"
                        w="100%"
                        alignItems={navSize == "small" ? "center" : "flex-start"}
                        as="nav"
                    >
                        <Heading textAlign="center" size="md" mt="8px" w='100%' fontWeight="extrabold">
                            {headerTitle}
                        </Heading>
                        <Text mt="5px" mb="5px" align="center" w='100%' fontWeight="medium">
                            <Text as="span">
                                {headerText}
                            </Text>
                        </Text>

                        <Divider display={navSize == "small" ? "none" : "flex"}/>

                        <IconButton
                            background="none"
                            mt={5}
                            _hover={{background: 'none'}}
                            icon={<FiMenu/>}
                            aria-label='Options'
                            onClick={() => {
                                if (navSize == "small")
                                    changeNavSize("large")
                                else
                                    changeNavSize("small")
                            }}
                        />

                        {navItemsRender}


                        <Divider display={navSize == "small" ? "none" : "flex"}/>

                        {/*//walletConnet useEffect state*/}

                        <Flex mt={4} align="center">
                            <Avatar size="sm" src="avatar-1.jpg"/>
                            <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                                <Heading as="h3" size="sm">
                                    {/*{profileName}*/}
                                    ramonajenny
                                </Heading>
                                <Text color="gray">
                                    PaperMaster
                                </Text>
                            </Flex>
                        </Flex>


                    </Flex>
                </Box>
            }
            <Flex>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path={'/register'} element={ <Register/>}/>
                    <Route path={'/identity'} element={ <Identity/>}/>
                    <Route path={'/attach'} element={ <Attach/>}/>
                    <Route path={'/CloudHWM'} element={ <CloudHWM/>}/>
                    <Route path={'/communityforum'} element={ <CommunityForum/>}/>
                    <Route path={'/yourpeople'} element={ <YourPeople/>}/>

                    <Route path={'/search'} element={ <Search/> }/>


                </Routes>
            </Flex>

        </Flex>
    )
};

export default Sidebar;



