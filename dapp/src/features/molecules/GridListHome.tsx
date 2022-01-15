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
} from '@chakra-ui/react';
import {} from '@chakra-ui/react';

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

export default function gridListHome() {
    return (
        <Box as={Container} maxW="7xl" mt={14} p={4}>
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
                        <Button colorScheme="purple" size="md">
                            Create a PM Identity
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
                    text={'Short text describing one of you features/service'}
                />
                <Feature
                    heading={'Minting NFTs'}
                    text={'Short text describing one of you features/service'}
                />
                <Feature
                    heading={'Validation'}
                    text={'Short text describing one of you features/service'}
                />
                <Feature
                    heading={'PM Identity Cataloging'}
                    text={'Short text describing one of you features/service'}
                />
            </Grid>
        </Box>
    );
}