import {
  Box,
  Flex,
  HStack,
  Spacer,
  Stack,
  Tag,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import moment from 'moment';
import * as React from 'react';
import { FC } from 'react';
import { AiFillCalendar, AiOutlineTransaction } from 'react-icons/ai';
import { MdCallReceived } from 'react-icons/md';
import { SiEthereum } from 'react-icons/si';

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
      <Box w={'100%'} h={'100%'} overflow={'auto'} p={'5px'}>
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
                  // px={2}
                  fontSize={'10pt'}
                >
                  <Stack w={'100%'}>
                    <Box w={'100%'}>
                      <HStack
                        // direction={['column', 'row']}
                        // pt={{ base: '12px', lg: '0px' }}
                        spacing={{ base: 2, md: 5 }}
                        textAlign={'left'}
                      >
                        <Box ml={'0px'} w={'5%'}>
                          <Tooltip
                            label={`Transaction ${el.hash}`}
                            aria-label="A tooltip"
                            bg={'pmpurple.8'}
                          >
                            <span>
                              <AiOutlineTransaction fontSize={'18px'} />
                            </span>
                          </Tooltip>
                        </Box>
                        <Box ml={'10px'} w={'35%'}>
                          <HStack>
                            Icon={<AiFillCalendar fontSize="18px" />}
                            <Text fontSize="sm" fontWeight="bold">
                              {timeStampShort}
                            </Text>
                          </HStack>
                        </Box>
                        <Box w={'60%'}>
                          <HStack textAlign={'right'}>
                            {el.from === paramsWalletURL ? (
                              <Tooltip label={'Payment Sent'}>
                                <span>
                                  <MdCallReceived color={'green.100'} />
                                </span>
                              </Tooltip>
                            ) : (
                              <Tooltip label={'Payment Received'}>
                                <span>
                                  <MdCallReceived
                                    style={{ transform: 'rotate(90deg)' }}
                                  />
                                </span>
                              </Tooltip>
                            )}
                            <span>
                              <SiEthereum fontSize="18px" />
                            </span>
                            <Tooltip label={'Transaction Cost'}>
                              <Text
                                fontSize="sm"
                                fontWeight="bold"
                                textAlign={'right'}
                              >
                                {valueFormatted}
                              </Text>
                            </Tooltip>
                          </HStack>
                        </Box>
                      </HStack>
                    </Box>
                    <Stack
                      // direction={['column', 'row']}
                      // pt={{ base: '12px', lg: '0px' }}
                      spacing={0}
                      flexDirection={{
                        base: 'column',
                      }}
                      mb={'5px'}
                    >
                      <Box
                      // pt={{ base: '12px', md: '0px' }}
                      >
                        <Text w={'100%'} borderBottom={'1px solid #aaaaaa'}>
                          From
                        </Text>
                        <Text
                          color={'pmpurple.13'}
                          overflowWrap={'break-word'}
                          fontWeight={
                            paramsWalletURL === el.from ? '900' : '400'
                          }
                          fontSize={'9pt'}
                        >
                          {el.from}
                        </Text>
                      </Box>
                      <Box
                        // pt={{ base: '12px', lg: '0px' }}
                        flexDirection={{
                          base: 'column',
                          lg: 'row',
                        }}
                      >
                        <Text w={'100%'} borderBottom={'1px solid #aaaaaa'}>
                          To
                        </Text>
                        <Text
                          color={'pmpurple.13'}
                          fontWeight={paramsWalletURL === el.to ? '900' : '400'}
                          overflowWrap={'break-word'}
                          fontSize={'9pt'}
                        >
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
