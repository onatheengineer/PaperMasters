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
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { gasAccBalanceAction } from '../../../features/mintNFI/MintNFISlice';
import { validateInterface } from '../../../features/reactQuery/RTKQuery';
import ValidateAvatar from '../../avatar/ValidateAvatar';

export const Validate: FC = () => {
  const { chainId, walletAcc } = useParams();
  const dispatch = useAppDispatch();
  const paramsWalletWallet = useAppSelector(
    (state) => state.accountDB.paramsWallet,
  );
  const singleNFIReceiptDBDB = useAppSelector(
    (state) => state.accountDB.singleNFIReceiptDB,
  );
  const addressHasIdentityBoolBool = useAppSelector(
    (state) => state.accountBC.addressHasIdentityBool,
  );
  const getStructBCBC = useAppSelector((state) => state.accountBC.getStructBC);
  const accountArrArr = useAppSelector((state) => state.accountBC.accountArr);
  const mintStatusBCBC = useAppSelector(
    (state) => state.nfi.mintNFI.mintStatusBC,
  );
  const gasPricePrice = useAppSelector((state) => state.nfi.mintNFI.gasPrice);
  const mintSucceededSucceeded = useAppSelector(
    (state) => state.nfi.mintNFI.mintSucceeded,
  );
  const mintErrErr = useAppSelector((state) => state.nfi.mintNFI.mintErr);
  const accBalanceBalance = useAppSelector(
    (state) => state.nfi.mintNFI.accBalance,
  );
  const accBalanceErrErr = useAppSelector(
    (state) => state.nfi.mintNFI.accBalanceErr,
  );
  const addressToTokenBoolBool = useAppSelector(
    (state) => state.accountBC.addressToTokenBool,
  );
  const [giver, setGiver] = useState<string | ''>('');
  const [receiver, setReceiver] = useState<string | ''>('');
  const [comment, setComment] = useState<string | ''>('');
  const [originDate, setOriginDate] = useState(Date.now());
  const defaultColorText = {
    hex: '#694b69',
    rgb: { r: 105, g: 75, b: 105, a: 1 },
    hsl: { h: 300, s: 0.17, l: 0.35, a: 1 },
  };
  const [colorTextGiver, setColorTextGiver] =
    useState<ColorResult>(defaultColorText);
  const [colorTextReceiver, setColorTextReceiver] =
    useState<ColorResult>(defaultColorText);
  const [colorTextComment, setColorTextComment] =
    useState<ColorResult>(defaultColorText);
  const [whichColorField, setWhichColorField] = useState<string>('');
  const [submitButtonClicked, setSubmitButtonClicked] =
    useState<boolean>(false);
  const giverHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setGiver(e.currentTarget.value);
  };
  const receiverHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setReceiver(e.currentTarget.value);
  };
  const commentHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setComment(e.currentTarget.value);
  };
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const colorChangeHandler: ColorChangeHandler = (colorSelect: ColorResult) => {
    switch (whichColorField) {
      case 'giver':
        setColorTextGiver(colorSelect);
        break;
      case 'receiver':
        setColorTextReceiver(colorSelect);
        break;
      case 'comment':
        setColorTextComment(colorSelect);
        break;
      default:
        break;
    }
    console.table(colorSelect);
  };
  const ColorRGBToString = (colorResultRGB: ColorResult) => {
    const colorStringRGB = `rgba(${colorResultRGB.rgb.r}, ${colorResultRGB.rgb.g}, ${colorResultRGB.rgb.b}, ${colorResultRGB.rgb.a})`;
    return colorStringRGB;
  };
  const submitMintHandler = () => {
    const validatePayload: validateInterface = {
      giver: `${giver}|||${ColorRGBToString(colorTextGiver)}`,
      receiver: `${receiver}|||${ColorRGBToString(colorTextReceiver)}`,
      comment: `${comment}|||${ColorRGBToString(colorTextComment)}`,
      originDate,
    };
    console.table(validatePayload);
    setSubmitButtonClicked(true);
  };
  const estimateGasHandler = () => {
    const estimateGasPayload: validateInterface = {
      giver: `${giver}|||${ColorRGBToString(colorTextGiver)}`,
      receiver: `${receiver}|||${ColorRGBToString(colorTextReceiver)}`,
      comment: `${comment}|||${ColorRGBToString(colorTextComment)}`,
      originDate,
    };
    // dispatch(gasForMintNFIAction(estimateGasPayload));
  };
  useEffect(() => {
    console.log('accountsArr', accountArrArr.length);
    if (accountArrArr.length === 0) {
      dispatch(gasAccBalanceAction());
    }
  }, [accountArrArr]);
  useEffect(() => {
    if (accountArrArr.length !== 0) {
      estimateGasHandler();
    }
  }, [accountArrArr, giver, receiver, comment]);
  const [modalDisplayTitle, modalDisplayText] = useMemo(() => {
    if (accountArrArr.length === 0) {
      setIsModalOpen(true);
      return [
        'Connect Wallet Account for Access',
        'Please use MetaMask or WalletConnect to connect your wallet.',
      ];
    }
    if (addressHasIdentityBoolBool && mintSucceededSucceeded === 'idle') {
      setIsModalOpen(true);
      return [
        'You have already Minted',
        <span>
          Connected wallet account is already registered, each wallet account
          can have only one identity.
          <br />
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
    // }

    setIsModalOpen(false);
    return [null, null];
  }, [accountArrArr]);

  return (
    <Box
      h={'100%'}
      p={[0, 1, 10]}
      // border={'2px solid red'}
    >
      <Flex
        h={{ base: 'auto', md: '100%' }}
        direction={{ base: 'column', xl: 'row' }}
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
              Mint PaperMaster Validation
            </Heading>
            <Text color={'pmpurple.13'} align="center" fontWeight="medium">
              PaperMaster Validations are Non-Fungible Tokens permanently
              attached to wallet accounts and living on Blockchain. You can only
              Validate this account once.
            </Text>
            <Divider color={'pmpurple.8'} />
            <SimpleGrid columns={1} columnGap={1} rowGap={8} w={'full'}>
              <GridItem colSpan={1}>
                <FormControl isRequired>
                  <FormLabel htmlFor="giver" color={'pmpurple.13'} mb={'2px'}>
                    Giver
                  </FormLabel>
                  <InputGroup size="md">
                    <Input
                      focusBorderColor="pmpurple.9"
                      borderColor={'pmpurple.4'}
                      id="giver"
                      pl={'62px'}
                      fontSize={'13px'}
                      placeholder={`${accountArrArr}`}
                      isDisabled={true}
                      // isDisabled={submitButtonClicked}
                      onChange={giverHandler}
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
                            setColorTextGiver(defaultColorText);
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
                            bg={colorTextGiver.hex}
                            h="1.75rem"
                            size="sm"
                            rounded={'md'}
                            _hover={{
                              transform: 'translateY(-2px)',
                              boxShadow: 'lg',
                            }}
                            onClick={() => {
                              setWhichColorField('giver');
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
                                  color={colorTextGiver.rgb}
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
                  <FormLabel
                    htmlFor="receiver"
                    color={'pmpurple.13'}
                    mb={'2px'}
                  >
                    Receiver
                  </FormLabel>
                  <InputGroup size="md">
                    <Input
                      focusBorderColor="pmpurple.9"
                      borderColor={'pmpurple.4'}
                      id="receiver"
                      pl={'62px'}
                      fontSize={'13px'}
                      placeholder={`${walletAcc}`}
                      isDisabled={true}
                      onChange={receiverHandler}
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
                            setColorTextReceiver(defaultColorText);
                          }}
                        >
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
                            bg={colorTextReceiver.hex}
                            h="1.75rem"
                            size="sm"
                            rounded={'md'}
                            _hover={{
                              transform: 'translateY(-2px)',
                              boxShadow: 'lg',
                            }}
                            onClick={() => {
                              setWhichColorField('receiver');
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
                                  color={colorTextReceiver.rgb}
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
                  <FormLabel color={'pmpurple.13'} mb={'2px'} htmlFor="comment">
                    Comment
                  </FormLabel>
                  <InputGroup size="md">
                    <Input
                      focusBorderColor="pmpurple.9"
                      id="comment"
                      pl={'62px'}
                      placeholder="comment"
                      isDisabled={submitButtonClicked}
                      onChange={commentHandler}
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
                            setColorTextComment(defaultColorText);
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
                            bg={colorTextComment.hex}
                            h="1.75rem"
                            size="sm"
                            rounded={'md'}
                            _hover={{
                              transform: 'translateY(-2px)',
                              boxShadow: 'lg',
                            }}
                            onClick={() => {
                              setWhichColorField('comment');
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
                                  color={colorTextComment.rgb}
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
              PaperMaster Validation
            </Heading>
            <Text color={'pmpurple.13'} align="center" fontWeight="medium">
              Below is what your Validation will look like, please make sure you
              love it!
            </Text>
            <Divider color={'pmpurple.8'} />
            <Box p={{ base: 0, xl: 20 }}>
              <ValidateAvatar
                giver={giver}
                giverColor={ColorRGBToString(colorTextGiver)}
                receiver={receiver}
                receiverColor={ColorRGBToString(colorTextReceiver)}
                comment={comment}
                commentColor={ColorRGBToString(colorTextComment)}
                originDate={originDate}
              />
              <Stack>
                <Box
                  pt={'100px'}
                  // border={'1px solid'}
                  // borderColor={'pmpurple.13'}
                >
                  <Divider color="pmpurple.8" />
                </Box>

                <Center>
                  {/* && accBalanceErr !== "" */}
                  {giver !== '' ? (
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
                {giver !== '' ? (
                  <Center>
                    <Box
                      border={'1px solid'}
                      borderColor={'pmpurple.13'}
                      bg={'pmpurple.3'}
                      mt={'20px'}
                      mb={'2px'}
                      px={'6px'}
                      // loadingText='Waiting to get cost estimates for gas'
                      color={'pmpurple.13'}
                    >
                      <Text as="u">Estimated Gas: {gasPricePrice}</Text>
                    </Box>
                  </Center>
                ) : null}
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

export default Validate;
