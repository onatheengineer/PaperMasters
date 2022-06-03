import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import type { FC } from 'react';
import * as React from 'react';
import { useMemo, useReducer, useRef, useState } from 'react';
import {
  FaCube,
  FaDiscord,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaReddit,
  FaTwitch,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import { MdOutlineEmail, MdOutlinePeopleOutline } from 'react-icons/md';
import { TbMoodNeutral, TbThumbDown, TbThumbUp } from 'react-icons/tb';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { openseaIcon } from '../../../assets/icons/openseaIcon';
import { postSingleAccountDictionaryDBAction } from '../../../features/accountDB/AccountDBSlice';
import {
  AccountDBInterface,
  ParamsURLInterface,
} from '../../../features/accountDB/AccountDBSlice.types';
import {
  useGetMentionQuery,
  useGetSingleAccountQuery,
  useGetSingleIdentityBCQuery,
} from '../../../features/reactQuery/RTKQuery';
import DrawerComponent from './DrawerComponent';
import SocialMediaHeader from './SocialMediaHeader';

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
  const useGetMentionQueryQuery = useGetMentionQuery({
    chainIdURL,
    paramsWalletURL,
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

  const mentionTally: number[] = useMemo(() => {
    let mentionPositive = 0;
    let mentionNeutral = 0;
    let mentionNegative = 0;

    if (useGetMentionQueryQuery.data !== undefined) {
      useGetMentionQueryQuery.data.Items.map((el) => {
        if (el.radioType === 1) {
          mentionPositive += 1;
        }
        if (el.radioType === 0) {
          mentionNegative += 1;
        }
        if (el.radioType === -1) {
          mentionNeutral += 1;
        }
        return el;
      });
    }

    return [mentionPositive, mentionNeutral, mentionNegative];
  }, [useGetMentionQueryQuery]);

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
        {/* <Avatar */}
        {/*  me={{ md: '22px' }} */}
        {/*  src="" // this is the profile image */}
        {/*  w="90px" */}
        {/*  h="90px" */}
        {/*  mb={'6px'} */}
        {/*  borderRadius="10px" */}
        {/* /> */}
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
              // p={'2px'}
              mb={4}
            >
              <HStack spacing={4} pt={2} mb={0}>
                <Box
                  // border={'1px solid blue'}
                  pl={2}
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
                  my={0}
                >
                  {logicEmailMemo}
                </Box>
              </HStack>
            </Box>
            <HStack>
              <SocialMediaHeader
                label={'linkedin'}
                icon={<FaLinkedinIn />}
                chainIdURL={chainIdURL}
                paramsWalletURL={paramsWalletURL}
              />
              <SocialMediaHeader
                label={'twitter'}
                icon={<FaTwitter />}
                chainIdURL={chainIdURL}
                paramsWalletURL={paramsWalletURL}
              />
              <SocialMediaHeader
                label={'github'}
                icon={<FaGithub />}
                chainIdURL={chainIdURL}
                paramsWalletURL={paramsWalletURL}
              />
              <SocialMediaHeader
                label={'reddit'}
                icon={<FaReddit />}
                chainIdURL={chainIdURL}
                paramsWalletURL={paramsWalletURL}
              />
              <SocialMediaHeader
                label={'discord'}
                icon={<FaDiscord />}
                chainIdURL={chainIdURL}
                paramsWalletURL={paramsWalletURL}
              />
              <SocialMediaHeader
                label={'youtube'}
                icon={<FaYoutube />}
                chainIdURL={chainIdURL}
                paramsWalletURL={paramsWalletURL}
              />
              <SocialMediaHeader
                label={'instagram'}
                icon={<FaInstagram />}
                chainIdURL={chainIdURL}
                paramsWalletURL={paramsWalletURL}
              />
              <SocialMediaHeader
                label={'twitch'}
                icon={<FaTwitch />}
                chainIdURL={chainIdURL}
                paramsWalletURL={paramsWalletURL}
              />
              <SocialMediaHeader
                label={'facebook'}
                icon={<FaFacebook />}
                chainIdURL={chainIdURL}
                paramsWalletURL={paramsWalletURL}
              />
              <SocialMediaHeader
                label={'opensea'}
                icon={<Icon as={openseaIcon} />}
                chainIdURL={chainIdURL}
                paramsWalletURL={paramsWalletURL}
              />
              <SocialMediaHeader
                label={'socialButtonGeneric1'}
                icon={<MdOutlinePeopleOutline />}
                chainIdURL={chainIdURL}
                paramsWalletURL={paramsWalletURL}
              />
              <SocialMediaHeader
                label={'socialButtonGeneric2'}
                icon={<MdOutlinePeopleOutline />}
                chainIdURL={chainIdURL}
                paramsWalletURL={paramsWalletURL}
              />
            </HStack>
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
                {logicTransactionHashMemo}
              </Text>
            </Flex>
          </Button>
          <HStack spacing={'34px'}>
            <Stack spacing={0} align={'center'}>
              <HStack>
                <Text>{mentionTally[0]}</Text>
                <TbThumbUp color={'pmpurple.11'} fontSize={'sm'} />
              </HStack>
              <Tooltip
                hasArrow
                label="Number of Positive Mentions received from fellow Blockchainers"
                bg="pmpurple.4"
                color="pmpurple.13"
              >
                <Text>Positive Mentions</Text>
              </Tooltip>
            </Stack>

            <Stack spacing={0} align={'center'}>
              <HStack>
                <Text>{mentionTally[1]}</Text>
                <TbMoodNeutral color={'pmpurple.11'} fontSize={'sm'} />
              </HStack>
              <Tooltip
                hasArrow
                label="Number of Neutral Mentions received from fellow Blockchainers"
                bg="pmpurple.4"
                color="pmpurple.13"
              >
                <HStack>
                  <Text>Neutral Mentions</Text>
                </HStack>
              </Tooltip>
            </Stack>

            <Stack spacing={0} align={'center'}>
              <HStack>
                <Text>{mentionTally[2]}</Text>
                <TbThumbDown color={'pmpurple.11'} fontSize={'sm'} />
              </HStack>
              <Tooltip
                hasArrow
                label="Number of Negative Mentions received from fellow Blockchainers"
                bg="pmpurple.4"
                color="pmpurple.13"
              >
                <HStack>
                  <Text>Negative Mentions</Text>
                </HStack>
              </Tooltip>
            </Stack>
          </HStack>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default Header;
