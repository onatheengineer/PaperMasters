import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Link,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import type { FC } from 'react';
import * as React from 'react';
import { useMemo, useReducer, useRef, useState } from 'react';
import { FaCube } from 'react-icons/fa';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { MdOutlineEmail, MdOutlineReport } from 'react-icons/md';
import { Link as ReachLink } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { postSingleAccountDictionaryDBAction } from '../../../features/accountDB/AccountDBSlice';
import {
  AccountDBInterface,
  ParamsURLInterface,
} from '../../../features/accountDB/AccountDBSlice.types';
import {
  useGetSingleAccountQuery,
  useGetSingleIdentityBCQuery,
} from '../../../features/reactQuery/RTKQuery';
import DrawerComponent from './DrawerComponent';

function initialState(paramsRequestAccountDictionary: any) {
  return {
    ownerName: '',
    ownerEmail: '',
    ownerDescription: '',
    aliasProfileLinks: '',
  };
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'name':
      return { ...state, ownerName: action.payload };
    case 'email':
      return { ...state, ownerEmail: action.payload };
    case 'description':
      return { ...state, ownerDescription: action.payload };
    case 'aliasProfileLinks':
      return { ...state, aliasProfileLinks: action.payload };
    default:
      throw new Error();
  }
}

interface mailToInterface {
  email: string;
  subject: string;
  body: string;
  children: any;
}

export const Mailto: FC<mailToInterface> = ({
  email,
  subject,
  body,
  ...props
}) => {
  return (
    <a href={`mailto:${email}?subject=${subject || ''}&body=${body || ''}`}>
      {props.children}
    </a>
  );
};

