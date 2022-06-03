import {
  Box,
  chakra,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import * as React from 'react';
import { Link as ReachLink } from 'react-router-dom';

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
    <Flex
    // border={'1px solid red'}
    >
      <Box
        as={Container}
        // flexShrink={1}
        py={10}
        px={7}
        maxW="full"
        bg={'pmpurple.1'}
        color={'pmpurple.12'}
        // border={'1px solid blue'}
        // borderColor={'pmpurple.8'}
      >
        <Grid
          // border={'1px solid purple'}
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            // md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          }}
          gap={{ base: '8', sm: '12', md: '16' }}
        >
          <Stack>
            <Text fontSize="xl" fontWeight="700" fontStyle={'bold'}>
              <Link as={ReachLink} to="/communitysupport">
                What is a Non-Fungible-Identity (NFI)?
              </Link>
            </Text>
            <Text fontSize="md" fontWeight="400">
              NFIs are transparent wallet addresses providing a tracking by
              fellow Blockchainers of the interactions that wallet address has
              had in the community.
            </Text>
          </Stack>
          <Stack>
            <Text fontSize="xl" fontWeight="700" fontStyle={'bold'}>
              <Link as={ReachLink} to="/communitysupport">
                Benefits of becoming a PaperMaster?
              </Link>
            </Text>
            <Text fontSize="md" fontWeight="400">
              Providing fellow Blockchainers with a reputable reputation found
              on your PaperMasters identity page including a live account
              ledger, any past contracts you helped create and mentions by your
              fellow Blockchains provides the way you need to authenticate that
              you are the honest trustworthy person the rest of us know you are.
            </Text>
          </Stack>
          <Stack>
            <Text fontSize="xl" fontWeight="700" fontStyle={'bold'}>
              <Link as={ReachLink} to="/communitysupport">
                What is NFI Protection and Validation?
              </Link>
            </Text>

            <Text fontSize="md" fontWeight="400">
              Let us all keep the Blockchain beautiful, validating and reporting
              a wallet address helps your fellow Blockchainers known that a
              wallet address is safe, or not safe, to conduct business with.
              These Validations and Reports are Non-Fungible Tokens permanently
              attached to wallet addresses.
            </Text>
          </Stack>
        </Grid>
      </Box>
    </Flex>
  );
}
