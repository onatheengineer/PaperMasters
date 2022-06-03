import { Flex, Icon, Link, Menu, MenuButton, Text } from '@chakra-ui/react';
import type { FC } from 'react';
import React, { ReactElement, useEffect, useState } from 'react';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { BiBookmarkHeart, BiHomeHeart } from 'react-icons/bi';
import { FiTrendingUp } from 'react-icons/fi';
import { GiBookCover, GiFlowerPot } from 'react-icons/gi';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import type { IconType } from 'react-icons/lib';
import { MdOutlineReport, MdOutlineWarningAmber } from 'react-icons/md';
import type { To } from 'react-router-dom';
import {
  Link as ReachLink,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import Analytics from '../components/pages/Analytics';
import CloudHWM from '../components/pages/CloudHWM';
import CommunitySupport from '../components/pages/CommunitySupport';
import Home from '../components/pages/home/Home';
import Identity from '../components/pages/identity/Identity';
import Register from '../components/pages/Register';
import Search from '../components/pages/Search';
import Security from '../components/pages/Security';
import Report from '../components/pages/valadationsReaports/Report';
import Validate from '../components/pages/valadationsReaports/Validate';
import YourPeople from '../components/pages/yourPeople/YourPeople';
import { useAppSelector } from './hooks';

interface InterfaceNavItem {
  title?: string;
  icon?: IconType;
  active?: boolean;
  navItemSize?: string;
  path: To;
}

interface InterfaceSidebar {
  icon?: IconType;
  profileName?: string;
}

export const NavItem: FC<InterfaceNavItem> = ({
  icon,
  title,
  active,
  navItemSize,
  path,
}) => {
  return (
    <Flex
      mt={'28px'}
      flexDir="column"
      w="100%"
      h={'100%'}
      alignItems={navItemSize === 'small' ? 'center' : 'flex-start'}
    >
      <Menu placement="right">
        <Link
          as={ReachLink}
          to={path}
          backgroundColor={active ? '#e6dee6' : 'none'}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: 'none', backgroundColor: '#c1aec1' }}
          w={navItemSize ? 'large' : '100%'}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon as={icon} fontSize="xl" color={'#694b69'} />
              <Text ml={5} display={navItemSize === 'small' ? 'none' : 'flex'}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
};

