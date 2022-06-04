import {
  Flex,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import React, { FC } from 'react';

import BackgroundLogo from '../../../assets/legoLavendarheadercroped.png';
import SecondFooter from './Footers/SecondFooterHome';

export const Home: FC = () => {
  return (
    <Flex
      h={'100%'}
      // border={'1px solid green'}
      flexDirection={'column'}
    >
      <Flex
        w={'100vW'}
        alignItems={'stretch'}
        flexGrow={1}
        h={{ base: '40vh', md: 'none' }}
        backgroundImage={BackgroundLogo}
        backgroundSize={'cover'}
        backgroundPosition={'center center'}
      >
        <VStack
          w={'full'}
          justify={'center'}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={'linear(to-r, blackAlpha.600, transparent)'}
        >
          <Stack
            maxW={'2xl'}
            spacing={4}
            // border={'1px solid blue'}
            justifyContent={'left'}
          >
            <Text
              color={'white'}
              fontWeight={600}
              lineHeight={1.2}
              fontSize={{ base: '3xl', md: '4xl' }}
            >
              The PaperMasters
            </Text>
            <Text
              color={'white'}
              fontWeight={300}
              lineHeight={1.2}
              fontSize={{ base: 'xl', md: '2xl' }}
            >
              Providing protection and legitimacy for People, Companies and
              Contracts by bringing Non-Fungable-Identities (NFIs) to the
              Blockchain
            </Text>
          </Stack>
        </VStack>
      </Flex>
      <SecondFooter />
    </Flex>
  );
};

export default Home;
