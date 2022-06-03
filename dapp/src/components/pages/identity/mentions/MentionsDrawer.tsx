import {
  AspectRatio,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputRightElement,
  Link,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Spacer,
  Stack,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  useStyleConfig,
  VStack,
} from '@chakra-ui/react';
import moment from 'moment';
import * as React from 'react';
import { FC, useEffect, useReducer, useRef, useState } from 'react';
import { AiOutlineComment } from 'react-icons/ai';
import { BsCircleFill } from 'react-icons/bs';
import Sparkle from 'react-sparkle';

import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  postMentionInterface,
  usePostMentionMutation,
} from '../../../../features/reactQuery/RTKQuery';
import Mentions from './Mentions';

interface interfaceMentionsDrawer {
  chainIdURL: string;
  paramsWalletURL: string;
  mentionsFullDisplayWindowBool: boolean;
  isOpenOpen: boolean;
  onCloseClose: () => void;
  onOpenOpen: () => void;
}

export const MentionsDrawer: FC<interfaceMentionsDrawer> = ({
  chainIdURL,
  paramsWalletURL,
  mentionsFullDisplayWindowBool,
  isOpenOpen,
  onCloseClose,
  onOpenOpen,
}) => {
  const [resize, setResize] = useState('horizontal');
  const [messageBody, setMessageBody] = useState<string>('');
  const [radioType, setRadioType] = useState<1 | 0 | -1>(-1);
  const firstField = useRef<HTMLTextAreaElement>(null);
  const accountArrArr = useAppSelector((state) => state.accountBC.accountArr);
  const chainIdProviderProvider = useAppSelector(
    (state) => state.accountBC.chainIdProvider,
  );
  const [postMention, data] = usePostMentionMutation();
  const dateFormated = moment().format('MMM DD YYYY, hh:mm:ss a');

  const dispatch = useAppDispatch();

  const submitMentionsHandler = () => {
    const mentionsSubmitStateDictionary: postMentionInterface = {
      walletAccount: paramsWalletURL as string,
      chainId: chainIdURL,
      fromChainId: chainIdProviderProvider,
      fromWallet: accountArrArr[0],
      messageBody,
      radioType,
      fakeDelete: false,
      replyToMentionId: '',
    };
    postMention(mentionsSubmitStateDictionary);
    setMessageBody('');
    // onCloseClose();
  };

  return (
    // TODO there is a extra scroll bar in this drawer that is not needed
    <Drawer
      size="xl"
      isOpen={isOpenOpen}
      placement="right"
      initialFocusRef={firstField}
      onClose={onCloseClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        {/* this box is supposed to make sparkle work better */}

        <DrawerHeader color="pmpurple.15" borderBottomWidth="1px">
          Mentions
          <Sparkle
            color="#694b69"
            count={15}
            minSize={5}
            maxSize={10}
            overflowPx={0}
            fadeOutSpeed={20}
            flicker={false}
            // newSparkleOnFadeOut={false}
            // flickerSpeed="fast"
          />
        </DrawerHeader>
        <DrawerBody>
          <Box
            // border={'1px solid pink'}
            h={'100%'}
          >
            <Flex h={'100%'} flexDirection={'column'}>
              <Flex flexGrow={1} overflow={'auto'}>
                <Mentions
                  chainIdURL={chainIdURL}
                  paramsWalletURL={paramsWalletURL}
                />
              </Flex>
              <Stack spacing="24px">
                {accountArrArr.length !== 0 &&
                  accountArrArr[0] !== paramsWalletURL && (
                    <Box
                      flex={'max-content'}
                      mt={'18px'}
                      // border={'2px solid blue'}
                      position={'sticky'}
                    >
                      <HStack>
                        <RadioGroup>
                          <Stack direction="row" spacing={5}>
                            <Radio
                              isChecked={radioType === 1}
                              // color='pmpurple.15'
                              // bg={'pmgreen.15'}
                              colorScheme="green"
                              // value='Positive'
                              // value={state.radioType}
                              // value={1}
                              // onClick={() => {
                              //     //state.radioType === 1;
                              // }}
                              onChange={(e) => {
                                setRadioType(1);
                              }}
                            >
                              Positive
                            </Radio>
                            <Radio
                              isChecked={radioType === 0}
                              // color='pmpurple.15'
                              // bg={'red.600'}
                              colorScheme="red"
                              // value={0}
                              // value={state.radioType}
                              // value = {0}
                              onChange={(e) => {
                                setRadioType(0);
                              }}
                            >
                              Negative
                            </Radio>
                            <Radio
                              isChecked={radioType === -1}
                              // color='pmpurple.15'
                              // bg={'pmpurple.6'}
                              colorScheme="blue"
                              // value={state.radioType}
                              // value={'neutral'}
                              onChange={(e) => {
                                setRadioType(-1);
                              }}
                            >
                              Neutral
                            </Radio>
                          </Stack>
                        </RadioGroup>
                      </HStack>
                      <Textarea
                        mt={'0px'}
                        color="pmpurple.13"
                        border={'1px solid'}
                        borderColor={'pmpurple.6'}
                        bg={'pmpurple.2'}
                        h={'100px'}
                        id="message body"
                        ref={firstField}
                        placeholder="Give a Mention"
                        value={messageBody}
                        onChange={(e) => {
                          setMessageBody(e.currentTarget.value);
                        }}
                      />
                    </Box>
                  )}
                {accountArrArr.length !== 0 &&
                  accountArrArr[0] !== paramsWalletURL && (
                    <Box
                      color="pmpurple.15"
                      border={'2px solid'}
                      borderColor={'pmpurple.6'}
                      borderRadius={'5px'}
                      bg={'pmpurple.2'}
                      id="username"
                      mt={'18px'}
                    >
                      <Text
                        p={'14px'}
                        fontSize={'16px'}
                        fontWeight={'bold'}
                        color={'pmpurple.13'}
                      >
                        Please connect your wallet account.
                      </Text>
                    </Box>
                  )}
              </Stack>
            </Flex>
          </Box>
        </DrawerBody>
        <DrawerFooter borderTopWidth="1px">
          <Button
            variant="outline"
            color="pmpurple.12"
            border={'1px solid'}
            borderColor={'pmpurple.6'}
            bg={'pmpurple.2'}
            mr={3}
            onClick={onCloseClose}
          >
            Cancel
          </Button>
          {accountArrArr.length !== 0 &&
          paramsWalletURL !== accountArrArr[0] ? (
            <Button
              color="pmpurple.12"
              border={'1px solid'}
              borderColor={'pmpurple.6'}
              bg={'pmpurple.4'}
              onClick={submitMentionsHandler}
            >
              {' '}
              Submit{' '}
            </Button>
          ) : null}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MentionsDrawer;