export const Header: FC<ParamsURLInterface> = ({
  chainIdURL,
  paramsWalletURL,
}) => {
  const singleNFIReceiptDBDB = useAppSelector(
    (state) => state.accountDB.singleNFIReceiptDB,
  );
  const accountArrArr = useAppSelector((state) => state.accountBC.accountArr);
  const chainIdProviderProvider = useAppSelector(
    (state) => state.accountBC.chainIdProvider,
  );
  const dispatch = useAppDispatch();
  const useGetSingleIdentityBCQueryQuery = useGetSingleIdentityBCQuery({
    chainIdURL: chainIdURL!,
    paramsWalletURL: paramsWalletURL!,
  });
  const useGetSingleAccountQueryQuery = useGetSingleAccountQuery({
    chainIdURL: chainIdURL!,
    paramsWalletURL: paramsWalletURL!,
  });
  const [state, setAccountProfileDictionary] = useReducer(
    reducer,
    useGetSingleAccountQueryQuery.data,
    initialState,
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const submitHandler = () => {
    const accountProfileDictionary: AccountDBInterface = {
      chainId: chainIdURL as any,
      walletAccount: paramsWalletURL as string,
      createDate: null,
      ownerName: state.ownerName,
      ownerEmail: state.ownerEmail,
      ownerDescription: state.ownerDescription,
      socialMediaLinks: state.socialMediaLinks,
      emailValidationNotification: false,
      emailReportNotification: false,
    };
    dispatch(postSingleAccountDictionaryDBAction(accountProfileDictionary));
    onClose();
  };

  const firstField = useRef<HTMLTextAreaElement>(null);
  const [resize, setResize] = useState('horizontal');

  const logicTransactionHashMemo = useMemo(() => {
    if (useGetSingleIdentityBCQueryQuery.isSuccess) {
      return (
        <Text
          fontSize={'16px'}
          color={'pmpurple.13'}
          letterSpacing={'1px'}
          textShadow={'#F7FAFC 0px 0px 10px'}
        >
          Registered Wallet Account
        </Text>
      );
    }
    return (
      <Text
        fontSize={'16px'}
        color={'red.600'}
        letterSpacing={'1px'}
        textShadow={'#F7FAFC 0px 0px 10px'}
      >
        Non-Registered Wallet Account
      </Text>
    );
  }, [paramsWalletURL, useGetSingleIdentityBCQueryQuery]);

  const logicNameMemo = useMemo(() => {
    if (useGetSingleAccountQueryQuery.data !== undefined) {
      if (useGetSingleAccountQueryQuery.data.Item !== undefined) {
        if (useGetSingleAccountQueryQuery.data.Item.ownerName !== undefined) {
          if (useGetSingleAccountQueryQuery.data.Item.ownerName!.length > 0) {
            return useGetSingleAccountQueryQuery.data.Item.ownerName;
          }
        }
      }
    }
    if (useGetSingleIdentityBCQueryQuery.isSuccess) {
      return useGetSingleIdentityBCQueryQuery.data.nfiIdentity!.name.split(
        '|||',
      )[0];
    }
    return paramsWalletURL;
  }, [
    useGetSingleAccountQueryQuery,
    paramsWalletURL,
    useGetSingleIdentityBCQueryQuery,
  ]);

  const logicEmailMemo = useMemo(() => {
    if (useGetSingleAccountQueryQuery.data !== undefined) {
      if (useGetSingleAccountQueryQuery.data.Item !== undefined) {
        if (useGetSingleAccountQueryQuery.data.Item.ownerEmail !== undefined) {
          if (useGetSingleAccountQueryQuery.data.Item.ownerEmail!.length > 0) {
            return (
              <Mailto
                email={useGetSingleAccountQueryQuery.data.Item.ownerEmail!}
                subject="Hello PaperMaster"
                body="Nice to meet you PaperMaster!"
              >
                <MdOutlineEmail fontSize={'20px'} color={'#5c415c'} />
              </Mailto>
            );
          }
        }
      }
    }
    if (useGetSingleIdentityBCQueryQuery.isSuccess) {
      return (
        <Mailto
          email={
            useGetSingleIdentityBCQueryQuery.data.nfiIdentity!.email.split(
              '|||',
            )[0]
          }
          subject="Hello PaperMaster"
          body="Nice to meet you PaperMaster!"
        >
          <MdOutlineEmail fontSize={'20px'} color={'#5c415c'} />
        </Mailto>
      );
    }
    return <MdOutlineEmail fontSize={'20px'} color={'#5c415c'} />;
  }, [
    useGetSingleAccountQueryQuery,
    paramsWalletURL,
    useGetSingleIdentityBCQueryQuery,
  ]);

  return (
    <Flex
      direction={{ base: 'column', sm: 'column', md: 'row' }}
      // w={{ sm: "90%", xl: "95%" }}
      align="center"
      left={'10px'}
      right={'10px'}
      justifyContent={{ sm: 'center', md: 'space-between' }}
      backdropFilter="saturate(100%) blur(50px)"
      position="absolute"
      boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
      border="2px solid "
      borderColor="pmpurple.13"
      p="18px"
      pr={'38px'}
      borderRadius="20px"
      transform={{
        base: 'translateY(5%)',
        sm: 'translateY(5%)',
        md: 'translateY(45%)',
        lg: 'translateY(75%)',
      }}
    >
      {accountArrArr.length !== 0 &&
      accountArrArr[0] === paramsWalletURL &&
      chainIdProviderProvider === chainIdURL &&
      useGetSingleIdentityBCQueryQuery.isSuccess ? (
        <DrawerComponent
          chainIdURL={chainIdURL}
          paramsWalletURL={paramsWalletURL}
        />
      ) : null}

      <Flex
        mb={{ sm: '10px', md: '0px' }}
        direction={{ base: 'column', sm: 'column', md: 'row' }}
        w={{ sm: '100%' }}
        textAlign={{ sm: 'center', md: 'start' }}
        align="center"
        bg={'transparent'}
        // border="2px solid yellow"
        m={'0px'}
        p={'0px'}
      >
        <Avatar
          me={{ md: '22px' }}
          src="" // this is the profile image
          w="90px"
          h="90px"
          mb={'6px'}
          borderRadius="10px"
        />
        <Stack>
          <Flex
            direction="column"
            maxWidth="100%"
            m={'0px'}
            p={'0px'}
            h={'100%'}
            // border="2px solid purple"
          >
            <Box
              // border={'1px solid blue'}
              p={'2px'}
              my={'0px'}
            >
              <HStack spacing={4}>
                <Box
                  // border={'1px solid blue'}
                  pt={'4px'}
                  my={'0px'}
                >
                  <Text
                    fontSize={'18px'}
                    color="pmpurple.13"
                    fontWeight="semibold"
                  >
                    {logicNameMemo}
                  </Text>
                </Box>
                <Box
                  // border={'1px solid blue'}
                  pt={'6px'}
                  my={'0px'}
                >
                  {logicEmailMemo}
                </Box>
              </HStack>
            </Box>
            {/* <SocialMedia /> */}
            <HStack>
              <Link
                as={ReachLink}
                to={`/validate/${chainIdURL}/${paramsWalletURL}`}
              >
                <HStack>
                  <IoMdCheckmarkCircleOutline fontSize={'18px'} />
                  <Text>Validate</Text>
                </HStack>
              </Link>

              <Link
                as={ReachLink}
                to={`/report/${chainIdURL}/${paramsWalletURL}`}
              >
                <HStack>
                  <MdOutlineReport fontSize={'18px'} />
                  <Text>Report</Text>
                </HStack>
              </Link>
            </HStack>
            {/* {logicQRCodeMemo} */}
          </Flex>
        </Stack>
      </Flex>
      <Flex
        align="center"
        direction={{ base: 'column', sm: 'column', md: 'row' }}
        w={{ sm: '100%' }}
        // textAlign={'right'}
        bg={'transparent'}
        // border="2px solid purple"
        m={'0px'}
        p={'0px'}
        maxWidth="100%"
        h="100%"
        justify={'right'}
      >
        <VStack
          direction={'row'}
          justify={'right'}
          spacing={6}
          // border="2px solid purple"
        >
          <Button
            // border="2px solid purple"
            p="0px"
            bg="transparent"
            _hover={{ bg: 'none' }}
          >
            <Flex
              align="right"
              w={'100%'}
              bg="hsla(0,0%,100%,.3)"
              borderRadius="15px"
              justifyContent="right"
              mt={'0px'}
              py="12px"
              px="14px"
              mx={'0px'}
              boxShadow="inset 0 0 1px 1px hsl(0deg 0% 100% / 90%), 0 20px 27px 0 rgb(0 0 0 / 5%)"
              border="1px solid gray.500"
              cursor="pointer"
              _hover={{
                transform: 'translateY(4px)',
                // boxShadow: 'md',
              }}
            >
              <Icon as={FaCube} me="6px" />
              <Text fontSize="sm" color="pmpurple.13" fontWeight="bold">
                {/* TODO: when I click on this button I want it to route me to the registration & validations page */}
                {logicTransactionHashMemo}
              </Text>
            </Flex>
          </Button>
          <HStack spacing={'34px'}>
            {/* <Stack spacing={'0px'} align={'center'}> */}
            {/*    <Text fontWeight={600}>57</Text> */}
            {/*    <Tooltip hasArrow label='Total received Validations from other Blockchain accounts' */}
            {/*             bg='pmpurple.4' color='pmpurple.13'> */}
            {/*        <Text fontSize={'sm'} color={'pmpurple.11'}> */}
            {/*            Validations */}
            {/*        </Text> */}
            {/*    </Tooltip> */}
            {/* </Stack> */}
            {/* <Stack spacing={0} align={'center'}> */}
            {/*    <Text fontWeight={600}>23k</Text> */}
            {/*    <Tooltip hasArrow label='Total MentionsNew about PaperMaster' bg='pmpurple.4' */}
            {/*             color='pmpurple.13'> */}
            {/*        <Text fontSize={'sm'} color={'pmpurple.11'}> */}
            {/*            MentionsNew */}
            {/*        </Text> */}
            {/*    </Tooltip> */}
            {/* </Stack> */}
            //TODO swan image goes here
            <Stack spacing={0} align={'center'}>
              <HStack>
                <Image src="swan3" borderRadius="15px" />
                <Text fontWeight={600}>23k</Text>
              </HStack>
              <Tooltip
                hasArrow
                label="Total received Validations from other Blockchain accounts"
                bg="pmpurple.4"
                color="pmpurple.13"
              >
                <Text fontSize={'sm'} color={'pmpurple.11'}>
                  Validations
                </Text>
              </Tooltip>
            </Stack>
            <Stack spacing={0} align={'center'}>
              <HStack>
                <Image src="swan3" borderRadius="15px" />
                <Text fontWeight={600}>3k</Text>
              </HStack>
              <Tooltip
                hasArrow
                label="Number of Validations PaperMaster has given to other Blockchain accounts"
                bg="pmpurple.4"
                color="pmpurple.13"
              >
                <Text fontSize={'sm'} color={'pmpurple.11'}>
                  Gifted Validations
                </Text>
              </Tooltip>
            </Stack>
          </HStack>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default Header;
