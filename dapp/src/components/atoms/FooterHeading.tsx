import {Box, Container, Heading, HeadingProps, Link, SimpleGrid, Stack, Text, useColorModeValue} from '@chakra-ui/react'
import * as React from 'react'
import PMLogo from "../../PaperMastersLogoGIMP.png";
import {LinkGrid} from "./LinkGrid";
import {SubscribeForm} from "./SubscribeForm";
import {Link as ReachLink} from "react-router-dom";
import {ReactNode} from "react";

const ListHeader = ({ children }: { children: ReactNode }) => {
    return (
        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
            {children}
        </Text>
    );
};

export default function FooterHeading() {
    return (
        <Box
            bg={useColorModeValue('#f2eef2', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Container as={Stack} maxW={'7xl'} py={8}>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 6 }} spacing={9}>

                    <Stack align={'flex-start'}>
                        <ListHeader><img src={PMLogo}/></ListHeader>
                        {/*<AppStoreBadge />*/}
                        {/*<PlayStoreBadge />*/}
                        <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: '10', md: '20' }}>
                            <LinkGrid spacing={{ base: '10', md: '20', lg: '28' }} flex="1" />

                        </Stack>
                        <SubscribeForm width={{ base: 'full', md: 'sm' }} />
                    </Stack>
                    <Stack></Stack>
                    <Stack align={'flex-start'}>
                        <ListHeader>Security</ListHeader>
                        <Link href={'#'}>Privacy Policy</Link>
                        <Link href={'#'}>Terms of Service</Link>
                        {/*<Link href={'#'}>Community Guidelines</Link>*/}
                    </Stack>
                    <Stack align={'flex-start'}>
                        <ListHeader>Support</ListHeader>
                        <Link href={'#'}>Learning Center</Link>
                        <Link href={'#'}>Community Forum</Link>
                    </Stack>
                    <Stack align={'flex-start'}>
                        <ListHeader>Products</ListHeader>
                        <Link href={'#'}>Authentic PM Identities</Link>
                        <Link href={'#'}>Minting NFTs</Link>
                        <Link href={'#'}>Validation</Link>
                        <Link href={'#'}>PM Identity Cataloging</Link>
                    </Stack>
                    <Stack align={'flex-start'}>
                        <ListHeader>Company</ListHeader>
                        <Link  as={ReachLink} to="/Analytics" href={'#'}>Analytics</Link>
                        <Link as={ReachLink} to="/AboutUs" href={'#'}>About Us</Link>
                        <Link  as={ReachLink} to="/AboutUs"href={'#'}>Contact Us</Link>
                        <Link as={ReachLink} to="/SupportUs" href={'#'}>Support Us</Link>
                        <Link  as={ReachLink} to="/Logokit"href={'#'}>Logo Kit</Link>
                        <Link  as={ReachLink} to="/News" href={'#'}>News and Events</Link>
                    </Stack>
                </SimpleGrid>
            </Container>
        </Box>
    );
};