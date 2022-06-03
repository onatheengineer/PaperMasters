import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import type { FC } from 'react';
import * as React from 'react';
import { useEffect, useMemo } from 'react';
import { AiOutlineComment } from 'react-icons/ai';
import { RiShareForwardLine } from 'react-icons/ri';
import { SiEthereum } from 'react-icons/si';
import { Link as ReachLink, Navigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import bgImage from '../../../assets/legoLavendarheadercroped.png';
import { singleStructBCAction } from '../../../features/accountBC/AccountBCSlice';
import {
  accountArrDBAction,
  paramsChainId,
  paramsWallet,
  singleAccountDictionaryDBAction,
  singleNFIReceiptDBAction,
} from '../../../features/accountDB/AccountDBSlice';
import { ParamsURLInterface } from '../../../features/accountDB/AccountDBSlice.types';
// eslint-disable-next-line import/extensions
import chainIdNetworks from '../../../features/JSON/chainId.networks.json';
import {
  useGetQueryMainnetQuery,
  useGetSingleAccountQuery,
  useGetSingleIdentityBCQuery,
} from '../../../features/reactQuery/RTKQuery';
import AvatarNFI from '../../avatar/AvatarNFI';
import { AccountLedger } from './AccountLedger';
import Header from './Header';
import Mentions from './mentions/Mentions';
import MentionsDrawer from './mentions/MentionsDrawer';
import ModalForIdentNoUseParams from './ModalForIdentNoUseParams';

export const Identity: FC = () => {
  // TODO as soon as they connect - redirect them to their identity page - this is important for the hasIdentityBool slice to work
  const { chainId, walletAcc } = useParams();
  console.log(chainId);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (
      walletAcc !== undefined &&
      walletAcc !== '' &&
      walletAcc !== 'undefined' &&
      chainId !== undefined &&
      chainId !== '' &&
      chainId !== 'undefined'
    ) {
      dispatch(paramsChainId(chainId));
      dispatch(paramsWallet(walletAcc));
      dispatch(
        accountArrDBAction({
          chainIdURL: chainId,
          paramsWalletURL: walletAcc,
        } as ParamsURLInterface),
      );
      dispatch(
        singleStructBCAction({
          chainIdURL: chainId,
          paramsWalletURL: walletAcc,
        } as ParamsURLInterface),
      );
      dispatch(
        singleAccountDictionaryDBAction({
          chainIdURL: chainId,
          paramsWalletURL: walletAcc,
        } as ParamsURLInterface),
      );
    }
    dispatch(
      singleNFIReceiptDBAction({
        chainIdURL: chainId,
        paramsWalletURL: walletAcc,
      } as ParamsURLInterface),
    );
  }, [walletAcc, chainId]);

  const chainIdProviderProvider = useAppSelector(
    (state) => state.accountBC.chainIdProvider,
  );
  const accountArrArr = useAppSelector((state) => state.accountBC.accountArr);
  console.log('accountArr', accountArrArr);
  // const addressHasIdentityBoolBool = useAppSelector((state) => state.accountBC.addressHasIdentityBool);
  // const singleStructBC = useAppSelector((state) => state.accountBC.getStructBC);
  // const singleAccountDictionaryDBDB = useAppSelector((state) => state.accountDB.singleAccountDictionaryDB);
  // const singleNFIReceiptDBDB = useAppSelector((state) => state.accountDB.singleNFIReceiptDB);

  const useGetSingleAccountQueryQuery = useGetSingleAccountQuery({
    chainIdURL: chainId!,
    paramsWalletURL: walletAcc!,
  });
  console.log('useGetSingleAccountQueryQuery', useGetSingleAccountQueryQuery);
  const useGetSingleIdentityBCQueryQuery = useGetSingleIdentityBCQuery({
    chainIdURL: chainId!,
    paramsWalletURL: walletAcc!,
  });
  console.log('dataIdentity:', useGetSingleIdentityBCQueryQuery);
  const getBalanceQuery = useGetQueryMainnetQuery({
    chainIdURL: chainId!,
    paramsWalletURL: walletAcc!,
  });

  console.log('getBalanceQuery:', getBalanceQuery);

  const logicDescriptionMemo = useMemo(() => {
    console.log(useGetSingleAccountQueryQuery.data, walletAcc);
    if (useGetSingleAccountQueryQuery.isSuccess) {
      if (useGetSingleAccountQueryQuery.data !== undefined) {
        if (useGetSingleAccountQueryQuery.data.Item !== undefined) {
          if (
            useGetSingleAccountQueryQuery.data!.Item.ownerDescription !==
            undefined
          ) {
            if (
              useGetSingleAccountQueryQuery.data!.Item.ownerDescription.length >
              0
            ) {
              return useGetSingleAccountQueryQuery.data!.Item.ownerDescription;
            }
          }
        }
      }
    }
    return ' Mathematics may not teach us how to add love or subtract hate, but it gives us every reason to hope that every problem has a solution.  -Anonymous';
  }, [useGetSingleAccountQueryQuery, walletAcc]);

  const chainName = useMemo(() => {
    if (chainId !== undefined) {
      const chainIdSupportedArr = chainIdNetworks.filter((el: any) => {
        return el.chainId === parseInt(chainId, 10);
      });
      if (chainIdSupportedArr.length > 0) {
        return chainIdSupportedArr[0].name;
      }
    }
    return '';
  }, [chainId]);

  const getBalanceMemo = useMemo(() => {
    if (getBalanceQuery.data !== undefined) {
      const getBalanceB = parseFloat(
        ethers.utils.formatEther(getBalanceQuery.data.balance),
        // const balanceFormatted =  BigNumber.toHexString(getBalanceB)
        // return getBalanceB;
      );
      console.log('getBalanceB', getBalanceB);
      return getBalanceB;
    }
    return null;
  }, [getBalanceQuery]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  if (!chainId) {
    if (accountArrArr.length > 0) {
      console.log('Navigate to Array', accountArrArr);
      return (
        <Navigate
          to={`/identity/${chainIdProviderProvider}/${accountArrArr[0]}`}
        />
      );
    }
    return <ModalForIdentNoUseParams />;
  }
  return (
    <Box
      // border={'4px solid red'}
      // borderRadius='15px'
      px="0px"
      display="flex"
      flexDirection="column"
      // align='center'
      w={'100%'}
    >
      {walletAcc !== undefined &&
      walletAcc !== 'undefined' &&
      walletAcc !== '' &&
      walletAcc.length !== 0 ? (
        <Stack
          // border={'4px solid yellow'}
          w={'100%'}
        >
          <Box
            bgImage={bgImage}
            w="100%"
            h="200px"
            bgPosition="0%"
            bgRepeat="repeat"
            position="relative"
            display="flex"
            justifyContent="center"
            mb={{ base: '160px', md: '30px', lg: '60px' }}
            top={'0px'}
            right={'0px'}
            left={'0px'}
            backgroundPosition="center"
            objectFit={'cover'}
            // border={'4px solid blue'}
          />
          <Header chainIdURL={chainId} paramsWalletURL={walletAcc} />
          <Stack
            p={'10px'}
            w={'100%'}
            // border={'4px solid blue'}
          >
            <Box
              borderRadius="15px"
              bg="white"
              p="12px"
              px="24px"
              overflow={'none'}
              w={'100%'}
            >
              {/* <Heading p="12px 5px" mb="0px"> */}
              {/*    <Text fontSize="16px" color='pmpurple.13' fontWeight="bold" align={'left'}> */}
              {/*        Description */}
              {/*    </Text> */}
              {/* </Heading> */}
              <Box
                px="5px"
                // justifyContent={'space-evenly'}
                // alignItems={'flex-start'}
                // alignContent={'space-evenly'}
              >
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color={'pmpurple.13'}
                    fontWeight="400"
                    align={'left'}
                  >
                    {logicDescriptionMemo}
                  </Text>
                </Flex>
              </Box>
            </Box>

            <Box
            // border={'1px solid red'}
            >
              <Stack
                spacing={'10px'}
                direction={{
                  base: 'column',
                  sm: 'column',
                  md: 'column',
                  lg: 'row',
                }}
                align="stretch"
                justify={'space-evenly'}
                // minH={"400px"}
              >
                {/* <Box */}
                {/*  w={{ base: '100%', lg: '38%' }} */}
                {/*  h={'462px'} */}
                {/*  borderRadius="15px" */}
                {/*  bg="white" */}
                {/*  p="16px" */}
                {/*  overflow={'none'} */}
                {/*  whiteSpace={'pre-line'} */}
                {/*  display={{ base: 'none', lg: 'block' }} */}
                {/* > */}
                {/*  <ValidationsReports /> */}
                {/* </Box> */}
                <Box
                  w={{ base: '100%', lg: '380px' }}
                  borderRadius="15px"
                  bg="white"
                  px="16px"
                  py={'28px'}
                  h={'462px'}
                  overflow={'none'}
                  whiteSpace={'break-spaces'}
                >
                  {useGetSingleIdentityBCQueryQuery.isSuccess ? (
                    <AvatarNFI
                      walletAccount={
                        useGetSingleIdentityBCQueryQuery.data!.nfiIdentity!
                          .walletAccount
                      }
                      name={
                        useGetSingleIdentityBCQueryQuery.data!.nfiIdentity!.name.split(
                          '|||',
                        )[0]
                      }
                      nameColor={
                        useGetSingleIdentityBCQueryQuery.data!.nfiIdentity!.name.split(
                          '|||',
                        )[1]
                      }
                      email={
                        useGetSingleIdentityBCQueryQuery.data!.nfiIdentity!.email.split(
                          '|||',
                        )[0]
                      }
                      emailColor={
                        useGetSingleIdentityBCQueryQuery.data!.nfiIdentity!.email.split(
                          '|||',
                        )[1]
                      }
                      profession={
                        useGetSingleIdentityBCQueryQuery.data!.nfiIdentity!.profession.split(
                          '|||',
                        )[0]
                      }
                      professionColor={
                        useGetSingleIdentityBCQueryQuery.data!.nfiIdentity!.profession.split(
                          '|||',
                        )[1]
                      }
                      organization={
                        useGetSingleIdentityBCQueryQuery.data!.nfiIdentity!.organization.split(
                          '|||',
                        )[0]
                      }
                      organizationColor={
                        useGetSingleIdentityBCQueryQuery.data!.nfiIdentity!.organization.split(
                          '|||',
                        )[1]
                      }
                      slogan={
                        useGetSingleIdentityBCQueryQuery.data!.nfiIdentity!.slogan.split(
                          '|||',
                        )[0]
                      }
                      sloganColor={
                        useGetSingleIdentityBCQueryQuery.data!.nfiIdentity!.slogan.split(
                          '|||',
                        )[1]
                      }
                      website={
                        useGetSingleIdentityBCQueryQuery.data!.nfiIdentity!.website.split(
                          '|||',
                        )[0]
                      }
                      websiteColor={
                        useGetSingleIdentityBCQueryQuery.data!.nfiIdentity!.website.split(
                          '|||',
                        )[1]
                      }
                      uniqueYou={
                        useGetSingleIdentityBCQueryQuery.data!.nfiIdentity!.uniqueYou.split(
                          '|||',
                        )[0]
                      }
                      uniqueYouColor={
                        useGetSingleIdentityBCQueryQuery.data!.nfiIdentity!.uniqueYou.split(
                          '|||',
                        )[1]
                      }
                      avatarBG={
                        useGetSingleIdentityBCQueryQuery.data!.nfiIdentity!
                          .bgRGB
                      }
                      originDate={
                        useGetSingleIdentityBCQueryQuery.data!.nfiIdentity!.originDate.toNumber() *
                        1000
                      }
                    />
                  ) : (
                    <Button
                      as={ReachLink}
                      to={'/register'}
                      w={'100%'}
                      bg={'pmpurple.2'}
                      h="10.00rem"
                      // size='lg'
                      borderRadius={'20px'}
                      borderStyle={'4px solid'}
                      borderColor={'pmpurple.6'}
                      textDecoration={'none'}
                      cursor={'pointer'}
                      alignItems={'center'}
                      _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'xl',
                        textDecoration: 'none',
                      }}
                    >
                      <Text
                        p="12px"
                        textAlign={'center'}
                        fontSize="xl"
                        color={'pmpurple.13'}
                        fontWeight="bold"
                        whiteSpace={'pre-wrap'}
                      >
                        NFI will display here, please mint an NFI to your wallet
                        account
                      </Text>
                      <Box
                        position={'absolute'}
                        bottom={'10px'}
                        right={'10px'}
                        color={'pmpurple.13'}
                      >
                        <RiShareForwardLine fontSize={'40px'} />
                      </Box>
                    </Button>
                  )}
                </Box>

                {/* <Stack */}
                {/*  direction={{ */}
                {/*    base: 'column', */}
                {/*    sm: 'column', */}
                {/*    md: 'column', */}
                {/*    lg: 'row', */}
                {/*  }} */}
                {/*  // border={'1px solid blue'} */}
                {/* > */}
                <Flex
                  flexDirection={'column'}
                  w={{ base: '100%', lg: '50%' }}
                  p="16px"
                  // my="24px"
                  // mx={{xl: '32px'}}
                  borderRadius="15px"
                  bg="white"
                  px="24px"
                  h={'462px'}
                  // border={'1px solid red'}
                  flexGrow={1}
                  mr={0}
                >
                  <Box
                    display="flex"
                    // border={'1px solid green'}
                    // borderBottom={'1px solid'}
                    // borderColor={'pmpurple.6'}
                  >
                    <HStack w={'100%'}>
                      <Heading mb="18px">
                        <Flex direction="column">
                          <Text
                            mb={'5px'}
                            fontSize="18px"
                            color={'pmpurple.13'}
                            fontWeight="bold"
                            align={'left'}
                          >
                            {chainName} Ledger
                          </Text>
                          <Text
                            fontSize="15px"
                            color={'pmpurple.13'}
                            fontWeight="400"
                            align={'left'}
                          >
                            PaperMasters protect the Blockchain
                          </Text>
                        </Flex>
                      </Heading>
                      <Spacer />
                      <Box
                        // isDisabled={true}
                        // style={{border: '1px solid #b59eb5'}}
                        p={2}
                        // bg="transparent"
                        color={'pmpurple.13'}
                        border="1px solid"
                        borderColor={'pmpurple.2'}
                        borderRadius="5px"

                        // minHeight={{sm: "200px", md: "100%"}}
                        // RightIcon={<SiEthereum fontSize="14px" />}
                      >
                        <HStack>
                          Icon={<SiEthereum fontSize="14px" />}
                          <Text fontSize="sm" fontWeight="bold">
                            {getBalanceMemo}
                          </Text>
                        </HStack>
                      </Box>
                    </HStack>
                  </Box>
                  <Divider border={'1px solid'} borderColor={'pmpurple.8'} />
                  <AccountLedger
                    chainIdURL={chainId}
                    paramsWalletURL={walletAcc}
                  />
                </Flex>
              </Stack>
            </Box>

            <Flex w={'100%'} flexDirection={'row'}>
              <Box
                h={'462px'}
                w={{ base: '100%', lg: '38%' }}
                borderRadius="15px"
                bg="white"
                p="12px"
                pb={'16px'}
                overflow={'none'}
                whiteSpace={'pre-line'}
                // border={'1px solid yellow'}
              >
                <Box
                  overflow={'none'}
                  whiteSpace={'pre-line'}
                  h={'100%'}
                  // w={'30vW'}
                  // border={'1px solid blue'}
                >
                  <Text
                    mb={'5px'}
                    fontSize="17px"
                    color={'pmpurple.13'}
                    align={'center'}
                  >
                    Site Activity
                  </Text>
                  <Divider border={'1px solid'} borderColor={'pmpurple.8'} />
                  Coming soon...
                </Box>
              </Box>

              <Flex
                flexDirection={'column'}
                // w={{ base: '100%', lg: '50%' }}
                p="16px"
                // my="24px"
                // mx={{xl: '32px'}}
                borderRadius="15px"
                ml={2}
                bg="white"
                px="24px"
                h={'462px'}
                // border={'1px solid red'}
                flexGrow={1}
              >
                <Box
                  display="flex"
                  // border={'1px solid pink'}
                  // borderBottom={'1px solid'}
                  // borderColor={'pmpurple.6'}
                >
                  <HStack
                    w={'100%'}
                    // border={'4px solid red'}
                  >
                    <Heading mb="18px">
                      <Flex direction="column">
                        <Text
                          mb={'5px'}
                          fontSize="18px"
                          color={'pmpurple.13'}
                          fontWeight="bold"
                          align={'left'}
                        >
                          Mentions
                        </Text>
                        <Text
                          fontSize="15px"
                          color={'pmpurple.13'}
                          fontWeight="400"
                          align={'left'}
                        >
                          Give a Mention
                        </Text>
                      </Flex>
                    </Heading>
                    <Spacer />
                    <Button
                      // border={'4px solid blue'}
                      px="6px"
                      py={'4px'}
                      // bg="transparent"
                      color={'pmpurple.13'}
                      border="1px solid"
                      borderColor={'pmpurple.2'}
                      // borderRadius="15px"
                      // minHeight={{sm: "200px", md: "100%"}}
                      onClick={() => {
                        onOpen();
                      }}
                      rightIcon={<AiOutlineComment fontSize="18px" />}
                    >
                      <Text fontSize="sm" fontWeight="bold">
                        Mentions
                      </Text>
                    </Button>
                    <MentionsDrawer
                      chainIdURL={chainId}
                      paramsWalletURL={walletAcc}
                      mentionsFullDisplayWindowBool={false}
                      onOpenOpen={onOpen}
                      isOpenOpen={isOpen}
                      onCloseClose={onClose}
                    />
                  </HStack>
                </Box>
                <Divider border={'1px solid'} borderColor={'pmpurple.8'} />
                <Mentions chainIdURL={chainId} paramsWalletURL={walletAcc} />
              </Flex>
            </Flex>
          </Stack>
        </Stack>
      ) : (
        <ModalForIdentNoUseParams />
      )}
    </Box>
  );
};

export default Identity;
