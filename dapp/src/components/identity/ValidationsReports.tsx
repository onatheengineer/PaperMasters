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
import {FaFacebook, FaInstagram, FaPlus, FaTwitter} from "react-icons/fa";
import ImageArchitect1 from "../../assets/img/ImageArchitect1.png";
import ImageArchitect2 from "../../assets/img/ImageArchitect2.png";
import ImageArchitect3 from "../../assets/img/ImageArchitect3.png";



interface Interface {

}


export const ValidationsReports:FC<Interface>=()=> {
    const {walletAccount} = useParams();

    const filledAccountsArr = useAppSelector((state) => state.register.accounts);



    return(


            <Heading p="12px 5px" mb="12px">
                <Tabs isFitted variant='enclosed'>
                    <TabList mb='1em' color={'pmpurple.13'}>
                        <Tab>Validations</Tab>
                        <Tab>Reports</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>

                            <Text textAlign={'left'} fontSize="sm" color={'pmpurple.8'} fontWeight="600" mb="20px">
                                GIFTED BY ACCOUNT:
                            </Text>
                            <Flex align="center" mb="20px">
                                <Switch colorScheme="purple" me="10px"/>
                                <Text
                                    noOfLines={1}
                                    fontSize="md"
                                    color="gray.500"
                                    fontWeight="400"
                                >
                                    Email me when someone Validates me
                                </Text>
                            </Flex>


                        </TabPanel>
                        <TabPanel>

                            <Text textAlign={'left'} fontSize="sm" color={'pmpurple.8'} fontWeight="600" mb="20px">
                                REPORTED BY ACCOUNT:
                            </Text>
                            <Flex align="center" mb="20px">
                                <Switch colorScheme="purple" me="10px"/>
                                <Text
                                    noOfLines={1}
                                    fontSize="md"
                                    color="gray.500"
                                    fontWeight="400"
                                >
                                    Email me when someone REPORTS me
                                </Text>
                            </Flex>

                        </TabPanel>
                    </TabPanels>
                </Tabs>

            </Heading>



    )

};

export default ValidationsReports;