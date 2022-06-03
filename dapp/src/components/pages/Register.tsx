import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import type { FC } from 'react';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import type { ColorChangeHandler, ColorResult } from 'react-color';
import { SketchPicker } from 'react-color';
import { MdOutlineColorLens } from 'react-icons/md';
import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  gasAccBalanceAction,
  gasForMintNFIAction,
  mintNFIAction,
} from '../../features/mintNFI/MintNFISlice';
import { MintingNFIStruct } from '../../features/mintNFI/mintNFISlice.types';
import { useGetSingleIdentityBCQuery } from '../../features/reactQuery/RTKQuery';
import AvatarNFI from '../avatar/AvatarNFI';

const ColorRGBToString = (colorResultRGB: ColorResult) => {
  const colorStringRGB = `rgba(${colorResultRGB.rgb.r}, ${colorResultRGB.rgb.g}, ${colorResultRGB.rgb.b}, ${colorResultRGB.rgb.a})`;
  return colorStringRGB;
};

export const Register: FC = () => {
  const dispatch = useAppDispatch();
  const singleNFIReceiptDBDB = useAppSelector(
    (state) => state.accountDB.singleNFIReceiptDB,
  );
  const chainIdProviderProvider = useAppSelector(
    (state) => state.accountBC.chainIdProvider,
  );
  const accountArrArr = useAppSelector((state) => state.accountBC.accountArr);
  const gasPricePrice = useAppSelector((state) => state.nfi.mintNFI.gasPrice);
  const mintSucceededSucceeded = useAppSelector(
    (state) => state.nfi.mintNFI.mintSucceeded,
  );
  const mintErrErr = useAppSelector((state) => state.nfi.mintNFI.mintErr);
  const accBalanceErrErr = useAppSelector(
    (state) => state.nfi.mintNFI.accBalanceErr,
  );
  const [name, setName] = useState<string | ''>('');
  const [profession, setProfession] = useState<string | ''>('');
  const [email, setEmail] = useState<string | ''>('');
  const [slogan, setSlogan] = useState<string | ''>('');
  const [organization, setOrganization] = useState<string | ''>('');
  const [website, setWebsite] = useState<string | ''>('');
  const [uniqueYou, setUniqueYou] = useState<string | ''>('');
  const useGetSingleIdentityBCQueryQuery = useGetSingleIdentityBCQuery({
    chainIdURL: chainIdProviderProvider!,
    paramsWalletURL: accountArrArr[0]!,
  });
  const defaultColorBG = {
    hex: '#f2eef2',
    rgb: { r: 242, g: 238, b: 242, a: 1 },
    hsl: { h: 300, s: 0.13333333333333283, l: 0.9411764705882353, a: 1 },
  };
  const defaultColorBGWhite = {
    hex: '#FFFFFF',
    rgb: { r: 255, g: 255, b: 255, a: 1 },
    hsl: { h: 0, s: 0, l: 1, a: 1 },
  };
  const defaultColorText = {
    hex: '#694b69',
    rgb: { r: 105, g: 75, b: 105, a: 1 },
    hsl: { h: 300, s: 0.17, l: 0.35, a: 1 },
  };

  const [colorTextName, setColorTextName] =
    useState<ColorResult>(defaultColorText);
  const [colorTextEmail, setColorTextEmail] =
    useState<ColorResult>(defaultColorText);
  const [colorTextProfession, setColorTextProfession] =
    useState<ColorResult>(defaultColorText);
  const [colorTextSlogan, setColorTextSlogan] =
    useState<ColorResult>(defaultColorText);
  const [colorTextOrganization, setColorTextOrganization] =
    useState<ColorResult>(defaultColorText);
  const [colorTextWebsite, setColorTextWebsite] =
    useState<ColorResult>(defaultColorText);
  const [colorTextUniqueYou, setColorTextUniqueYou] =
    useState<ColorResult>(defaultColorText);
  const [bgRGB, setbgRGB] = useState<ColorResult>(defaultColorBGWhite);

  const [whichColorField, setWhichColorField] = useState<string>('');

  const [originDate, setOriginDate] = useState(Date.now());
  console.log(`This is the Date.Now: ${originDate}`);

  const [submitButtonClicked, setSubmitButtonClicked] =
    useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const nameHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  const professionHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setProfession(e.currentTarget.value);
  };
  const emailHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const sloganHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setSlogan(e.currentTarget.value);
  };
  const websiteHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setWebsite(e.currentTarget.value);
  };
  const organizationHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setOrganization(e.currentTarget.value);
  };
  const uniqueYouHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setUniqueYou(e.currentTarget.value);
  };

  const colorChangeHandler: ColorChangeHandler = (colorSelect: ColorResult) => {
    switch (whichColorField) {
      case 'colorBG':
        setbgRGB(colorSelect);
        break;
      case 'name':
        setColorTextName(colorSelect);
        break;
      case 'email':
        setColorTextEmail(colorSelect);
        break;
      case 'profession':
        setColorTextProfession(colorSelect);
        break;
      case 'slogan':
        setColorTextSlogan(colorSelect);
        break;
      case 'organization':
        setColorTextOrganization(colorSelect);
        break;
      case 'website':
        setColorTextWebsite(colorSelect);
        break;
      case 'uniqueYou':
        setColorTextUniqueYou(colorSelect);
        break;
      default:
        break;
    }
    console.table(colorSelect);
  };

  const submitMintHandler = () => {
    const mintPayload: MintingNFIStruct = {
      name: `${name}|||${ColorRGBToString(colorTextName)}`,
      email: `${email}|||${ColorRGBToString(colorTextEmail)}`,
      profession: `${profession}|||${ColorRGBToString(colorTextProfession)}`,
      organization: `${organization}|||${ColorRGBToString(
        colorTextOrganization,
      )}`,
      slogan: `${slogan}|||${ColorRGBToString(colorTextSlogan)}`,
      website: `${website}|||${ColorRGBToString(colorTextWebsite)}`,
      uniqueYou: `${uniqueYou}|||${ColorRGBToString(colorTextUniqueYou)}`,
      bgRGB: `${ColorRGBToString(bgRGB)}`,
    };
    console.table(mintPayload);
    setSubmitButtonClicked(true);
    dispatch(mintNFIAction(mintPayload));
  };

  const estimateGasHandler = () => {
    const mintPayload: MintingNFIStruct = {
      name: `${name}|||${ColorRGBToString(colorTextName)}`,
      email: `${email}|||${ColorRGBToString(colorTextEmail)}`,
      profession: `${profession}|||${ColorRGBToString(colorTextProfession)}`,
      organization: `${organization}|||${ColorRGBToString(
        colorTextOrganization,
      )}`,
      slogan: `${slogan}|||${ColorRGBToString(colorTextSlogan)}`,
      website: `${website}|||${ColorRGBToString(colorTextWebsite)}`,
      uniqueYou: `${uniqueYou}|||${ColorRGBToString(colorTextUniqueYou)}`,
      bgRGB: `${ColorRGBToString(bgRGB)}`,
    };
    dispatch(gasForMintNFIAction(mintPayload));
  };

  useEffect(() => {
    console.log('accountsArr', accountArrArr.length);
    if (accountArrArr.length === 0) {
      dispatch(gasAccBalanceAction());
    }
    if (accountArrArr.length !== 0) {
      estimateGasHandler();
    }
  }, [
    accountArrArr,
    name,
    email,
    profession,
    slogan,
    website,
    organization,
    uniqueYou,
    accountArrArr,
  ]);

  const [modalDisplayTitle, modalDisplayText] = useMemo(() => {
    if (accountArrArr.length === 0) {
      setIsModalOpen(true);
      return [
        'Connect Wallet Account for Access',
        'Please use MetaMask or WalletConnect to connect your wallet.',
      ];
    }
    if (useGetSingleIdentityBCQueryQuery.isSuccess) {
      setIsModalOpen(true);
      return [
        'You have already Minted',
        <span>
          Connected wallet account is already registered, each wallet account
          can have only one identity. <br />
          <br /> In the future, you will be able to mint an NFI for each
          contract that you own.
        </span>,
      ];
    }
    if (mintSucceededSucceeded === 'failed') {
      setIsModalOpen(true);
      return [
        'Minting failed',
        <span>
          {' '}
          Noooo, what happened! Please email Ramona with the details @
          ramonajenny.n@gmail.com.
        </span>,
      ];
    }
    if (mintSucceededSucceeded === 'succeeded') {
      setIsModalOpen(true);
      return [
        ' Minted Successful!',
        'You did it! You are now a registered PaperMaster, please navigate to your Identity page and update your portfolio.',
      ];
    }
    if (accBalanceErrErr.length > 0) {
      setIsModalOpen(true);
      return ['Account Balance Error', accBalanceErrErr];
    }
    // if (statusBool === true) {
    //     setIsModalOpen(true);
    //     return ([" Minted Successful!", 'You did it! You are now a registered PaperMaster, please navigate to your Identity page and update your portfolio.'])
    // };
    setIsModalOpen(false);
    return [null, null];
  }, [
    accountArrArr,
    singleNFIReceiptDBDB,
    useGetSingleIdentityBCQueryQuery,
    mintSucceededSucceeded,
  ]);

  if (mintSucceededSucceeded === 'succeeded') {
    return (
      <Navigate to={`/identity/${chainIdProviderProvider}/${accountArrArr}`} />
    );
  }
  if (useGetSingleIdentityBCQueryQuery.isSuccess) {
    return (
      <Navigate to={`/identity/${chainIdProviderProvider}/${accountArrArr}`} />
    );
  }
  return (
    <Box
      h={'100%'}
      p={[0, 1, 20]}
      // border={'2px solid red'}
    >
      <Flex
        h={{ base: 'auto', md: '100%' }}
        direction={{ base: 'column', md: 'row' }}
        // border={'2px solid blue'}
        justifyContent={'space-evenly'}
        alignItems={'flex-center'}
        alignContent={'space-evenly'}
        gap={6}
      >
        <VStack
          w={'full'}
          py={8}
          px={10}
          bg={'pmpurple.1'}
          borderRadius="15px"
          border={'4px solid'}
          borderColor={'pmpurple.12'}
        >
          <VStack
            alignItems={'center'}
            // border={'2px solid green'}
          >
            <Heading color={'pmpurple.13'} size="xl">
              Mint PaperMaster NFI
            </Heading>
            <Text color={'pmpurple.13'} align="center" fontWeight="medium">
              PaperMaster Identities are permanent Blockchain PaperMaster
              Non-Fungible-Identity, future changes require additional minting,
              please proofread! Only one NFI per account. If you are minting
              your company, please make sure you use your company's wallet
              account.
            </Text>
            <Divider color={'pmpurple.8'} />
            <SimpleGrid columns={1} columnGap={1} rowGap={8} w={'full'}>
              <GridItem colSpan={1}>
                <Popover>
                  <PopoverTrigger>
                    <Button
                      w={'100%'}
                      mt={'32px'}
                      bg={bgRGB.hex}
                      h="2.00rem"
                      size="mg"
                      rounded={'md'}
                      borderStyle={'solid'}
                      border={'1px'}
                      borderColor={'pmpurple.4'}
                      _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                      }}
                      onClick={() => {
                        setWhichColorField('colorBG');
                      }}
                    >
                      <Text px={'20px'} color={'pmpurple.10'}>
                        {' '}
                        Set NFI Background Color{' '}
                      </Text>
                      {/* <MdOutlineColorLens fontSize={'20px'} color={"#9c7e9c"}/> */}
                      <InputRightElement
                        m="3px"
                        textAlign={'center'}
                        children={
                          <Button
                            bg="pmpurple.9"
                            size="xs"
                            onClick={() => {
                              setbgRGB(defaultColorBG);
                            }}
                          >
                            {' '}
                            Reset Color
                          </Button>
                        }
                      />
                    </Button>
                  </PopoverTrigger>
                  <Portal>
                    <PopoverContent
                      bg="transparent"
                      border={'1px'}
                      w={'50px'}
                      p={'0px'}
                      m={'0px'}
                      h={'50px'}
                    >
                      <PopoverBody>
                        <Box position={'absolute'} zIndex={'2'}>
                          <SketchPicker
                            color={bgRGB.rgb}
                            onChange={colorChangeHandler}
                            onSwatchHover={(colorHover: any) => {
                              console.log(colorHover);
                            }}
                          />
                        </Box>
                      </PopoverBody>
                    </PopoverContent>
                  </Portal>
                </Popover>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl isRequired>
                  <FormLabel htmlFor="name" color={'pmpurple.13'} mb={'2px'}>
                    Name
                  </FormLabel>
                  <InputGroup size="md">
                    <Input
                      focusBorderColor="pmpurple.9"
                      borderColor={'pmpurple.4'}
                      id="name"
                      pl={'62px'}
                      placeholder="name, company"
                      isDisabled={submitButtonClicked}
                      onChange={nameHandler}
                      color={'pmpurple.15'}
                    />
                    <InputRightAddon
                      p="0"
                      borderColor={'pmpurple.4'}
                      bg={'pmpurple.3'}
                      children={
                        <Button
                          size="xs"
                          color={'pmpurple.10'}
                          onClick={() => {
                            setColorTextName(defaultColorText);
                          }}
                        >
                          {' '}
                          Reset Color
                        </Button>
                      }
                    />
                    <InputLeftElement width="3.5rem">
                      <Popover>
                        <PopoverTrigger>
                          <Button
                            // w={'100%'}
                            borderStyle={'solid'}
                            border={'1px'}
                            borderColor={'pmpurple.13'}
                            m={'4px'}
                            bg={colorTextName.hex}
                            h="1.75rem"
                            size="sm"
                            rounded={'md'}
                            _hover={{
                              transform: 'translateY(-2px)',
                              boxShadow: 'lg',
                            }}
                            onClick={() => {
                              setWhichColorField('name');
                            }}
                          >
                            <MdOutlineColorLens fontSize={'20px'} />
                          </Button>
                        </PopoverTrigger>

                        <Portal>
                          <PopoverContent
                            bg="transparent"
                            border={'1px'}
                            w={'50px'}
                            p={'0px'}
                            m={'0px'}
                            h={'50px'}
                          >
                            <PopoverBody>
                              <Box position={'absolute'} zIndex={'2'}>
                                <SketchPicker
                                  color={colorTextName.rgb}
                                  onChange={colorChangeHandler}
                                  onSwatchHover={(colorHover: any) => {
                                    console.log(colorHover);
                                  }}
                                />
                              </Box>
                            </PopoverBody>
                          </PopoverContent>
                        </Portal>
                      </Popover>
                    </InputLeftElement>
                  </InputGroup>

                  <FormErrorMessage>Field is required.</FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl isRequired>
                  <FormLabel htmlFor="email" color={'pmpurple.13'} mb={'2px'}>
                    Email
                  </FormLabel>
                  <InputGroup size="md">
                    <Input
                      focusBorderColor="pmpurple.9"
                      borderColor={'pmpurple.4'}
                      id="email"
                      pl={'62px'}
                      placeholder="email"
                      isDisabled={submitButtonClicked}
                      onChange={emailHandler}
                      color={'pmpurple.15'}
                    />
                    <InputRightAddon
                      p="0"
                      borderColor={'pmpurple.4'}
                      bg={'pmpurple.3'}
                      children={
                        <Button
                          size="xs"
                          color={'pmpurple.10'}
                          onClick={() => {
                            setColorTextEmail(defaultColorText);
                          }}
                        >
                          {' '}
                          Reset Color
                        </Button>
                      }
                    />
                    <InputLeftElement width="3.5rem">
                      <Popover>
                        <PopoverTrigger>
                          <Button
                            // w={'100%'}
                            borderStyle={'solid'}
                            border={'1px'}
                            borderColor={'pmpurple.13'}
                            m={'4px'}
                            bg={colorTextEmail.hex}
                            h="1.75rem"
                            size="sm"
                            rounded={'md'}
                            _hover={{
                              transform: 'translateY(-2px)',
                              boxShadow: 'lg',
                            }}
                            onClick={() => {
                              setWhichColorField('email');
                            }}
                          >
                            <MdOutlineColorLens fontSize={'20px'} />
                          </Button>
                        </PopoverTrigger>

                        <Portal>
                          <PopoverContent
                            bg="transparent"
                            border={'1px'}
                            w={'50px'}
                            p={'0px'}
                            m={'0px'}
                            h={'50px'}
                          >
                            <PopoverBody>
                              <Box position={'absolute'} zIndex={'2'}>
                                <SketchPicker
                                  color={colorTextEmail.rgb}
                                  onChange={colorChangeHandler}
                                  onSwatchHover={(colorHover: any) => {
                                    console.log(colorHover);
                                  }}
                                />
                              </Box>
                            </PopoverBody>
                          </PopoverContent>
                        </Portal>
                      </Popover>
                    </InputLeftElement>
                  </InputGroup>
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel
                    color={'pmpurple.13'}
                    mb={'2px'}
                    htmlFor="profession"
                  >
                    Profession
                  </FormLabel>
                  <InputGroup size="md">
                    <Input
                      focusBorderColor="pmpurple.9"
                      id="profession"
                      pl={'62px'}
                      placeholder="profession"
                      isDisabled={submitButtonClicked}
                      onChange={professionHandler}
                      color={'pmpurple.15'}
                    />
                    <InputRightAddon
                      p="0"
                      borderColor={'pmpurple.4'}
                      bg={'pmpurple.3'}
                      children={
                        <Button
                          size="xs"
                          color={'pmpurple.10'}
                          onClick={() => {
                            setColorTextProfession(defaultColorText);
                          }}
                        >
                          {' '}
                          Reset Color
                        </Button>
                      }
                    />
                    <InputLeftElement width="3.5rem">
                      <Popover>
                        <PopoverTrigger>
                          <Button
                            // w={'100%'}
                            borderStyle={'solid'}
                            border={'1px'}
                            borderColor={'pmpurple.13'}
                            m={'4px'}
                            bg={colorTextProfession.hex}
                            h="1.75rem"
                            size="sm"
                            rounded={'md'}
                            _hover={{
                              transform: 'translateY(-2px)',
                              boxShadow: 'lg',
                            }}
                            onClick={() => {
                              setWhichColorField('profession');
                            }}
                          >
                            <MdOutlineColorLens fontSize={'20px'} />
                          </Button>
                        </PopoverTrigger>

                        <Portal>
                          <PopoverContent
                            bg="transparent"
                            border={'1px'}
                            w={'50px'}
                            p={'0px'}
                            m={'0px'}
                            h={'50px'}
                          >
                            <PopoverBody>
                              <Box position={'absolute'} zIndex={'2'}>
                                <SketchPicker
                                  color={colorTextProfession.rgb}
                                  onChange={colorChangeHandler}
                                  onSwatchHover={(colorHover: any) => {
                                    console.log(colorHover);
                                  }}
                                />
                              </Box>
                            </PopoverBody>
                          </PopoverContent>
                        </Portal>
                      </Popover>
                    </InputLeftElement>
                  </InputGroup>
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel color={'pmpurple.13'} mb={'2px'} htmlFor="slogan">
                    Slogan
                  </FormLabel>
                  <InputGroup size="md">
                    <Input
                      focusBorderColor="pmpurple.9"
                      id="slogan"
                      pl={'62px'}
                      placeholder="slogan"
                      isDisabled={submitButtonClicked}
                      onChange={sloganHandler}
                      color={'pmpurple.15'}
                    />
                    <InputRightAddon
                      p="0"
                      borderColor={'pmpurple.4'}
                      bg={'pmpurple.3'}
                      children={
                        <Button
                          size="xs"
                          color={'pmpurple.10'}
                          onClick={() => {
                            setColorTextSlogan(defaultColorText);
                          }}
                        >
                          {' '}
                          Reset Color
                        </Button>
                      }
                    />
                    <InputLeftElement width="3.5rem">
                      <Popover>
                        <PopoverTrigger>
                          <Button
                            // w={'100%'}
                            borderStyle={'solid'}
                            border={'1px'}
                            borderColor={'pmpurple.13'}
                            m={'4px'}
                            bg={colorTextSlogan.hex}
                            h="1.75rem"
                            size="sm"
                            rounded={'md'}
                            _hover={{
                              transform: 'translateY(-2px)',
                              boxShadow: 'lg',
                            }}
                            onClick={() => {
                              setWhichColorField('slogan');
                            }}
                          >
                            <MdOutlineColorLens fontSize={'20px'} />
                          </Button>
                        </PopoverTrigger>

                        <Portal>
                          <PopoverContent
                            bg="transparent"
                            border={'1px'}
                            w={'50px'}
                            p={'0px'}
                            m={'0px'}
                            h={'50px'}
                          >
                            <PopoverBody>
                              <Box position={'absolute'} zIndex={'2'}>
                                <SketchPicker
                                  color={colorTextSlogan.rgb}
                                  onChange={colorChangeHandler}
                                  onSwatchHover={(colorHover: any) => {
                                    console.log(colorHover);
                                  }}
                                />
                              </Box>
                            </PopoverBody>
                          </PopoverContent>
                        </Portal>
                      </Popover>
                    </InputLeftElement>
                  </InputGroup>
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel
                    color={'pmpurple.13'}
                    mb={'2px'}
                    htmlFor="organization"
                  >
                    Organization
                  </FormLabel>
                  <InputGroup size="md">
                    <Input
                      focusBorderColor="pmpurple.9"
                      id="organization"
                      pl={'62px'}
                      placeholder="organization"
                      isDisabled={submitButtonClicked}
                      onChange={organizationHandler}
                      color={'pmpurple.15'}
                    />
                    <InputRightAddon
                      p="0"
                      borderColor={'pmpurple.4'}
                      bg={'pmpurple.3'}
                      children={
                        <Button
                          size="xs"
                          color={'pmpurple.10'}
                          onClick={() => {
                            setColorTextOrganization(defaultColorText);
                          }}
                        >
                          {' '}
                          Reset Color
                        </Button>
                      }
                    />
                    <InputLeftElement width="3.5rem">
                      <Popover>
                        <PopoverTrigger>
                          <Button
                            // w={'100%'}
                            borderStyle={'solid'}
                            border={'1px'}
                            borderColor={'pmpurple.13'}
                            m={'4px'}
                            bg={colorTextOrganization.hex}
                            h="1.75rem"
                            size="sm"
                            rounded={'md'}
                            _hover={{
                              transform: 'translateY(-2px)',
                              boxShadow: 'lg',
                            }}
                            onClick={() => {
                              setWhichColorField('organization');
                            }}
                          >
                            <MdOutlineColorLens fontSize={'20px'} />
                          </Button>
                        </PopoverTrigger>

                        <Portal>
                          <PopoverContent
                            bg="transparent"
                            border={'1px'}
                            w={'50px'}
                            p={'0px'}
                            m={'0px'}
                            h={'50px'}
                          >
                            <PopoverBody>
                              <Box position={'absolute'} zIndex={'2'}>
                                <SketchPicker
                                  color={colorTextOrganization.rgb}
                                  onChange={colorChangeHandler}
                                  onSwatchHover={(colorHover: any) => {
                                    console.log(colorHover);
                                  }}
                                />
                              </Box>
                            </PopoverBody>
                          </PopoverContent>
                        </Portal>
                      </Popover>
                    </InputLeftElement>
                  </InputGroup>
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel color={'pmpurple.13'} mb={'2px'} htmlFor="website">
                    website
                  </FormLabel>
                  <InputGroup size="md">
                    <Input
                      focusBorderColor="pmpurple.9"
                      id="website"
                      pl={'62px'}
                      placeholder="website"
                      isDisabled={submitButtonClicked}
                      onChange={websiteHandler}
                      color={'pmpurple.15'}
                    />
                    <InputRightAddon
                      p="0"
                      borderColor={'pmpurple.4'}
                      bg={'pmpurple.3'}
                      children={
                        <Button
                          size="xs"
                          color={'pmpurple.10'}
                          onClick={() => {
                            setColorTextWebsite(defaultColorText);
                          }}
                        >
                          {' '}
                          Reset Color
                        </Button>
                      }
                    />
                    <InputLeftElement width="3.5rem">
                      <Popover>
                        <PopoverTrigger>
                          <Button
                            // w={'100%'}
                            borderStyle={'solid'}
                            border={'1px'}
                            borderColor={'pmpurple.13'}
                            m={'4px'}
                            bg={colorTextWebsite.hex}
                            h="1.75rem"
                            size="sm"
                            rounded={'md'}
                            _hover={{
                              transform: 'translateY(-2px)',
                              boxShadow: 'lg',
                            }}
                            onClick={() => {
                              setWhichColorField('website');
                            }}
                          >
                            <MdOutlineColorLens fontSize={'20px'} />
                          </Button>
                        </PopoverTrigger>

                        <Portal>
                          <PopoverContent
                            bg="transparent"
                            border={'1px'}
                            w={'50px'}
                            p={'0px'}
                            m={'0px'}
                            h={'50px'}
                          >
                            <PopoverBody>
                              <Box position={'absolute'} zIndex={'2'}>
                                <SketchPicker
                                  color={colorTextWebsite.rgb}
                                  onChange={colorChangeHandler}
                                  onSwatchHover={(colorHover: any) => {
                                    console.log(colorHover);
                                  }}
                                />
                              </Box>
                            </PopoverBody>
                          </PopoverContent>
                        </Portal>
                      </Popover>
                    </InputLeftElement>
                  </InputGroup>
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel
                    color={'pmpurple.13'}
                    mb={'2px'}
                    htmlFor="uniqueYou"
                  >
                    Your Uniqueness
                  </FormLabel>
                  <InputGroup size="md">
                    <Input
                      focusBorderColor="pmpurple.9"
                      id="uniqueYou"
                      pl={'62px'}
                      placeholder="unique you, anything goes here"
                      isDisabled={submitButtonClicked}
                      onChange={uniqueYouHandler}
                      color={'pmpurple.15'}
                      mb={'18px'}
                    />
                    <InputRightAddon
                      p="0"
                      borderColor={'pmpurple.4'}
                      bg={'pmpurple.3'}
                      children={
                        <Button
                          size="xs"
                          color={'pmpurple.10'}
                          onClick={() => {
                            setColorTextUniqueYou(defaultColorText);
                          }}
                        >
                          {' '}
                          Reset Color
                        </Button>
                      }
                    />
                    <InputLeftElement width="3.5rem">
                      <Popover>
                        <PopoverTrigger>
                          <Button
                            // w={'100%'}
                            borderStyle={'solid'}
                            border={'1px'}
                            borderColor={'pmpurple.13'}
                            m={'4px'}
                            bg={colorTextUniqueYou.hex}
                            h="1.75rem"
                            size="sm"
                            rounded={'md'}
                            _hover={{
                              transform: 'translateY(-2px)',
                              boxShadow: 'lg',
                            }}
                            onClick={() => {
                              setWhichColorField('uniqueYou');
                            }}
                          >
                            <MdOutlineColorLens fontSize={'20px'} />
                          </Button>
                        </PopoverTrigger>

                        <Portal>
                          <PopoverContent
                            bg="transparent"
                            border={'1px'}
                            w={'50px'}
                            p={'0px'}
                            m={'0px'}
                            h={'50px'}
                          >
                            <PopoverBody>
                              <Box position={'absolute'} zIndex={'2'}>
                                <SketchPicker
                                  color={colorTextUniqueYou.rgb}
                                  onChange={colorChangeHandler}
                                  onSwatchHover={(colorHover: any) => {
                                    console.log(colorHover);
                                  }}
                                />
                              </Box>
                            </PopoverBody>
                          </PopoverContent>
                        </Portal>
                      </Popover>
                    </InputLeftElement>
                  </InputGroup>
                </FormControl>
              </GridItem>
              {/* <GridItem colSpan={1}> */}
              {/*    <FormControl> */}
              {/*        <FormLabel color={'pmpurple.13'} mb={'2px'} htmlFor='uniqueYou'>Your */}
              {/*            Country</FormLabel> */}
              {/*        <InputGroup size='md'> */}
              {/*            <Select focusBorderColor='pmpurple.9' id='uniqueYou' pl={'62px'} */}
              {/*                   placeholder='unique you, anything goes here' */}
              {/*                   isDisabled={submitButtonClicked} onChange={uniqueYouHandler} */}
              {/*                   color={'pmpurple.15'} */}
              {/*                   mb={'18px'} */}
              {/*            > */}
              {/*                <option value={'usa'}> United States of America </option> */}
              {/*                <option value={'uae'}> United Arab Emirates </option> */}
              {/*                <option value={'de'}> Germany </option> */}
              {/*            </Select> */}
              {/*            <InputRightAddon p='0' borderColor={"pmpurple.4"} bg={'pmpurple.3'} */}
              {/*                             children={<Button size='xs' color={"pmpurple.10"} */}
              {/*                                               onClick={() => { */}
              {/*                                                   setColorTextUniqueYou(defaultColorText) */}
              {/*                                               }}> Reset</Button>}/> */}
              {/*            <InputLeftElement */}
              {/*                width='3.5rem' */}
              {/*            > */}
              {/*                <Popover> */}
              {/*                    <PopoverTrigger> */}
              {/*                        <Button */}
              {/*                            //w={'100%'} */}
              {/*                            borderStyle={'solid'} */}
              {/*                            border={'1px'} */}
              {/*                            borderColor={'pmpurple.13'} */}
              {/*                            m={'4px'} */}
              {/*                            bg={colorTextUniqueYou.hex} */}
              {/*                            h='1.75rem' */}
              {/*                            size='sm' */}
              {/*                            rounded={'md'} */}
              {/*                            _hover={{ */}
              {/*                                transform: 'translateY(-2px)', */}
              {/*                                boxShadow: 'lg', */}
              {/*                            }} */}
              {/*                            onClick={() => { */}
              {/*                                setWhichColorField('uniqueYou') */}
              {/*                            }} */}
              {/*                        > */}
              {/*                            <MdOutlineColorLens fontSize={'20px'}/> */}

              {/*                        </Button> */}
              {/*                    </PopoverTrigger> */}

              {/*                    <Portal> */}
              {/*                        <PopoverContent */}
              {/*                            bg='transparent' */}
              {/*                            border={'1px'} */}
              {/*                            w={'50px'} */}
              {/*                            p={'0px'} */}
              {/*                            m={'0px'} */}
              {/*                            h={'50px'} */}
              {/*                        > */}
              {/*                            <PopoverBody> */}
              {/*                                <Box position={'absolute'} zIndex={'2'}> */}
              {/*                                    <SketchPicker */}
              {/*                                        color={colorTextUniqueYou.rgb} */}
              {/*                                        onChange={colorChangeHandler} */}
              {/*                                        onSwatchHover={(colorHover: any) => { */}
              {/*                                            console.log(colorHover); */}
              {/*                                        }} */}
              {/*                                    /> */}
              {/*                                </Box> */}
              {/*                            </PopoverBody> */}
              {/*                        </PopoverContent> */}
              {/*                    </Portal> */}
              {/*                </Popover> */}
              {/*            </InputLeftElement> */}
              {/*        </InputGroup> */}
              {/*    </FormControl> */}
              {/* </GridItem> */}
            </SimpleGrid>
          </VStack>
        </VStack>
        <VStack
          w={'full'}
          py={8}
          px={10}
          spacing={10}
          bg={'pmpurple.1'}
          borderRadius="15px"
          border={'4px solid'}
          borderColor={'pmpurple.12'}
        >
          <VStack
            spacing={3}
            // border={'2px solid green'}
          >
            <Heading color={'pmpurple.13'} size="xl">
              Your PaperMaster NFI
            </Heading>
            <Text color={'pmpurple.13'} align="center" fontWeight="medium">
              Below is what your NFI will look like, please make sure you love
              it!
            </Text>
            <Divider color={'pmpurple.8'} />
            <Box p={{ base: 0, xl: 20 }}>
              <AvatarNFI
                name={name}
                nameColor={ColorRGBToString(colorTextName)}
                email={email}
                emailColor={ColorRGBToString(colorTextEmail)}
                profession={profession}
                professionColor={ColorRGBToString(colorTextProfession)}
                organization={organization}
                organizationColor={ColorRGBToString(colorTextOrganization)}
                slogan={slogan}
                sloganColor={ColorRGBToString(colorTextSlogan)}
                website={website}
                websiteColor={ColorRGBToString(colorTextWebsite)}
                uniqueYou={uniqueYou}
                uniqueYouColor={ColorRGBToString(colorTextUniqueYou)}
                avatarBG={ColorRGBToString(bgRGB)}
                originDate={originDate}
                walletAccount={accountArrArr[0]}
              />
              <Stack>
                <Box pt={'120px'}>
                  <Divider color="pmpurple.8" />
                </Box>

                <Center>
                  {name !== '' &&
                  email !== '' &&
                  mintSucceededSucceeded !== 'alreadyMinted' ? (
                    <Button
                      border={'1px solid'}
                      borderColor={'pmpurple.13'}
                      bg={'pmpurple.3'}
                      mt={'20px'}
                      mb={'2px'}
                      _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'md',
                      }}
                      onClick={submitMintHandler}
                      isLoading={submitButtonClicked}
                      px={'12px'}
                      loadingText="Minting"
                      color={'pmpurple.13'}
                      variant="outline"
                    >
                      Submit
                    </Button>
                  ) : (
                    <Modal
                      closeOnOverlayClick={false}
                      blockScrollOnMount={true}
                      isOpen={isModalOpen}
                      onClose={() => {
                        setIsModalOpen(false);
                      }}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader fontWeight="bold" color={'pmpurple.15'}>
                          {modalDisplayTitle}
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                          <Text mb="1rem" color={'pmpurple.15'}>
                            {modalDisplayText}
                            <br />
                            <Text color={'pmpurple.8'}>{mintErrErr}</Text>
                          </Text>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color={'pmpurple.13'}
                            mr={3}
                            onClick={() => {
                              setIsModalOpen(false);
                            }}
                          >
                            Close
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  )}
                </Center>
                <Center>
                  {name !== '' ? (
                    <Box
                      // border={'1px solid'}
                      // borderColor={'pmpurple.13'}
                      // bg={'pmpurple.3'}
                      mt={'20px'}
                      mb={'2px'}
                      px={'6px'}
                      // loadingText='Waiting to get cost estimates for gas'
                      color={'pmpurple.13'}
                    >
                      <Text as="u">Estimated Gas: {gasPricePrice}</Text>
                    </Box>
                  ) : null}
                </Center>
              </Stack>
            </Box>
          </VStack>
        </VStack>
      </Flex>
      <Modal
        motionPreset="slideInBottom"
        closeOnOverlayClick={false}
        blockScrollOnMount={true}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight="bold" color={'pmpurple.15'}>
            {modalDisplayTitle}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text mb="1rem" color={'pmpurple.15'}>
              {modalDisplayText}
              <br />
              <Text color={'gray.100'}>{mintErrErr}</Text>
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              color={'pmpurple.13'}
              mr={3}
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Register;