export const RoutesRoutes: FC<InterfaceSidebar> = ({
  icon,
  profileName,
}): ReactElement => {
  const chainIdProviderProvider = useAppSelector(
    (state) => state.accountBC.chainIdProvider,
  );
  const accountArrArr = useAppSelector((state) => state.accountBC.accountArr);
  const addressHasIdentityBoolBool = useAppSelector(
    (state) => state.accountBC.addressHasIdentityBool,
  );

  const location = useLocation();
  const [navSize, changeNavSize] = useState<'small' | 'large'>('small');
  const [navItemsRender, setNavItemRender] = useState<JSX.Element[] | null>([]);
  const [headerTitle, setHeaderTitle] = useState<string>('');
  const [headerText, setHeaderText] = useState<string>('');

  useEffect(() => {
    // console.log(location);

    const SidebarIdentity = [
      <NavItem
        navItemSize={navSize}
        icon={AiOutlineFileSearch}
        title="Search NFIs"
        path={'/search'}
      />,
      <NavItem
        navItemSize={navSize}
        icon={BiBookmarkHeart}
        title="Register"
        path={'/register'}
      />,
      <NavItem
        navItemSize={navSize}
        icon={IoMdCheckmarkCircleOutline}
        title="Validate NFI"
        path={'/validate'}
      />,
      <NavItem
        navItemSize={navSize}
        icon={MdOutlineReport}
        title="Report NFI"
        path={'/report'}
      />,
      <NavItem
        navItemSize={navSize}
        icon={MdOutlineWarningAmber}
        title="Report suss"
        path={'/learn'}
      />,
      <NavItem
        navItemSize={navSize}
        icon={GiBookCover}
        title="CommunitySupport"
        path={'/learn'}
      />,
      <NavItem
        navItemSize={navSize}
        icon={FiTrendingUp}
        title="Analytics"
        path={'/analytics'}
      />,
    ];

    const SidebarSearch = [
      <NavItem
        navItemSize={navSize}
        icon={AiOutlineFileSearch}
        title="Search NFIs"
        path={'/search'}
      />,
      <NavItem
        navItemSize={navSize}
        icon={BiBookmarkHeart}
        title="Register"
        path={'/register'}
      />,
      <NavItem
        navItemSize={navSize}
        icon={IoMdCheckmarkCircleOutline}
        title="Validate NFI"
        path={'/validate'}
      />,
      <NavItem
        navItemSize={navSize}
        icon={MdOutlineReport}
        title="Report NFI"
        path={'/report'}
      />,
      <NavItem
        navItemSize={navSize}
        icon={MdOutlineWarningAmber}
        title="Report suss"
        path={'/learn'}
      />,
      <NavItem
        navItemSize={navSize}
        icon={GiBookCover}
        title="CommunitySupport"
        path={'/learn'}
      />,
      <NavItem
        navItemSize={navSize}
        icon={FiTrendingUp}
        title="Analytics"
        path={'/analytics'}
      />,
    ];

    const SidebarCommunityForum = [
      <NavItem
        navItemSize={navSize}
        icon={BiHomeHeart}
        title="Community Guidelines"
        path={'/learn'}
      />,
      <NavItem
        navItemSize={navSize}
        icon={MdOutlineWarningAmber}
        title="Report Suspicious Activity"
        path={'/learn'}
      />,
    ];

    const SidebarNews = [
      <NavItem
        navItemSize={navSize}
        icon={BiHomeHeart}
        title="News"
        path={'/news'}
      />,
      <NavItem
        navItemSize={navSize}
        icon={BiHomeHeart}
        title="New Features"
        path={'/news'}
      />,
      <NavItem
        navItemSize={navSize}
        icon={BiHomeHeart}
        title="Updated Features"
        path={'/news'}
      />,
      <NavItem
        navItemSize={navSize}
        icon={GiFlowerPot}
        title="Future Features"
        path={'/news'}
      />,
      <NavItem
        navItemSize={navSize}
        icon={BiHomeHeart}
        title="Project Feedback Forum"
        path={'/news'}
      />,
    ];

    const SidebarYourPeople = [
      <NavItem
        navItemSize={navSize}
        icon={BiHomeHeart}
        title="Dashboard"
        path={'/yourpeople'}
      />,
      <NavItem
        navItemSize={navSize}
        icon={BiHomeHeart}
        title="About"
        path={'/yourpeople'}
      />,
      <NavItem
        navItemSize={navSize}
        icon={BiHomeHeart}
        title="Contact"
        path={'/yourpeople'}
      />,
      <NavItem
        navItemSize={navSize}
        icon={FiTrendingUp}
        title="Support"
        path={'/yourpeople'}
      />,
      <NavItem
        navItemSize={navSize}
        icon={FiTrendingUp}
        title="Analytics"
        path={'/analytics'}
      />,
    ];

    const SidebarAnalytics = [
      <NavItem
        navItemSize={navSize}
        icon={FiTrendingUp}
        title="Analytics"
        path={'/analytics'}
      />,
    ];

    const SidebarSecurity = [
      <NavItem
        navItemSize={navSize}
        icon={FiTrendingUp}
        title="Analytics"
        path={'/analytics'}
      />,
    ];

    const SidebarLearn = [
      <NavItem
        navItemSize={navSize}
        icon={GiBookCover}
        title="CommunitySupport"
        path={'/learn'}
      />,
      <NavItem
        navItemSize={navSize}
        icon={FiTrendingUp}
        title="Analytics"
        path={'/analytics'}
      />,
    ];

    switch (location.pathname) {
      case '/':
        setNavItemRender(null);
        // setHeaderTitle("");
        // setHeaderText("");
        break;
      case '/register':
      case '/validate':
      case '/report':
        setNavItemRender(SidebarIdentity);
        setHeaderTitle('NFI');
        // setHeaderText("Non-Fungible Token");
        break;
      case '/search':
        setNavItemRender(SidebarSearch);
        setHeaderTitle('Search');
        // setHeaderText("sdfsdfssdfsddf");
        break;
      case '/learn':
        setNavItemRender(SidebarCommunityForum);
        setHeaderTitle('Community');
        setHeaderText('sdfsdfssdfsddf');
        break;
      case '/news':
        setNavItemRender(SidebarNews);
        setHeaderTitle('News');
        // setHeaderText("sdfsdfssdfsddf");
        break;
      case '/yourpeople':
      case '/aboutus':
      case '/supportus':
        setNavItemRender(SidebarYourPeople);
        setHeaderTitle('Your People');
        // setHeaderText("sdfsdfssdfsddf");
        break;
      case '/analytics':
        setNavItemRender(SidebarAnalytics);
        setHeaderTitle('Analytics');
        // setHeaderText("sdfsdfssdfsddf");
        break;
      case '/security':
        setNavItemRender(SidebarSecurity);
        setHeaderTitle('Security');
        // setHeaderText("sdfsdfssdfsddf");
        break;
      default:
        if (location.pathname.startsWith('/identity')) {
          setNavItemRender(SidebarIdentity);
          setHeaderTitle('Wallet Account');
          // setHeaderText("Wallet Account");
        } else {
          setNavItemRender(null);
          setHeaderTitle('');
          setHeaderText('');
        }
    }
  }, [location, navSize]);

  return (
    <Flex
      // border ={'1px solid orange'}
      flex={{ base: 1, md: 'auto' }}
    >
      {/* {navItemsRender == null ? null : */}
      {/*    <Box */}
      {/*        // left="5" */}
      {/*        h="100%" */}
      {/*        backgroundColor='pmpurple.2' */}
      {/*        borderRight={'1px'} */}
      {/*        borderTop={'1px'} */}
      {/*        borderColor={'red'} */}
      {/*        // borderRadius={navSize == "small" ? "15px" : "30px"} */}
      {/*        w={navSize == "small" ? "90px" : "200px"} */}
      {/*        flexDir="column" */}
      {/*        justifyContent="space-between" */}
      {/*    > */}
      {/*        <Flex */}
      {/*            as="nav" */}
      {/*            p="5%" */}
      {/*            flexDir="column" */}
      {/*            w="100%" */}
      {/*            h="100%" */}
      {/*            alignItems={navSize == "small" ? "center" : "flex-start"} */}
      {/*        > */}
      {/*            <Heading textAlign="center" fontSize={'18px'} mt="12px" w='100%' fontWeight="bold"> */}
      {/*                {headerTitle} */}
      {/*            </Heading> */}
      {/*            <Text mt="0px" mb="5px" align="center" w='100%' fontWeight="medium"> */}
      {/*                <Text  > */}
      {/*                    {headerText} */}
      {/*                </Text> */}
      {/*            </Text> */}

      {/*            <Divider display={navSize == "small" ? "none" : "flex"}/> */}

      {/*            <IconButton */}
      {/*                color={'pmpurple.13'} */}
      {/*                background="none" */}
      {/*                mt={5} */}
      {/*                _hover={{background: 'none'}} */}
      {/*                icon={<FiMenu/>} */}
      {/*                aria-label='Options' */}
      {/*                onClick={() => { */}
      {/*                    if (navSize == "small") */}
      {/*                        changeNavSize("large") */}
      {/*                    else */}
      {/*                        changeNavSize("small") */}
      {/*                }} */}
      {/*            /> */}

      {/*            {navItemsRender} */}

      {/*            <Divider display={navSize == "small" ? "none" : "flex"}/> */}

      {/*            <Flex mt={4} mb={4} align="center"> */}
      {/*                <Avatar size="sm" src="avatar-1.jpg"/> */}
      {/*                <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}> */}
      {/*                    <Heading as="h3" size="sm"> */}
      {/*                        /!*{profileName}*!/ */}
      {/*                        ramonajenny */}
      {/*                    </Heading> */}
      {/*                    <Text color="gray"> */}
      {/*                        PaperMaster */}
      {/*                    </Text> */}
      {/*                </Flex> */}
      {/*            </Flex> */}
      {/*        </Flex> */}
      {/*    </Box> */}
      {/* } */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={'/identity'} element={<Identity />} />
        <Route path={'/identity/:chainId/:walletAcc'} element={<Identity />} />
        {/* { chainIdProviderProvider === undefined || chainIdProviderProvider === 'undefined' || */}
        {/* chainIdProviderProvider.length === 0 || accountArrArr === undefined || accountArrArr.length === 0 ? */}
        {/*    <Route path={`/identity/:${chainIdProviderProvider}/:${accountArrArr}`} element={<Navigate replace to= "/identity/3/0xbEc6F6B37CFF8355a046afD2a2EcfEA05c1215F5" />}/> */}
        {/*:  <Route path={`/identity/:${chainIdProviderProvider}/:${accountArrArr}`} element={<Identity/>}/> */}
        {/* } */}
        {/* {addressToTokenBoolBool ? */}
        {/*    <Route path={'/register'} element={<Navigate replace to="/search" />}/> */}
        {/*    : */}
        {/*    <Route path={'/register'} element={<Register/>}/> */}
        {/* } */}
        <Route path={'/register'} element={<Register />} />
        <Route path={'/validate/:chainId/:walletAcc'} element={<Validate />} />
        <Route path={'/report/:chainId/:walletAcc'} element={<Report />} />
        <Route path={'/analytics'} element={<Analytics />} />
        <Route path={'/search'} element={<Search />} />
        <Route path={'/communitysupport'} element={<CommunitySupport />} />
        {/* <Route path={'/news'} element={<News/>}/> */}
        {/* <Route path={'/security'} element={<Security/>}/> */}
        <Route path={'/CloudHWM'} element={<CloudHWM />} />
        <Route path={'/yourpeople'} element={<YourPeople />} />
      </Routes>
    </Flex>
  );
};

export default RoutesRoutes;
