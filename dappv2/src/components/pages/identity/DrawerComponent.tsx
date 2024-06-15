import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  HStack,
  Icon,
  Input,
  Stack,
  Textarea,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import type { FC } from 'react';
import * as React from 'react';
import { useEffect, useReducer, useRef } from 'react';
import {
  FaDiscord,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaRegEdit,
  FaTwitch,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import { MdOutlinePeopleOutline } from 'react-icons/md';

import { useAppSelector } from '../../../app/hooks';
import { openseaIcon } from '../../../assets/icons/openseaIcon';
import {
  AccountDBInterface,
  ParamsURLInterface,
} from '../../../features/accountDB/AccountDBSlice.types';
import {
  useGetSingleAccountQuery,
  usePostAccountDictionaryMutation,
  useUpdateAccountDictionaryMutation,
} from '../../../features/reactQuery/RTKQuery';
import { SocialMediaComponent } from './SocialMedia';

const initialState = {
  ownerName: '',
  ownerEmail: '',
  ownerDescription: '',
  linkedin: '',
  twitter: '',
  github: '',
  discord: '',
  youtube: '',
  instagram: '',
  twitch: '',
  facebook: '',
  opensea: '',
  socialButtonGeneric1: '',
  socialButtonGeneric2: '',
};

function initialStateold() {
  return {
    ownerName: '',
    ownerEmail: '',
    ownerDescription: '',
    linkedin: '',
    twitter: '',
    github: '',
    discord: '',
    youtube: '',
    instagram: '',
    twitch: '',
    facebook: '',
    opensea: '',
    socialButtonGeneric1: '',
    socialButtonGeneric2: '',
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
    case 'linkedin':
      return { ...state, linkedin: action.payload };
    case 'twitter':
      return { ...state, twitter: action.payload };
    case 'github':
      return { ...state, github: action.payload };
    case 'discord':
      return { ...state, discord: action.payload };
    case 'youtube':
      return { ...state, youtube: action.payload };
    case 'instagram':
      return { ...state, instagram: action.payload };
    case 'twitch':
      return { ...state, twitch: action.payload };
    case 'facebook':
      return { ...state, facebook: action.payload };
    case 'opensea':
      return { ...state, opensea: action.payload };
    case 'socialButtonGeneric1':
      return { ...state, socialButtonGeneric1: action.payload };
    case 'socialButtonGeneric2':
      return { ...state, socialButtonGeneric2: action.payload };
    default:
      throw new Error();
  }
}

// function Mailto({ email, subject, body, ...props }: any) {
//   return (
//     <a href={`mailto:${email}?subject=${subject || ''}&body=${body || ''}`}>
//       {props.children}
//     </a>
//   );
// }

export const DrawerComponent: FC<ParamsURLInterface> = ({
  chainIdURL,
  paramsWalletURL,
}) => {
  const singleAccountDictionaryDBDB = useAppSelector(
    (state) => state.accountDB.singleAccountDictionaryDB,
  );

  const [postAccountDictionary] = usePostAccountDictionaryMutation();
  const useGetSingleAccountQueryQu = useGetSingleAccountQuery({
    chainIdURL,
    paramsWalletURL,
  });
  const [updateAccountDictionary] = useUpdateAccountDictionaryMutation();

  console.log('useGetSingleAccountQueryQu:', useGetSingleAccountQueryQu);
  // console.log('usePostAccountDictionaryMutationMu:', postAccountDictionary);

  const [state, dispatchAccountProfileDictionary] = useReducer(
    reducer,
    initialState,
    (initialStatein) => {
      return initialState;
    },
  );
  console.log('this is the state in my useReducer:', state);

  useEffect(() => {
    console.log(useGetSingleAccountQueryQu.data);
    if (useGetSingleAccountQueryQu.data !== undefined) {
      dispatchAccountProfileDictionary({
        type: 'name',
        payload: useGetSingleAccountQueryQu.data.Item.ownerName,
      });
      dispatchAccountProfileDictionary({
        type: 'email',
        payload: useGetSingleAccountQueryQu.data.Item.ownerEmail,
      });
      dispatchAccountProfileDictionary({
        type: 'description',
        payload: useGetSingleAccountQueryQu.data.Item.ownerDescription,
      });
      dispatchAccountProfileDictionary({
        type: 'linkedin',
        payload:
          useGetSingleAccountQueryQu.data.Item.socialMediaLinks?.linkedin,
      });
      dispatchAccountProfileDictionary({
        type: 'twitter',
        payload: useGetSingleAccountQueryQu.data.Item.socialMediaLinks?.twitter,
      });
      dispatchAccountProfileDictionary({
        type: 'github',
        payload: useGetSingleAccountQueryQu.data.Item.socialMediaLinks?.github,
      });
      dispatchAccountProfileDictionary({
        type: 'discord',
        payload: useGetSingleAccountQueryQu.data.Item.socialMediaLinks?.discord,
      });
      dispatchAccountProfileDictionary({
        type: 'youtube',
        payload: useGetSingleAccountQueryQu.data.Item.socialMediaLinks?.youtube,
      });
      dispatchAccountProfileDictionary({
        type: 'instagram',
        payload:
          useGetSingleAccountQueryQu.data.Item.socialMediaLinks?.instagram,
      });
      dispatchAccountProfileDictionary({
        type: 'twitch',
        payload: useGetSingleAccountQueryQu.data.Item.socialMediaLinks?.twitch,
      });
      dispatchAccountProfileDictionary({
        type: 'facebook',
        payload:
          useGetSingleAccountQueryQu.data.Item.socialMediaLinks?.facebook,
      });
      dispatchAccountProfileDictionary({
        type: 'opensea',
        payload: useGetSingleAccountQueryQu.data.Item.socialMediaLinks?.opensea,
      });
      dispatchAccountProfileDictionary({
        type: 'socialButtonGeneric1',
        payload:
          useGetSingleAccountQueryQu.data.Item.socialMediaLinks
            ?.socialButtonGeneric1,
      });
      dispatchAccountProfileDictionary({
        type: 'socialButtonGeneric2',
        payload:
          useGetSingleAccountQueryQu.data.Item.socialMediaLinks
            ?.socialButtonGeneric2,
      });
    }
  }, [useGetSingleAccountQueryQu]);

  useEffect(() => {
    console.log(postAccountDictionary);
  }, [postAccountDictionary]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const submitHandler = async () => {
    const accountProfileDictionary: AccountDBInterface = {
      chainId: chainIdURL as string,
      walletAccount: paramsWalletURL as string,
      createDate: singleAccountDictionaryDBDB.createDate,
      ownerName: !state.ownerName ? '' : state.ownerName,
      ownerEmail: !state.ownerEmail ? '' : state.ownerEmail,
      ownerDescription: !state.ownerDescription ? '' : state.ownerDescription,
      socialMediaLinks: {
        linkedin: !state.linkedin ? '' : state.linkedin,
        twitter: !state.twitter ? '' : state.twitter,
        github: !state.github ? '' : state.github,
        instagram: !state.instagram ? '' : state.instagram,
        discord: !state.discord ? '' : state.discord,
        facebook: !state.facebook ? '' : state.facebook,
        twitch: !state.twitch ? '' : state.twitch,
        reddit: !state.reddit ? '' : state.reddit,
        youtube: !state.youtube ? '' : state.youtube,
        opensea: !state.opensea ? '' : state.opensea,
        socialButtonGeneric1: !state.socialButtonGeneric1
          ? ''
          : state.socialButtonGeneric1,
        socialButtonGeneric2: !state.socialButtonGeneric2
          ? ''
          : state.socialButtonGeneric2,
      },
      emailValidationNotification: false,
      emailReportNotification: false,
    };
    console.log(accountProfileDictionary);
    await updateAccountDictionary(accountProfileDictionary);
    onClose();
  };

  const changeSocialHandler = ({
    type,
    payload,
  }: {
    type: string;
    payload: string;
  }): void => {
    dispatchAccountProfileDictionary({
      type,
      payload,
    });

    console.log(type);
    console.log(payload);
  };

  const firstField = useRef<HTMLTextAreaElement>(null);

  if (state === undefined) {
    return null;
  }

  return (
    <Box right={'2px'} top={'2px'} position="absolute">
      <Tooltip
        hasArrow
        label="Edit Account Profile"
        placement={'left'}
        border={'1px solid #694b69'}
        borderRadius={'3px'}
        bg="pmpurple.3"
        color="pmpurple.13"
        m={'-14px'}
      >
        <Button onClick={onOpen} color={'pmpurple.15'} mr={'-6px'} mt={'-4px'}>
          <FaRegEdit />
        </Button>
      </Tooltip>
      <Drawer
        isOpen={isOpen}
        size={'md'}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader color="pmpurple.15" borderBottomWidth="1px">
            Account Profile
          </DrawerHeader>
          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel mb={0} mt={1} color="pmpurple.15" htmlFor="username">
                  Name
                </FormLabel>
                <Input
                  focusBorderColor="pmpurple.9"
                  placeholder={'name'}
                  mb={2}
                  border={'1px solid'}
                  borderColor={'pmpurple.8'}
                  bg={'pmpurple.2'}
                  color="pmpurple.15"
                  value={state.ownerName}
                  id="account Name"
                  onChange={(e) => {
                    dispatchAccountProfileDictionary({
                      type: 'name',
                      payload: e.currentTarget.value,
                    });
                  }}
                />
                <FormLabel mb={0} mt={1} color="pmpurple.15" htmlFor="username">
                  Email
                </FormLabel>
                <Input
                  focusBorderColor="pmpurple.9"
                  placeholder={'email'}
                  mb={3}
                  border={'1px solid'}
                  borderColor={'pmpurple.8'}
                  bg={'pmpurple.2'}
                  color="pmpurple.15"
                  value={state.email}
                  id="email"
                  onChange={(e) => {
                    dispatchAccountProfileDictionary({
                      type: 'email',
                      payload: e.currentTarget.value,
                    });
                  }}
                />
                <Box>
                  {useGetSingleAccountQueryQu.isSuccess}
                  {useGetSingleAccountQueryQu.data !== undefined}
                  <HStack>
                    <SocialMediaComponent
                      placeholder={'linkedin'}
                      valuevalue={
                        useGetSingleAccountQueryQu?.data?.Item.socialMediaLinks
                          ?.linkedin
                      }
                      type={'linkedin'}
                      role={'sociallinkedin'}
                      onChangeSocial={changeSocialHandler}
                      icon={<FaLinkedinIn />}
                    />
                  </HStack>
                  <HStack>
                    <SocialMediaComponent
                      placeholder={'twitter'}
                      valuevalue={
                        useGetSingleAccountQueryQu?.data?.Item.socialMediaLinks
                          ?.twitter
                      }
                      type={'twitter'}
                      role={'socialTwitter'}
                      onChangeSocial={changeSocialHandler}
                      icon={<FaTwitter />}
                    />
                  </HStack>
                  <HStack>
                    <SocialMediaComponent
                      placeholder={'github'}
                      valuevalue={
                        useGetSingleAccountQueryQu?.data?.Item.socialMediaLinks
                          ?.github
                      }
                      type={'github'}
                      role={'socialgithub'}
                      onChangeSocial={changeSocialHandler}
                      icon={<FaGithub />}
                    />
                  </HStack>
                  <HStack>
                    <SocialMediaComponent
                      placeholder={'discord'}
                      valuevalue={
                        useGetSingleAccountQueryQu?.data?.Item.socialMediaLinks
                          ?.discord
                      }
                      type={'discord'}
                      role={'socialdiscord'}
                      onChangeSocial={changeSocialHandler}
                      icon={<FaDiscord />}
                    />
                  </HStack>
                  <HStack>
                    <SocialMediaComponent
                      placeholder={'youtube'}
                      valuevalue={
                        useGetSingleAccountQueryQu?.data?.Item.socialMediaLinks
                          ?.youtube
                      }
                      type={'youtube'}
                      role={'socialyoutube'}
                      onChangeSocial={changeSocialHandler}
                      icon={<FaYoutube />}
                    />
                  </HStack>
                  <HStack>
                    <SocialMediaComponent
                      placeholder={'instagram'}
                      valuevalue={
                        useGetSingleAccountQueryQu?.data?.Item.socialMediaLinks
                          ?.instagram
                      }
                      type={'instagram'}
                      role={'socialinstagram'}
                      onChangeSocial={changeSocialHandler}
                      icon={<FaInstagram />}
                    />
                  </HStack>
                  <HStack>
                    <SocialMediaComponent
                      placeholder={'twitch'}
                      valuevalue={
                        useGetSingleAccountQueryQu?.data?.Item.socialMediaLinks
                          ?.twitch
                      }
                      type={'twitch'}
                      role={'socialtwitch'}
                      onChangeSocial={changeSocialHandler}
                      icon={<FaTwitch />}
                    />
                  </HStack>
                  <HStack>
                    <SocialMediaComponent
                      placeholder={'facebook'}
                      valuevalue={
                        useGetSingleAccountQueryQu?.data?.Item.socialMediaLinks
                          ?.facebook
                      }
                      type={'facebook'}
                      role={'socialfacebook'}
                      onChangeSocial={changeSocialHandler}
                      icon={<FaFacebook />}
                    />
                  </HStack>
                  <HStack>
                    <SocialMediaComponent
                      placeholder={'opensea'}
                      valuevalue={
                        useGetSingleAccountQueryQu?.data?.Item.socialMediaLinks
                          ?.opensea
                      }
                      type={'opensea'}
                      role={'socialopensea'}
                      onChangeSocial={changeSocialHandler}
                      icon={<Icon as={openseaIcon} />}
                    />
                  </HStack>
                  <HStack>
                    <SocialMediaComponent
                      placeholder={'socialButtonGeneric1'}
                      valuevalue={
                        useGetSingleAccountQueryQu?.data?.Item.socialMediaLinks
                          ?.socialButtonGeneric1
                      }
                      type={'socialButtonGeneric1'}
                      role={'socialsocialButtonGeneric1'}
                      onChangeSocial={changeSocialHandler}
                      icon={<MdOutlinePeopleOutline />}
                    />
                  </HStack>
                  <HStack>
                    <SocialMediaComponent
                      placeholder={'socialButtonGeneric2'}
                      valuevalue={
                        useGetSingleAccountQueryQu?.data?.Item.socialMediaLinks
                          ?.socialButtonGeneric2
                      }
                      type={'socialButtonGeneric2'}
                      role={'socialsocialButtonGeneric2'}
                      onChangeSocial={changeSocialHandler}
                      icon={<MdOutlinePeopleOutline />}
                    />
                  </HStack>
                </Box>
                <Box>
                  <FormLabel mb={0} mt={1} color="pmpurple.15" htmlFor="desc">
                    Description
                  </FormLabel>
                  <Textarea
                    focusBorderColor="pmpurple.9"
                    color="pmpurple.13"
                    border={'1px solid'}
                    borderColor={'pmpurple.6'}
                    bg={'pmpurple.2'}
                    h={'400px'}
                    id="desc"
                    ref={firstField}
                    placeholder="Add description"
                    value={state.ownerDescription}
                    onChange={(e) => {
                      dispatchAccountProfileDictionary({
                        type: 'description',
                        payload: e.currentTarget.value,
                      });
                    }}
                  />
                </Box>
              </Box>
            </Stack>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <Button
              variant="outline"
              color="pmpurple.12"
              border={'1px solid'}
              borderColor={'pmpurple.6'}
              bg={'pmpurple.2'}
              mr={3}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              color="pmpurple.12"
              border={'1px solid'}
              borderColor={'pmpurple.6'}
              bg={'pmpurple.4'}
              onClick={submitHandler}
            >
              {' '}
              Submit{' '}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default DrawerComponent;
