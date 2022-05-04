import * as React from 'react';
import type {FC} from 'react';
import {
    Avatar, AvatarGroup, Box, Button, Flex, Grid, GridItem, Icon, Image, Link, MenuItem,
    Stack, Switch, Text, useColorModeValue, HStack,
} from "@chakra-ui/react";
import {useAppSelector} from "../../../app/hooks";
import {
    FaDiscord,
    FaFacebook, FaGithub,
    FaInstagram,
    FaLinkedin,
    FaPlus,
    FaReddit,
    FaTwitch,
    FaTwitter,
    FaYoutube
} from "react-icons/fa";
import {openseaIcon} from "../../../assets/icons/openseaIcon";
import {MdOutlinePeopleOutline} from "react-icons/md";
import {SocialMediaInterface} from "../../../features/accountDB/AccountDBSlice.types";

interface iconLinkInterface{
    children: any,
    hrefLink: string,
}

export const IconLinkComponent: FC<iconLinkInterface> = ({children, hrefLink}) => {
    return (
<Box
    //border={'1px solid'}
    //borderColor={'pmpurple.13'}
    position={'relative'}
    p={'0px'}
    m={'0px'}
>
        <Link
            href={hrefLink} isExternal
            position={'relative'}
            //border={'1px solid green'}
            color='pmpurple.13'
            fontSize="lg"
            _hover={{color: "#9c7e9c"}}
        >
            {children}
        </Link>
</Box>
    )
}

export const SocialMedia:FC=()=> {
     return (
        <Box
            //border={'1px solid'}
            //borderColor={'pmpurple.6'}
            p={'0px'}
            alignItems={'center'}
            textAlign={'center'}
            position={'relative'}
            m={'0px'}
        >
            <HStack
                spacing={4}
                alignItems={'center'}
            >

                <Stack direction='row' spacing={2}>
                    {/*{SocialMediaInterface.Discord === "" ?*/}
                    {/*    <IconLinkComponent*/}
                    {/*        hrefLink={'https://papermasters.io'}>*/}
                    {/*        <Icon as={FaDiscord}/>*/}
                    {/*    </IconLinkComponent>*/}
                    {/*    : null*/}
                    {/*}*/}
                    <IconLinkComponent
                        hrefLink={'https://papermasters.io'}>
                        <Icon as={FaTwitter}/>
                    </IconLinkComponent>
                    <IconLinkComponent
                        hrefLink={'https://papermasters.io'}>
                        <Icon as={FaLinkedin}/>
                    </IconLinkComponent>
                    <IconLinkComponent
                        hrefLink={'https://papermasters.io'}>
                        <Icon as={FaYoutube}/>
                    </IconLinkComponent>
                    <IconLinkComponent
                        hrefLink={'https://papermasters.io'}>
                        <Icon as={FaInstagram}/>
                    </IconLinkComponent>
                    <IconLinkComponent
                        hrefLink={'https://papermasters.io'}>
                        <Icon as={FaTwitch}/>
                    </IconLinkComponent>

                    <IconLinkComponent
                        hrefLink={'https://papermasters.io'}>
                        <Icon as={FaFacebook}/>
                    </IconLinkComponent>
                    <IconLinkComponent
                        hrefLink={'https://papermasters.io'}>
                        <Icon as={FaReddit}/>
                    </IconLinkComponent>
                    <IconLinkComponent
                        hrefLink={'https://papermasters.io'}>
                        <Icon as={FaGithub}/>
                    </IconLinkComponent>
                    <IconLinkComponent
                        hrefLink={'https://papermasters.io'}>
                        <Icon as={openseaIcon}/>
                    </IconLinkComponent>
                    <IconLinkComponent
                        hrefLink={'https://papermasters.io'}>
                        <Icon as={MdOutlinePeopleOutline}/>
                    </IconLinkComponent>
                    <IconLinkComponent
                        hrefLink={'https://papermasters.io'}>
                        <Icon as={MdOutlinePeopleOutline}/>
                    </IconLinkComponent>
                </Stack>
            </HStack>
        </Box>
    )
};

export default SocialMedia;