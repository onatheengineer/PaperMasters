import * as React from 'react';
import type {FC} from 'react';
import {Link as ReachLink, useParams} from "react-router-dom";
import {
    Avatar, AvatarGroup, Box, Button, Flex, Grid, GridItem, Icon, Image, Link, MenuItem,
    Stack, Switch, Text, useColorModeValue, HStack, useDisclosure, Tooltip, VStack,
    Container, AspectRatio, AvatarBadge, Divider, Center, InputRightElement, useStyleConfig,
    TabPanel, TabPanels, TabList, Tabs, Tab, Select, Heading,
} from "@chakra-ui/react";
import {useMemo} from "react";
import {useAppSelector} from "../../app/hooks";
import {FaFacebook, FaInstagram, FaTwitter} from "react-icons/fa";



interface Interface {

}


export const Header:FC<Interface>=()=> {
    const {walletAccount} = useParams();

    const filledAccountsArr = useAppSelector((state) => state.register.accounts);


    const accountOwner = useMemo(() => {
        if (filledAccountsArr[0].toLowerCase() === walletAccount?.toLowerCase()) {
            return true;
        }
        return false;
    }, [filledAccountsArr, walletAccount])


    return (

        <Stack>

            <Flex direction="column" maxWidth="100%"
                  m={"0px"}
                  p={'0px'}
                  h={'100%'}
                // border="2px solid "
                // borderColor='red'
            >
                {/*{filledAccountsArr.length !== 0 ?*/}
                {/*    <Text*/}
                {/*        fontSize={{sm: "lg", lg: "xl"}}*/}
                {/*        color={'#271c27'}*/}
                {/*        fontWeight="bold"*/}
                {/*        ms={{sm: "8px", md: "0px"}}*/}
                {/*    >*/}
                {/*        {walletAccount?.length !== 0 ?*/}
                {/*             accountName*/}
                {/*            : 'Name'*/}
                {/*        }*/}
                {/*    </Text>*/}

                {/*    : <Flex alignItems={'center'}> {filledAccountsArr[0]} </Flex>}*/}


                {filledAccountsArr.length === 0 ?
                    <Text
                        fontSize={{sm: "lg", lg: "xl"}}
                        color={'#271c27'}
                        fontWeight="bold"
                        ms={{sm: "8px", md: "0px"}}
                    >
                        {walletAccount?.length !== 0 ?
                            walletAccount
                            : 'Non - Registered Wallet Account'
                        }
                    </Text>

                    : <Flex alignItems={'center'}> {filledAccountsArr[0]} </Flex>}

                <Text
                    fontSize={{sm: "sm", md: "md"}}
                    color='#342534'
                    fontWeight="semibold"
                >
                    ramonajenny.n@gmail.com
                </Text>

                <Flex align="center" mb="0px">
                    <Text
                        fontSize="md"
                        color='pmpurple.13'
                        fontWeight="bold"
                        me="10px"
                    >
                        Social Media:{" "}
                    </Text>

                    <Link
                        href="#"
                        color='pmpurple.13'
                        fontSize="lg"
                        me="10px"
                        _hover={{color: "#9c7e9c"}}
                    >
                        <Icon as={FaFacebook}/>
                    </Link>
                    <Link
                        href="#"
                        color='pmpurple.13'
                        fontSize="lg"
                        me="10px"
                        _hover={{color: "#9c7e9c"}}
                    >
                        <Icon as={FaInstagram}/>
                    </Link>
                    <Link
                        href="#"
                        color='pmpurple.13'
                        fontSize="lg"
                        me="10px"
                        _hover={{color: "#9c7e9c"}}
                    >
                        <Icon as={FaTwitter}/>
                    </Link>
                    <Link
                        href="#"
                        color='pmpurple.13'
                        fontSize="lg"
                        me="10px"
                        _hover={{color: "#9c7e9c"}}
                    >
                        <Icon as={FaFacebook}/>

                    </Link>

                </Flex>


                <Text
                    fontSize="md"
                    color='pmpurple.13'
                    fontWeight="bold"
                    me="10px"
                >
                    Your NFI QR code:{" "}
                    <Link
                        href="#"
                        color='pmpurple.13'
                        fontSize="lg"
                        me="10px"
                        _hover={{color: "#9c7e9c"}}
                    >
                        <Icon as={FaFacebook}/>

                    </Link>
                </Text>

            </Flex>
        </Stack>


    )


};

export default Header;
