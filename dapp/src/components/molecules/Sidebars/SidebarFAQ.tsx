import React, { ReactNode, ReactText, useState, useEffect } from 'react';
import PMLogo from '../../../PMGIMPResized.png';
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
import createPM from "../../pages/Create";
import {Link as ReachLink} from "react-router-dom";

interface InterfaceNavHoverBox {
    title?: string;
    icon?: IconType;
    description?: string;
}

interface InterfaceNavItem {
    title?: string;
    icon?: IconType;
    description?: string;
    active?: boolean;
    navSize?: string;
}

interface InterfaceSidebar{
    icon?: IconType;
    navSize?: string;
    onCLick?: Function;
}

export const NavHoverBox: FC<InterfaceNavHoverBox> = ({ title, icon, description }) => {
    return (
        <>
            <Flex
                pos="absolute"
                mt="calc(100px - 7.5px)"
                ml="-10px"
                width={0}
                height={0}
                borderTop="10px solid #694b69"
                borderBottom="10px solid #694b69"
                borderRight="10px solid #694b69"
            />
            <Flex
                h={200}
                w="100%"
                flexDir="column"
                alignItems="center"
                justify="center"
                backgroundColor="#a88ea8"
                borderRadius="10px"
                color="#ffffff"
                textAlign="center"
            >
                <Icon as={icon} fontSize="3xl" mb={4} />
                <Heading size="md" fontWeight="normal">{title}</Heading>
                <Text>{description}</Text>
            </Flex>
        </>
    )
};


export const NavItem: FC<InterfaceNavItem> = ({ icon, title, description, active, navSize }) => {
    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
        >
            <Menu placement="right">
                <Link
                    backgroundColor={active ? "#e6dee6" : "none"}
                    p={3}
                    borderRadius={8}
                    _hover={{ textDecor: 'none', backgroundColor: "#e6dee6" }}
                    w={navSize ? "large" : "100%"}
                >
                    <MenuButton w="100%">
                        <Flex>
                            <Icon as={icon} fontSize="xl" color={"#694b69"} />
                            <Text ml={3} display={navSize == "small" ? "none" : "flex"}>{title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
                <MenuList
                    py={0}
                    border="none"
                    w={200}
                    h={200}
                    ml={5}
                >
                    <NavHoverBox title={title} icon={icon} description={description} />
                </MenuList>
            </Menu>
        </Flex>
    )
};


export const SidebarFAQ: FC<InterfaceSidebar>= (props) => {
    const [navSize, changeNavSize] = useState("large")
    return (
        <Flex
            pos="sticky"
            left="5"
            //h="95vh"
            //marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize == "small" ? "15px" : "0px"}
            w={navSize == "small" ? "75px" : "300px"}
            flexDir="column"
            justifyContent="space-between"
            bg={'#ffffff'}
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >

                <Flex flex={'1'} mt={3} align="center" style={{paddingLeft: '10px', paddingBottom:'15px', textAlign:'center'}}>

                    <Menu >
                        <MenuButton
                            as={Button}
                            rounded={'full'}
                            variant={'link'}
                            cursor={'pointer'}
                            minW={0}> does this work
                            <Avatar size="xs" src={PMLogo} />
                        </MenuButton>
                        <MenuList>
                            <MenuItem as={ReachLink} to='/profile' >Profile</MenuItem>

                        </MenuList>
                    </Menu>


                    <Flex flexDir="column" ml={6} display={navSize == "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">ramonajenny</Heading>
                        <Text color="#4f384f">Account Holder</Text>
                    </Flex>
                </Flex>
                <Divider display={navSize == "small" ? "none" : "flex"} />

                <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: '#e6dee6' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                 aria-label='Options'/>
                {/*<Heading textAlign="center" size="md" w='100%' fontWeight="extrabold">*/}
                {/*    PaperMaster Identity*/}
                {/*</Heading>*/}
                {/*<Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">*/}
                    {/*<Text as="span">PaperMaster Identities are permanent Blockchain Non-Fungable-Tokens</Text>*/}
                    {/*<Link href="#">Start free trial</Link>*/}
                {/*</Text>*/}

                <NavItem navSize={navSize} icon={BiHomeHeart} title="Dashboard" description="This is the description for the dashboard." />
                <NavItem navSize={navSize} icon={BiBookmarkHeart} title="Create PaperMaster" description="Create a permanent Blockchain Non-Fungable-Identity"/>
                <NavItem navSize={navSize} icon={IoMdCheckmarkCircleOutline} title="Validate PaperMaster" description="Validate a PaperMaster"/>
                <NavItem navSize={navSize} icon={IoMdAttach} title="Attach NFTs to PaperMaster" />
                <NavItem navSize={navSize} icon={AiOutlineFileSearch} title="Search PaperMaster" description="Search PaperMasters"/>
                <NavItem navSize={navSize} icon={FiTrendingUp} title="Analytics" />

            </Flex>
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}
            >


            </Flex>
        </Flex>
    )
};

