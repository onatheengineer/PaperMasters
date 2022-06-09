import {
  Box,
  Flex,
  HStack,
  Spacer,
  Stack,
  Tag,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import moment from 'moment';
import * as React from 'react';
import { FC } from 'react';

import { ParamsURLInterface } from '../../../features/accountDB/AccountDBSlice.types';
import { useGetQueryMainnetQuery } from '../../../features/reactQuery/RTKQuery';

export const AccountLedger: FC<ParamsURLInterface> = ({
  chainIdURL,
  paramsWalletURL,
}) => {
  const getLedger = useGetQueryMainnetQuery({
    chainIdURL: chainIdURL!,
    paramsWalletURL: paramsWalletURL!,
  });
  console.log('getLedger', getLedger);
  return (
    <Flex
      align="center"
      // border={'1px solid pink'}
      h={'90%'}
      w={'100%'}
      flexGrow={1}
      overflow={'none'}
    >
      <Box w={'100%'} h={'100%'} overflow={'auto'}>
        <Stack w={'100%'}>
          {getLedger.isSuccess &&
            getLedger.data.history.map((el: any, index: number) => {
              const timeStampFormatted = moment(el.timestamp * 1000).format(
                'MMM DD YYYY, hh:mm:ss a',
              );
              const timeStampShort = moment(el.timestamp * 1000).format(
                'MMM DD YYYY',
              );
              const valueFormatted =
                parseFloat(ethers.utils.formatEther(el.value)) +
                parseFloat(ethers.utils.formatEther(el.gasPrice));
              return (
                <Box
                  flex={'max-content'}
                  w={'100%'}
                  // border={'1px solid red'}
                  // py={'5px'}
                  bgColor={index % 2 === 0 ? 'white' : '#eeeeee'}
                  borderBottom={'1px solid'}
                  borderColor={'pmpurple.13'}
                  // px={2}
                  fontSize={'10pt'}
                >
                  <Stack border={'1px solid pink'}>
                    <Stack
                      // direction={['column', 'row']}
                      border={'1px solid green'}
                      // pt={{ base: '12px', lg: '0px' }}
                      flexDirection={{
                        base: 'column',
                        lg: 'row',
                      }}
                    >
                      <Box>
                        <Tooltip
                          label={timeStampFormatted}
                          aria-label="A tooltip"
                          bg={'pmpurple.8'}
                        >
                          <Text
                            // pl={"20px"}
                            // noOfLines={1}
                            color={'pmpurple.13'}
                            fontWeight="400"
                            whiteSpace={'nowrap'}
                          >
                            <Tag
                              fontSize={'9pt'}
                              bgColor={'pmpurple.13'}
                              color={'white'}
                            >
                              {timeStampShort}
                            </Tag>
                          </Text>
                        </Tooltip>
                      </Box>

                      <Box>
                        <Text
                          textAlign={'left'}
                          color={'pmpurple.13'}
                          whiteSpace={'nowrap'}
                          textOverflow={{ base: 'ellipsis', xl: 'none' }}
                        >
                          <Tag
                            bgColor={'pmpurple.7'}
                            color={'white'}
                            fontSize={'9pt'}
                          >
                            Tx
                          </Tag>{' '}
                          {el.hash}
                        </Text>
                      </Box>
                      <Spacer />
                      <Box border={'1px solid yellow'}>
                        <Text>
                          <Tag
                            fontSize={'9pt'}
                            bgColor={'pmpurple.7'}
                            color={'white'}
                          >
                            Amount
                          </Tag>{' '}
                          {valueFormatted}
                        </Text>
                      </Box>
                    </Stack>
                    <Stack
                      // direction={['column', 'row']}
                      border={'1px solid green'}
                      // pt={{ base: '12px', lg: '0px' }}
                      flexDirection={{
                        base: 'column',
                        lg: 'row',
                      }}
                    >
                      <Box
                        border={'1px solid blue'}
                        // pt={{ base: '12px', md: '0px' }}
                      >
                        <Text
                          color={'pmpurple.13'}
                          whiteSpace={'nowrap'}
                          fontWeight="400"
                        >
                          <Tag
                            fontSize={'9pt'}
                            bgColor={'pmpurple.7'}
                            color={'white'}
                          >
                            From
                          </Tag>{' '}
                          {el.from}
                        </Text>
                      </Box>
                      <Spacer />
                      <Box
                        border={'1px solid red'}
                        // pt={{ base: '12px', lg: '0px' }}
                        flexDirection={{
                          base: 'column',
                          lg: 'row',
                        }}
                      >
                        <Text
                          color={'pmpurple.13'}
                          whiteSpace={'nowrap'}
                          fontWeight="400"
                        >
                          {' '}
                          <Tag
                            fontSize={'9pt'}
                            bgColor={'pmpurple.7'}
                            color={'white'}
                          >
                            To
                          </Tag>{' '}
                          {el.to !== null ? (
                            el.to
                          ) : (
                            <Box display={'inline'} color={'pmpurple.27'}>
                              Contract Creation
                            </Box>
                          )}
                        </Text>
                      </Box>
                    </Stack>
                  </Stack>
                </Box>
              );
            })}
        </Stack>
      </Box>
    </Flex>
  );
};

export default AccountLedger;
