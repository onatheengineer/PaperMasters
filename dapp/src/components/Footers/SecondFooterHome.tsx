import {
    Box, chakra, Grid, GridItem, Container,
} from '@chakra-ui/react';
import * as React from "react";

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
             flexGrow={1}
             maxW="full"
             py={10}
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
                <Feature
                    heading={'What is a Non-Fungible-Identity (NFI)?'}
                    text={'Short text describing one of you components/service'}
                />
                <Feature
                    heading={'Benefits of becoming a PaperMaster?'}
                    text={'Short text describing one of you components/service'}
                />
                <Feature
                    heading={'What is NFI Protection and Validation?'}
                    text={'Short text describing one of you components/service'}
                />
                <Feature
                    heading={'How to search the NFI Catalog'}
                    text={'Short text describing one of you components/service'}
                />
            </Grid>
        </Box>
    );
}