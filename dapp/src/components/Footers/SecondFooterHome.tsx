import {
    Box, chakra, Grid, GridItem, Container, Heading, Text, Link
} from '@chakra-ui/react';
import * as React from "react";
import {Link as ReachLink, To} from "react-router-dom";

interface FeatureProps {
    heading: string;
    text: string;
}

const Feature =({heading, text}: FeatureProps) => {
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
        <Box as={Container}
             py={14}
             flexShrink={1}
             maxW="full"
             justifyContent={'space-evenly'}
             alignItems={'flex-start'}
             alignContent={'space-evenly'}
             bg={'pmpurple.3'} color={'pmpurple.12'}
            //border={'1px solid'}
            //borderColor={'pmpurple.8'}
        >
            <Grid
                templateColumns={{
                    base: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(2, 1fr)',
                    lg: 'repeat(4, 1fr)',
                }}
                gap={{base: '8', sm: '12', md: '16'}}>
                <GridItem>
                    <Heading fontSize="xl" fontWeight="600" fontStyle={'bold'}>
                        <Link
                            as={ReachLink}
                            to="/learn"
                        >
                        What is a Non-Fungible-Identity (NFI)?
                        </Link>
                                <Text fontSize="lg" fontWeight="400" >
                            Authentic PM Identities are .....NFIs are transparent identites...
                        </Text>
                    </Heading>
                </GridItem>
                <GridItem>
                    <Heading fontSize="xl" fontWeight="600" fontStyle={'bold'}>
                        <Link
                            as={ReachLink}
                            to="/learn"
                        >
                            Benefits of becoming a PaperMaster?
                        </Link>
                        <Text fontSize="lg" fontWeight="400" >
                            NFIs are transparent identites...
                        </Text>
                    </Heading>
                </GridItem>
                <GridItem>
                    <Heading fontSize="xl" fontWeight="600" fontStyle={'bold'}>
                        <Link
                            as={ReachLink}
                            to="/learn"
                        >
                            What is NFI Protection and Validation?
                        </Link>
                        <Text fontSize="lg" fontWeight="400" >
                            NFIs are transparent identites...
                        </Text>
                    </Heading>
                </GridItem>
                <GridItem>
                    <Heading fontSize="xl" fontWeight="600" fontStyle={'bold'}>
                        <Link
                            as={ReachLink}
                            to="/learn"
                        >
                            How to search the NFI Catalog
                        </Link>
                        <Text fontSize="lg" fontWeight="400" >
                            NFIs are transparent identites...
                        </Text>
                    </Heading>
                </GridItem>
            </Grid>
        </Box>
    );
}