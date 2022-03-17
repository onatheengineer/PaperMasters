import * as React from 'react';
import type {FC} from 'react';
import {Link as ReachLink, useParams} from "react-router-dom";
import {
    Avatar, AvatarGroup, Box, Button, Flex, Grid, GridItem, Icon, Image, Link, MenuItem,
    Stack, Switch, Text, useColorModeValue, HStack, useDisclosure, Tooltip, VStack,
    Container, AspectRatio, AvatarBadge, Divider, Center, InputRightElement, useStyleConfig,
    TabPanel, TabPanels, TabList, Tabs, Tab, Select, Heading, Menu, MenuButton, MenuList, MenuDivider,
} from "@chakra-ui/react";
import {useMemo} from "react";
import {useAppSelector} from "../../app/hooks";
import {FaDiscord, FaFacebook, FaInstagram, FaLinkedin, FaPlus, FaTwitch, FaTwitter, FaYoutube} from "react-icons/fa";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {BsFillPersonLinesFill} from "react-icons/bs";
import {openseaIcon} from "../../assets/icons/openseaIcon";
import {IconType} from "react-icons";

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


interface socialMediaInterface {

}


export const SocialMedia:FC<socialMediaInterface>=()=> {
    const {walletAccount} = useParams();

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
            >
                <IconLinkComponent
                    hrefLink={'https://papermasters.io'}>
                    <Icon as={openseaIcon}/>
                </IconLinkComponent>

                <IconLinkComponent
                    hrefLink={'https://papermasters.io'}>
                    <Icon as={FaDiscord}/>
                </IconLinkComponent>

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
                    <Icon as={FaYoutube}/>
                </IconLinkComponent>

            </HStack>
        </Box>
    )
};

export default SocialMedia;