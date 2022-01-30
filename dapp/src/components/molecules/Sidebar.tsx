import React, { ReactNode, ReactText, useState, useEffect } from 'react';
import Routes from 'react-router-dom';
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
import { FaPlug, FaSearch, FaFileAlt, FaLink, FaChartLine, FaBookmark, FaPaperclip, FaScroll, FaUserCheck, FaQuestionCircle, FaConnectdevelop, FaServicestack } from "react-icons/fa";

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
import createPM from "../pages/Register";
import {Link as ReachLink, To} from "react-router-dom";
import { faSearch, faFileAlt, faLink, faChartLine, faBookmark, faPaperclip, faScroll, faUserCheck } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


interface InterfaceNavItem {
    title?: string;
    icon?: IconType;
    active?: boolean;
    navSize?: string;
    path: To;
}

interface InterfaceSidebar{
    icon?: IconType;
    navSize?: string;
    onCLick?: Function;
    header?: string;
    headerText?: string;
    profileName?: string;
}


export const NavItem: FC<InterfaceNavItem> = ({ icon, title, active,
                                                  navSize, path} ) => {
    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
        >
            <Menu placement="right">
                <Link
                    as={ReachLink} to={path}
                    backgroundColor={active ? "#e6dee6" : "none"}
                    p={3}
                    borderRadius={8}
                    _hover={{ textDecor: 'none', backgroundColor: "#AEC8CA" }}
                    w={navSize ? "large" : "100%"}
                >
                    <MenuButton w="100%">
                        <Flex >
                            <Icon as={icon} fontSize="xl" color={"#694b69"}  />
                            <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
            </Menu>
        </Flex>
    )
}

export const Sidebar: FC<InterfaceSidebar>= (props) =>  {
    const [navSize, changeNavSize] = useState("large")
    return (
        <Box
        flex='auto'
        pos="sticky"
        left="5"
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
                    {/*{header}*/}
                    NFI
                </Heading>
                <Text mt="5px" mb="5px" align="center" w='100%' fontWeight="medium">
                    <Text as="span">
                        {/*{headerText}*/}
                        Register Unique NFI
                    </Text>
                </Text>

                <Divider display={navSize == "small" ? "none" : "flex"}/>

                <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    aria-label='Options'
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                />

                <NavItem navSize={navSize} icon={BiHomeHeart} title="Dashboard" path={'/DashboardProducts'}/>
                <NavItem navSize={navSize} icon={BiBookmarkHeart} title="Register" path={'/Register'}/>
                <NavItem navSize={navSize} icon={IoMdCheckmarkCircleOutline} title="Validate" path={'/Validate'}/>
                <NavItem navSize={navSize} icon={IoMdAttach} title="Attach NFTs" path={'/Attach'}/>
                <NavItem navSize={navSize} icon={AiOutlineFileSearch} title="Search" path={'/Search'}/>
                <NavItem navSize={navSize} icon={FiTrendingUp} title="Analytics" path={'/Analytics'}/>

            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={navSize == "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Avatar size="sm" src="avatar-1.jpg" />
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
    )
}



export default Sidebar;



