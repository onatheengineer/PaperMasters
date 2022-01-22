import {
    Box,
    VStack,
    Button,
    Flex,
    Divider,
    chakra,
    Grid,
    GridItem,
    Container,
    Link
} from '@chakra-ui/react';
import {} from '@chakra-ui/react';
import {Link as ReachLink} from "react-router-dom";
import * as React from "react";

interface FeatureProps {
    heading: string;
    text: string;
}

const Feature = ({ heading, text }: FeatureProps) => {
    return (
        <GridItem>
            <chakra.h3 fontSize="xl" fontWeight="600">
                {heading}
            </chakra.h3>
            <chakra.p>{text}</chakra.p>
        </GridItem>
    );
};

export default function secondFooterHome() {
    return (
        <Box as={Container} maxW="7xl" mt={4} p={8} my={'28px'}>
            <Grid
                templateColumns={{
                    base: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(2, 1fr)',
                }}
                gap={4}>
                <GridItem colSpan={1}>
                    <VStack alignItems="flex-start" spacing="20px">
                        <chakra.h2 fontSize="3xl" fontWeight="700">
                            Become a PaperMaster
                        </chakra.h2>
                        <Button size="md">
                            <Link  as={ReachLink} to="/Create" href={'#'}>Create a PM Identity</Link>
                        </Button>
                    </VStack>
                </GridItem>
                <GridItem>
                    <Flex>
                        <chakra.p>
                            Watch the follow videos to see yourself as a PaperMaster and learn what it can do for your portfolio.
                            Gain validation tokens and become a legitimate identity on the Blockchain.
                        </chakra.p>
                    </Flex>
                </GridItem>
            </Grid>
            <Divider mt={12} mb={12} />
            <Grid
                templateColumns={{
                    base: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(4, 1fr)',
                }}
                gap={{ base: '8', sm: '12', md: '16' }}>
                <Feature

                    heading={'Authentic PM Identities'}
                    text={'Short text describing one of you components/service'}
                />
                <Feature
                    heading={'Minting NFTs'}
                    text={'Short text describing one of you components/service'}
                />
                <Feature
                    heading={'Validation'}
                    text={'Short text describing one of you components/service'}
                />
                <Feature
                    heading={'PM Identity Cataloging'}
                    text={'Short text describing one of you components/service'}
                />
            </Grid>
        </Box>
    );
}