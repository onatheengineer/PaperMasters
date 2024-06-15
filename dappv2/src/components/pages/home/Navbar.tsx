import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Collapse,
  Flex,
  HStack,
  IconButton,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { BiBookmarkHeart } from 'react-icons/bi';
import { FaScroll } from 'react-icons/fa';
import {
  GiDiscussion,
  GiFlowerHat,
  GiFlowerPot,
  GiHeatHaze,
} from 'react-icons/gi';
import { MdManageAccounts, MdOutlineNaturePeople } from 'react-icons/md';
import { SiSololearn } from 'react-icons/si';
import type { To } from 'react-router-dom';
import { Link as ReachLink } from 'react-router-dom';
import Sparkle from 'react-sparkle';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import PMLogoFull from '../../../assets/icons/PMLogoFull';
import { accountArrMetaMaskAction } from '../../../features/accountBC/AccountBCSlice';
import { ConnectWallet } from './ConnectWallet';

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  navIcon?: JSX.Element;
  navLink?: To;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Non-Fungible Identity',
    navIcon: <MdManageAccounts fontSize={'16px'} />,
    children: [
      {
        label: 'Identity',
        subLabel: 'Your Authentic Identity',
        navIcon: <MdManageAccounts fontSize={'16px'} />,
        navLink: '/identity',
      },
      {
        label: 'Register',
        subLabel: 'Register your wallet',
        navIcon: <BiBookmarkHeart fontSize={'16px'} />,
        navLink: '/register',
      },
      // {
      //     label: 'Validate (coming soon)',
      //     subLabel: 'Authenticate a wallet',
      //     navIcon: <IoMdCheckmarkCircleOutline fontSize={'18px'}/>,
      //     navLink: '/validate',
      // },
      // {
      //     label: 'Report (coming soon)',
      //     subLabel: 'Report a wallet for wrongful activity',
      //     navIcon: <MdOutlineReport fontSize={'18px'}/>,
      //     navLink: 'report',
      // },
    ],
  },
  {
    label: 'Search',
    navIcon: <MdOutlineNaturePeople fontSize={'16px'} fontWeight={'bolder'} />,
    navLink: '/search',
  },
  // {
  //     label: 'Analytics',
  //     navIcon: <FiTrendingUp fontSize={'18px'}/>,
  //     // subLabel: 'Project Statistics',
  //     navLink: '/analytics'
  // },
  {
    label: 'Community',
    navIcon: <SiSololearn fontSize={'16px'} />,
    children: [
      {
        label: 'FAQ',
        subLabel: 'Frequently Asked Questions',
        navIcon: <GiDiscussion fontSize={'16px'} />,
        navLink: '/communitySupport',
      },
      // {
      //   label: 'Analytics',
      //   navIcon: <FiTrendingUp fontSize={'16px'} />,
      //   subLabel: 'Project Statistics',
      //   navLink: '/analytics',
      // },
      // {
      //     label: 'Report Suspicious Activity',
      //     subLabel: 'An exclusive list for contract work',
      //     navIcon: <MdOutlineWarningAmber fontSize={'18px'}/>,
      //     navLink: '/learn',
      // },
    ],
  },
  {
    label: 'Your People',
    navIcon: <FaScroll fontSize={'16px'} />,
    children: [
      {
        label: 'About Me',
        subLabel: 'Just trying to keep the Blockchain beautiful',
        navIcon: <GiFlowerHat fontSize={'16px'} />,
        navLink: `/identity/1/0x27c1206d52371dA1C2acbEbEDD915999D362FfC3`,
      },
      // {
      //   label: 'Support',
      //   subLabel: 'Support the project',
      //   navIcon: <RiPlantFill fontSize={'16px'} />,
      //   navLink: '/yourpeople',
      // },
      {
        label: 'New & Updated Features',
        subLabel: 'Stories to come',
        navIcon: <GiFlowerPot fontSize={'16px'} />,
        navLink: '/yourpeople',
      },
    ],
  },
];

