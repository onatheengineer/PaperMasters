import { ReactNode } from 'react';
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
import {Link as ReachLink} from "react-router-dom";
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import Logo from '../../PaperMastersLogoGIMP.png';
import Lego from '../../legoLavendar.png';

const Links = {
    Dashboard: "/dashboard",
    Mint: "/mint",
    PMIdentities: "/pmidentities"
};

const NavLink = (props: any) => (
    <Link as={ReachLink} to='/mint'
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}>
        {props.children}
    </Link>
);

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box bg={useColorModeValue('#EEEEF6', 'gray.900')} px={4}>
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
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            {Object.keys(Links).map((link) => (
                                <NavLink key={link} >{link}</NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        {/*<Button*/}
                        {/*    variant={'solid'}*/}
                        {/*    colorScheme={'purple'}*/}
                        {/*    size={'sm'}*/}
                        {/*    mr={4}*/}
                        {/*    leftIcon={<AddIcon />}>*/}
                        {/*    Needs to connect to Wallet?*/}
                        {/*</Button>*/}
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar
                                    size={'sm'}
                                    src={Lego}
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Connect Wallet</MenuItem>
                                <MenuItem>Manage Account</MenuItem>
                                <MenuDivider />
                                <MenuItem>Add Tokens to your PM Identity</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Object.keys(Links).map((link)=> (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}