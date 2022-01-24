import {Box, Container, Heading, HeadingProps, Link, SimpleGrid, Stack, Text, useColorModeValue} from '@chakra-ui/react'
import * as React from 'react'
import PMLogo from "../../PaperMastersLogoGIMP.png";
import {Link as ReachLink} from "react-router-dom";
import {ReactNode} from "react";
import SocialMediaLinks from "../atoms/SocialMediaLinks";


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
            bg={useColorModeValue('#ffffff', 'gray.900')}
            color={useColorModeValue('#5c415c', 'gray.200')}
            borderTopWidth={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('#daceda', 'gray.700')}>
            <Container as={Stack} maxW={'8xl'} px={0} py={8}>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 6 }} spacing={9}>

                    <Stack align={'flex-start'}>
                        <ListHeader><img src={PMLogo}/></ListHeader>
                        {/*<AppStoreBadge />*/}
                        {/*<PlayStoreBadge />*/}
                        <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: '10', md: '20' }}>
                            <SimpleGrid columns={2} spacing={{ base: '10', md: '20', lg: '28' }} flex="1" >
                            </SimpleGrid>
                        </Stack>
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