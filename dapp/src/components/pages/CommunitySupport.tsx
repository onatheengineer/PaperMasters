//import React { useEffect, useState, useRef } from "react";
import type {FC} from 'react'
import {
    Box, Heading, useMergeRefs,
    Button,
    Flex,
    Menu, MenuButton, MenuDivider,
    MenuItem, MenuList, StackDivider, Text, useColorModeValue, Stack, Collapse, useDisclosure,
} from '@chakra-ui/react';
import RoutesRoutes from "../../app/RoutesRoutes";
import {Link as ReachLink} from "react-router-dom";
import {setRef} from "@mui/material";
import PageForum from "./PageForum";
import React from "react";




export const CommunitySupport:FC=()=> {

    // const LearnForumPage [
    //     <PageForum title={'CommunitySupport about NFIs'} body={'dfgfdhdftgyertg'}/>,
    //     <PageForum title={'What is a Non-Fungiable-Identity (NFI)'} body={'dfgfdhdftgyertg'}/>,
    //     <PageForum title={'What is the difference between a NFT and PaperMasters NFI'} body={'dfgfdhdftgyertg'}/>,
    //     <PageForum title={'What are the benefits of having a PaperMasters NFI?'} body={'dfgfdhdftgyertg'}/>,
    //     <PageForum title={'Mint PaperMasters NFI required fields'} body={'using your name field combined with the ' +
    //         'description field and an arbatary seceret word obtained via a hidden generator is used to create a uniqiue ' +
    //         '64bit hash (66 charactors onces the 0x is added to it)'}/>,
    // ]


    return (

        <Flex
            w={"100%"}
        >
            {/*<Flex >*/}
            {/*    <RoutesRoutes/>*/}
            {/*</Flex>*/}
            <Box
                flex={'auto'}
                border={'2px solid'}
                borderColor={'pmpurple.10'}
                bgColor={'pmpurple.1'}
                borderRadius={'10px'}
                m={30}
            >
                <Box
                flexGrow={1}
                m={8}
                >
                    <Heading
                        textAlign={'center'}
                        fontSize={'40px'}
                        fontWeight={'600'}
                        fontStyle={'bold'}
                    >
                        Community Support
                    </Heading>
                </Box>
                <PageForum title={'Blockchain Protection and Legitimacy'} body={'NFIs are transparent identities, just like the Blockchain keeps a ' +
                    'public ledger, identities keep your wallet address transparent as well. I hope that the community will see value in becoming a PaperMaster and' +
                    'show off the integrity of their wallet address.'} />
                <PageForum title={'Community Guidelines'} body={'Please do not Validate or Report anyone that you personally have not done ' +
                    'business with. If you have information to offer to the community about a shady account, please use the Mentions feature.'} />
                <PageForum title={'Benefits of becoming a PaperMaster?'} body={'Providing fellow Blockchainers with a reputable reputation is vital to ' +
                    'keeping the community safe so no accounts get hurt. Being a PaperMaster helps validate your integrity and support of honest ' +
                    'business transactions by sending them to your PaperMasters identity page with a live account ledger, any past contracts you ' +
                    'helped create and mentions by your fellow Blockchains showing that you are the honest trustworthy person you are telling them you are.'} />
                <PageForum title={'What is NFI Protection and Validation?'} body={'Let us all keep the Blockchain beautiful, validating and reporting ' +
                    'a wallet address helps your fellow Blockchainers known that the wallet address is safe, or not safe, to do business with. These Validations and Reports ' +
                    'are Non-Fungible Tokens permanently attached to the wallet address. '} />
                <PageForum title={'How to add a wallet account'} body={'Go to the search page and type in a chain id ' +
                    'of the wallet account you wish to add, then add the wallet account number, remember account addresses are at least 26 characters'} />
                <PageForum title={'Cookies Policy'}
                           body={'Authentication - \n I use cookies to verify your account and determine analytics. \n Security site ' +
                               'and product integrity - \n I ' +
                               'may use Cookies to keep your account and data safe and secure. \n Advertising - Nope, not interested, also I will never sell your' +
                               'information. \n Site features and services - \n' +
                               'I may use cookies to enable help me increase functionality of the site to provide a better user experience. \n Performance -' +
                               'I am use cookies to provide you with the best experience possible. Analytics and research -\n' +
                               'I use cookies to better understand how people use the site so that it can improve it.' } />
            </Box>
        </Flex>
    )
};

export default CommunitySupport;