const MobileNavItem = ({ label, children, navLink, navIcon }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();
  const chainIdProviderProvider = useAppSelector(
    (state) => state.accountBC.chainIdProvider,
  );
  const accountArrArr = useAppSelector((state) => state.accountBC.accountArr);
  return (
    <Stack spacing={0} onClick={children && onToggle}>
      <HStack spacing={0}>
        {!navLink ? (
          <Flex
            as={Link}
            justify={'space-between'}
            align={'center'}
            _hover={{
              textDecoration: 'none',
            }}
          >
            <Text fontWeight={400} color={'pmpurple.13'}>
              <HStack>
                {navIcon}
                <Text>{label}</Text>
              </HStack>
            </Text>
          </Flex>
        ) : (
          <Flex
            as={ReachLink}
            to={navLink}
            justify={'space-between'}
            align={'center'}
            _hover={{
              textDecoration: 'none',
            }}
          >
            <Text fontWeight={400} color={'pmpurple.13'}>
              <HStack>
                {navIcon}
                <Text>{label}</Text>
              </HStack>
            </Text>
          </Flex>
        )}
      </HStack>
      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('pmpurple.8', 'pmpurple.8')}
          align={'start'}
        >
          {children &&
            children.map((child) => {
              const navLinkModified =
                child.navLink === '/identity'
                  ? `/identity/${chainIdProviderProvider}/${accountArrArr}`
                  : child.navLink;
              return (
                <Link
                  as={ReachLink}
                  to={navLinkModified as To}
                  // to={child.navLink}
                  key={child.label}
                  py={2}
                >
                  <HStack>
                    {child.navIcon}
                    <Text>{child.label}</Text>
                  </HStack>
                </Link>
              );
            })}
        </Stack>
      </Collapse>
    </Stack>
  );
};
const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('pmpurple.3', 'pmpurple.3')}
      p={4}
      display={{ xl: 'none' }}
    >
      {NAV_ITEMS.map((navItem) => {
        // console.log(navItem)
        return <MobileNavItem key={navItem.label} {...navItem} />;
      })}
    </Stack>
  );
};

const DesktopSubNav = ({ label, subLabel, navLink, navIcon }: NavItem) => {
  const chainIdProviderProvider = useAppSelector(
    (state) => state.accountBC.chainIdProvider,
  );
  const accountArrArr = useAppSelector((state) => state.accountBC.accountArr);
  const navLinkModified =
    navLink === '/identity'
      ? `/identity/${chainIdProviderProvider}/${accountArrArr}`
      : navLink;
  return (
    <Link
      as={ReachLink}
      to={navLinkModified as To}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{
        bg: 'pmpurple.3',
        textDecoration: 'none',
      }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <HStack>
            {navIcon}
            <Text fontSize={'md'} transition={'all .3s ease'} fontWeight={500}>
              {label}
            </Text>
          </HStack>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
      </Stack>
    </Link>
  );
};

const DesktopNav = () => {
  const linkColor = 'pmpurple.13';
  const linkHoverColor = 'pmpurple.8';
  const popoverContentBgColor = 'pmpurple.1';

  return (
    <Stack direction={'row'} spacing={5} alignItems={'center'}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <HStack
              // spacing={5}
              >
                {!navItem.navLink ? (
                  <Link
                    as={Link}
                    display={'inline'}
                    p={2}
                    fontSize={'md'}
                    fontWeight={400}
                    color={linkColor}
                    _hover={{
                      textDecoration: 'none',
                      color: linkHoverColor,
                    }}
                  >
                    <HStack
                    // border={'1px solid blue'}
                    >
                      {navItem.navIcon}
                      <Text
                        _hover={{
                          textDecoration: 'none',
                          color: linkHoverColor,
                        }}
                      >
                        {navItem.label}
                      </Text>
                    </HStack>
                  </Link>
                ) : (
                  <Link
                    as={ReachLink}
                    to={navItem.navLink}
                    p={2}
                    fontSize={'md'}
                    fontWeight={400}
                    color={linkColor}
                    _hover={{
                      textDecoration: 'none',
                      color: linkHoverColor,
                    }}
                  >
                    <HStack
                    // border={'1px solid blue'}
                    >
                      {navItem.navIcon}
                      <Text
                        _hover={{
                          textDecoration: 'none',
                          color: linkHoverColor,
                        }}
                      >
                        {navItem.label}
                      </Text>
                    </HStack>
                  </Link>
                )}
              </HStack>
            </PopoverTrigger>
            {navItem.children && (
              <PopoverContent
                border={'1px solid'}
                borderColor={'pmpurple.8'}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                // rounded={'xl'}
                minW={'sm'}
              >
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

export const Navbar: FC = () => {
  const { isOpen, onToggle } = useDisclosure();
  const dispatch = useAppDispatch();
  const accountArrArr = useAppSelector((state) => state.accountBC.accountArr);

  return (
    <Box>
      <Flex
        bg={'pmpurple.1'}
        color={'pmpurple.13'}
        minH={'60px'}
        py={{ base: 1 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={'pmpurple.8'}
        align={'center'}
        // justify={{base: 'start', md:'left', lg: 'flex-start'}}
      >
        <Flex
          // border={'1px solid red'}
          flex={{ base: 1, md: 1 }}
          ml={{ base: -2 }}
          // border={'1px solid blue'}
          // this is the hamburgermenu
          display={{ base: 'flex', md: 'flex', lg: 'none', xl: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: 'center', lg: 'flex-start' }}
          // border={'1px solid blue'}
        >
          <Link
            as={ReachLink}
            to={'/'}
            // textAlign={{base: 'center', md: 'left'}}
            fontFamily={'heading'}
            color="pmpurple.13"
          >
            <PMLogoFull fill={'#5c415c'} width={'150px'} />
          </Link>

          <Flex display={{ base: 'none', lg: 'flex' }} ml={4}>
            <DesktopNav />
          </Flex>
        </Flex>
        <ConnectWallet />
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

export default Navbar;