export default SidebarFAQ;




// interface LinkItemProps {
//     name: string;
//     icon: IconType;
// }
// const LinkItems: Array<LinkItemProps> = [
//     { name: 'Home', icon: FiHome },
//     { name: 'Analytics', icon: FiTrendingUp },
//     { name: 'Create PM Identity', icon: FiCompass },
//     { name: 'Validate PM Identity', icon: FiStar },
//     { name: 'Search PM Identity', icon: FiStar },
//     { name: 'Attach NFTs to PM Identity', icon: FiStar },
//     { name: 'Search Identities', icon: FiStar },
//     { name: 'Manage Account', icon: FiSettings },
// ];

//          <Box>
    //             {LinkItems.map((link) => (
//                 <NavItem key={link.name} icon={link.icon}>
//                     {link.name}
//                 </NavItem>
//             ))}
//             </Box>




        // <Box boarderLeft='1px' borderTop='1px' borderBottom='1px' borderColor='#e6dee6' bg={useColorModeValue('#9c7e9c', 'gray.900')}>
        //     <SidebarContent
        //         onClose={() => onClose}
        //         display={{ base: 'none', md: 'block' }}
        //     />
        //     <Drawer
        //         autoFocus={false}
        //         isOpen={isOpen}
        //         placement="left"
        //         onClose={onClose}
        //         returnFocusOnClose={false}
        //         onOverlayClick={onClose}
        //         size="full">
        //         <DrawerContent>
        //             <SidebarContent onClose={onClose} />
        //         </DrawerContent>
        //     </Drawer>
        //      mobilenav
        //     <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
        //     <Box ml={{ base: 0, md: 60 }} p="8">
        //         {children}
        //     </Box>
        // </Box>
  //  );
//}
//


// interface NavItemProps extends FlexProps {
//     icon: IconType;
//     children: ReactText;
// }
// const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
//     return (
//         <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
//             <Flex
//                 align="center"
//                 p="4"
//                 mx="4"
//                 borderRadius="lg"
//                 role="group"
//                 cursor="pointer"
//                 _hover={{
//                     //bg: '#c1aec1',
//                     color: '#694b69',
//                 }}
//                 {...rest}>
//                 {icon && (
//                     <Icon
//                         mr="4"
//                         fontSize="16"
//                         _groupHover={{
//                             color: '#694b69',
//                         }}
//                         as={icon}
//                     />
//                 )}
//                 {children}
//             </Flex>
//         </Link>
//     );
// };

interface MobileProps extends FlexProps {
    onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 24 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            border="1px solid"
            borderColor='#765476'
            justifyContent="flex-start"
            {...rest}>
            <IconButton
                variant="outline"
                onClick={onOpen}
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
                <img src={PMLogo}/>
            </Text>
        </Flex>
    );
};

