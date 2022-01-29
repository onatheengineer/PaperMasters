import {Box, Container, Heading, HeadingProps, Link, SimpleGrid, Stack, Text, useColorModeValue} from '@chakra-ui/react'
import * as React from 'react'
import PMLogo from "../../../PaperMastersLogoGIMP.png";
import {Link as ReachLink} from "react-router-dom";
import {ReactNode} from "react";
import SocialMediaLinksFooter from "./SocialMediaLinksFooter";


const ListHeader = ({ children }: { children: ReactNode }) => {
    return (
        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
            {children}
        </Text>
    );
};

export default function Footer() {
    return (
        <Box
            bg={'pmpurple.2'}
            color={'pmpurple.13'}
            borderTopWidth={1}
            borderStyle={'solid'}
            borderColor={'pmpurple.4'}>
            <Container as={Stack}
                       maxW={'9xl'}
                       px={2}
                       pt={8}
                       pb={8}
                       pl={16}
                       direction={{ base: 'column', md: 'row' }}
                       justify={'center'}>
                <SimpleGrid columns={7} spacing={14}>

                    <Stack >
                        {/*<ListHeader ><img src={PMLogo}/></ListHeader>*/}
                        <Link  as={ReachLink} to="/" ><img src={PMLogo}/></Link>
                        {/*<AppStoreBadge />*/}
                        {/*<PlayStoreBadge />*/}
                    </Stack>
                    <Stack >
                        <ListHeader>Products</ListHeader>
                        <Link  as={ReachLink} to="/" >Authentic PM Identities</Link>
                        <Link  as={ReachLink} to="/" >NFI Validation</Link>
                        <Link  as={ReachLink} to="/" >Attach NFTs to NFIs</Link>
                    </Stack>
                    <Stack >
                        <ListHeader>Services</ListHeader>
                        <Link  as={ReachLink} to="/" >Search NFIs</Link>
                        <Link  as={ReachLink} to="/" >Report suspicious activity</Link>
                        <Link  as={ReachLink} to="/" >CloudHWM</Link>
                    </Stack>
                    <Stack >
                        <ListHeader>Learn and Support</ListHeader>
                        <Link  as={ReachLink} to="/" >Learning Center</Link>
                        <Link  as={ReachLink} to="/" >Community Forum</Link>
                    </Stack>
                    <Stack >
                        <ListHeader>Security</ListHeader>
                        <Link as={ReachLink} to="/">Privacy Policy</Link>
                        <Link as={ReachLink} to="/">Terms of Service</Link>
                        <Link as={ReachLink} to="/">Blockchain Protection</Link>
                        <Link as={ReachLink} to="/">Blockchain Legitimacy</Link>
                        <Link as={ReachLink} to="/">Community Guidelines</Link>
                    </Stack>
                    <Stack >
                        <ListHeader>News and Events</ListHeader>
                        <Link  as={ReachLink} to="/" >New & Updated Features</Link>
                        <Link aas={ReachLink} to="/" >Stories to come</Link>
                    </Stack>
                    <Stack >
                        <ListHeader>Company</ListHeader>
                        <Link  as={ReachLink} to="/Analytics" >Analytics</Link>
                        <Link as={ReachLink} to="/AboutUs" >About Us</Link>
                        <Link  as={ReachLink} to="/AboutUs">Contact Us</Link>
                        <Link as={ReachLink} to="/SupportProject" >Support the Project</Link>
                        <Link  as={ReachLink} to="/Logokit" >Logo Kit</Link>
                    </Stack>

                </SimpleGrid>
            </Container>
        </Box>

    );

};