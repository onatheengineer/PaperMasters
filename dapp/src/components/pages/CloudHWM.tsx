import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Link,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import type { FC } from 'react';
import * as React from 'react';
import { Link as ReachLink } from 'react-router-dom';

export const CloudHWM: FC = () => {
  return (
    <Flex flexDirection={'column'}>
      <Flex
        w={'100vw'}
        flexGrow={1}
        // backgroundImage={BackgroundLogo}
        backgroundSize={'cover'}
        backgroundPosition={'center center'}
      >
        <VStack
          w={'full'}
          justify={'center'}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={'linear(to-r, blackAlpha.600, transparent)'}
        >
          <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
            <Text
              color={'white'}
              fontWeight={600}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: '3xl', md: '6xl' })}
            >
              CloudHWM
            </Text>
            <Text
              color={'white'}
              fontWeight={300}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: '4xl', md: '3xl' })}
            >
              Bringing Hardware Protection to Blockchain Miners (coming soon)
            </Text>
          </Stack>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default CloudHWM;

// <Stack direction={'row'}>
//   <Button
//       bg={'whiteAlpha.300'}
//       rounded={'full'}
//       color={'white'}
//       _hover={{ bg: 'whiteAlpha.500' }}
//   >
//     <a href="https://cloudhwm.com" target={'_blank'}>
//       <Text>Show me more</Text>
//     </a>
//   </Button>
// </Stack>

// <Flex flexShrink={1}>
//   <Box
//       as={Container}
//       display={'flex'}
//       // flexGrow={1}
//       maxW="full"
//       py={16}
//       justifyContent={'space-evenly'}
//       alignItems={'flex-start'}
//       alignContent={'space-evenly'}
//       bg={'pmpurple.3'}
//       color={'pmpurple.12'}
//       // border={'1px solid'}
//       // borderColor={'pmpurple.8'}
//   >
//     <Grid
//         templateColumns={{
//           base: 'repeat(1, 1fr)',
//           sm: 'repeat(2, 1fr)',
//           md: 'repeat(2, 1fr)',
//           lg: 'repeat(3, 1fr)',
//         }}
//         gap={{ base: '6', sm: '12', md: '16' }}
//     >
//       <GridItem>
//         <Heading fontSize="xl" fontWeight="600" fontStyle={'bold'}>
//           What is CloudHWM?
//           <Text fontSize="md" fontWeight="400">
//             CloudHWM is...
//           </Text>
//         </Heading>
//       </GridItem>
//       <GridItem>
//         <Heading fontSize="xl" fontWeight="600" fontStyle={'bold'}>
//           Benefits of CloudHWM service?
//           <Text fontSize="md" fontWeight="400">
//             Hardware heat protection...
//           </Text>
//         </Heading>
//       </GridItem>
//       <GridItem>
//         <Heading fontSize="xl" fontWeight="600" fontStyle={'bold'}>
//           What is CLoudHWM Protection?
//           <Text fontSize="md" fontWeight="400">
//             Protection to Miners hardware...
//           </Text>
//         </Heading>
//       </GridItem>
//     </Grid>
//   </Box>
// </Flex>
