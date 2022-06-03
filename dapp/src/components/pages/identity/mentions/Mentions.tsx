import {
  Box,
  Collapse,
  Flex,
  Heading,
  HStack,
  Link,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import moment from 'moment';
import type { FC } from 'react';
import React, { useState } from 'react';
import { BsCircleFill } from 'react-icons/bs';
import { Link as ReachLink } from 'react-router-dom';

import {
  getMentionInterface,
  useGetMentionQuery,
  useGetSingleIdentityBCQuery,
} from '../../../../features/reactQuery/RTKQuery';

interface singleMentionInterface {
  mention: getMentionInterface;
}

export const SingleMention: FC<singleMentionInterface> = ({ mention }) => {
  console.log('mention:', mention);
  const useGetSingleIdentityBCQueryQuery = useGetSingleIdentityBCQuery({
    chainIdURL: mention.fromChainId!,
    paramsWalletURL: mention.fromWallet!,
  });
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  const timeStampFormatted = moment(mention.timeStamp).format(
    'MMM DD YYYY, hh:mm:ss a',
  );
  const timeStampShortFormatted = moment(mention.timeStamp).format(
    'MMM DD YYYY',
  );
  return (
    <Box
      // border={'2px solid purple'}
      px="8px"
      m={'0px'}
      w={'100%'}
      // fontSize={'15px'}
      borderBottom={'1px solid'}
      borderColor={'pmpurple.6'}
    >
      <HStack m={'0px'} spacing={0}>
        {useGetSingleIdentityBCQueryQuery.isSuccess ? (
          <Popover trigger={'hover'}>
            <PopoverTrigger>
              <Link
                as={ReachLink}
                to={`/identity/${mention.fromChainId}/${mention.fromWallet}`}
                // bg={'#f2eef2'}
                color={'pmpurple.13'}
                textAlign={'left'}
                borderRadius={'5px'}
              >
                <Text as={'u'} whiteSpace="nowrap" fontSize={'16px'}>
                  {
                    useGetSingleIdentityBCQueryQuery.data!.nfiIdentity!.name.split(
                      '|||',
                    )[0]
                  }
                </Text>
              </Link>
            </PopoverTrigger>
            <PopoverContent
              whiteSpace="nowrap"
              width={'400px'}
              border={'1px solid #694b69'}
              // borderRadius={'3px'}
              color="pmpurple.13"
              pl={'1px'}
              textAlign={'center'}
            >
              <PopoverBody
                whiteSpace="nowrap"
                width={'140px'}
                textAlign={'center'}
              >
                {mention.fromWallet}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        ) : (
          <Link
            as={ReachLink}
            to={`/identity/${mention.fromChainId}/${mention.fromWallet}`}
            // bg={'#f2eef2'}
            color={'pmpurple.13'}
            textAlign={'left'}
            borderRadius={'5px'}
          >
            <Text as={'u'} whiteSpace="nowrap" fontSize={'16px'}>
              {mention.fromWallet}
            </Text>
          </Link>
        )}
        <Spacer />
        <Tooltip
          label={timeStampFormatted}
          aria-label="A tooltip"
          bg={'pmpurple.8'}
        >
          <Box
            // border={'2px solid red'}
            color={'pmpurple.8'}
            fontSize={'12px'}
            overflow={'none'}
          >
            {timeStampShortFormatted}
          </Box>
        </Tooltip>
      </HStack>
      <HStack alignItems={'start'}>
        {mention.messageBody.length > 0 ? (
          <Box>
            <Collapse
              startingHeight={26}
              // endingHeight={'auto'}
              in={show}
              // unmountOnExit={false}
              // animateOpacity={true}
            >
              <Link
                onClick={handleToggle}
                // isTruncated={true}
                // textOverflow={'ellipsis'}
              >
                {mention.messageBody}
              </Link>
            </Collapse>
          </Box>
        ) : null}
        <Spacer />
        <Box pt={2} pl={14} pb={1}>
          {mention.radioType === 1 && (
            <HStack>
              <BsCircleFill color={'green'} size={'8px'} />
              <BsCircleFill color={'grey'} size={'8px'} />
              <BsCircleFill color={'grey'} size={'8px'} />
            </HStack>
          )}
          {mention.radioType === 0 && (
            <HStack>
              <BsCircleFill color={'grey'} size={'8px'} />
              <BsCircleFill color={'red'} size={'8px'} />
              <BsCircleFill color={'grey'} size={'8px'} />
            </HStack>
          )}
          {mention.radioType === -1 && (
            <HStack>
              <BsCircleFill color={'grey'} size={'8px'} />
              <BsCircleFill color={'grey'} size={'8px'} />
              <BsCircleFill color={'blue'} size={'8px'} />
            </HStack>
          )}
        </Box>
      </HStack>
    </Box>
  );
};

interface interfaceMentions {
  chainIdURL: string;
  paramsWalletURL: string;
}

export const Mentions: FC<interfaceMentions> = ({
  chainIdURL,
  paramsWalletURL,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const { data, isLoading, isError, error } = useGetMentionQuery({
    chainIdURL,
    paramsWalletURL,
  });
  console.log('data:', data);
  if (isLoading) {
    return (
      <Heading pt={'50px'} fontSize={'20px'} textAlign={'center'}>
        Loading...
      </Heading>
    );
  }
  if (isError) {
    console.log('error:', error);
    return (
      <Heading pt={'50px'} fontSize={'20px'} textAlign={'center'}>
        Something went wrong...
      </Heading>
    );
  }
  if (!chainIdURL) return null;

  // const allMentionsArr = useAppSelector((state) => state.mentions.allMentions);
  //
  // const sortedMentionArr = useMemo(() => {
  //     const sortMentionsArr = [...allMentionsArr];
  //     sortMentionsArr.sort((a, b) => {
  //         return (b.timeStamp - a.timeStamp)
  //     });
  //     return (sortMentionsArr)
  // }, [allMentionsArr])

  return (
    <Flex
      w={'100%'}
      p="0px"
      mt={'5px'}
      // border={'1px solid orange'}
      // border={'2px solid'}
      borderColor={'pmpurple.6'}
      overflow={'auto'}
    >
      <VStack
        w={'100%'}
        flexGrow={1}
        display={'flex'}
        // overflow={'auto'}
        spacing={0}
      >
        {data !== undefined &&
          data.Items.map((mention: getMentionInterface) => {
            return <SingleMention mention={mention} />;
          })}
      </VStack>
    </Flex>
  );
};

export default Mentions;
