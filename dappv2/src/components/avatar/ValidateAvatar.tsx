import {
  AspectRatio,
  Avatar,
  AvatarBadge,
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import type { FC } from 'react';
import * as React from 'react';

import { PMsvgIcon } from '../../assets/icons/PMSvgIcon';
import { validateInterface } from '../../features/reactQuery/RTKQuery';

export const ValidateAvatar: FC<validateInterface> = ({
  giver,
  giverColor,
  receiver,
  receiverColor,
  comment,
  commentColor,
  originDate,
}) => {
  const originDateObject = new Date(originDate);
  const originDateFormatted = `${originDateObject.toLocaleString('en-us', {
    month: 'long',
  })} ${originDateObject.getDate()}, ${originDateObject.getFullYear()}`;

  return (
    <Container centerContent>
      <AspectRatio w="320px" ratio={2 / 1}>
        <Box
          h={'100%'}
          w={'full'}
          border={'3px'}
          rounded={'10px'}
          borderColor={'pmpurple.13'}
          borderStyle={'solid'}
          bg={'pmpurple.13'}
        >
          <Stack
            h={'100%'}
            w={'full'}
            align={'center'}
            spacing={0}
            bg={'pmpurple.1'}
            wordBreak={'break-word'}
            rounded={'10px'}
          >
            <Image
              position={'absolute'}
              top={'0px'}
              right={'0px'}
              left={'0px'}
              h={'60px'}
              backgroundPosition="center"
              // src={swan3}
              objectFit={'cover'}
            />
            <Avatar
              mt={'22px'}
              icon={<PMsvgIcon />}
              boxSize="2.0em"
              variant={'square'}
              showBorder={false}
              bg={'transparent'}
              // css={{
              //     border: '2px solid #4f384f',
              // }}
            >
              {/* <AvatarBadge */}
              {/*    border={'1px'} */}
              {/*    borderColor={'pmpurple.13'} */}
              {/*    borderStyle={'solid'} */}
              {/*    boxSize='22px' */}
              {/*    bg='pmpurple.1'> */}
              {/*    <Text mt='0px' p={'0px'} fontSize={'9px'} fontWeight={500} */}
              {/*          fontFamily={'body'} align={'center'} */}
              {/*          color={'pmpurple.13'}> */}
              {/*        Validation */}
              {/*    </Text> */}
              {/* </AvatarBadge> */}
            </Avatar>

            {/* <Text pt={'0px'} fontSize={'21px'} fontWeight={500} */}
            {/*      fontFamily={'body'} align={'center'} */}
            {/*      color={'pmpurple.14'}> */}
            {/*    PaperMaster Validated */}
            {/* </Text> */}

            {/* <Text noOfLines={[1, 2]} mb={'0px'} py={'0px'} px={'16px'} */}
            {/*      fontSize={'18px'} fontWeight={500} */}
            {/*      fontFamily={'body'} align={'center'} */}
            {/*      color={giverColor}> */}
            {/*    {giver} */}
            {/* </Text> */}
            {/* <Divider pt={'0px'} css={{borderColor: '#a88ea8'}}/> */}
            <Flex
              // mt={30}
              flexGrow={1}
              flexDirection={'row'}
              textAlign={'center'}
            >
              <Center>
                <VStack
                  align={'center'}
                  fontSize={'16px'}
                  px={'18px'}
                  spacing={0}
                  alignItems={'center'}
                >
                  <Text noOfLines={1} whiteSpace={'nowrap'} color={giverColor}>
                    {giver}
                  </Text>
                  <Text
                    noOfLines={1}
                    whiteSpace={'nowrap'}
                    color={receiverColor}
                  >
                    {receiver}
                  </Text>
                  <Text
                    noOfLines={1}
                    whiteSpace={'nowrap'}
                    color={commentColor}
                  >
                    {comment}
                  </Text>
                </VStack>
              </Center>
            </Flex>
            <Box>
              <Stack textAlign={'center'}>
                <Text
                  as="cite"
                  mb={'33px'}
                  pb={'0px'}
                  fontSize={'sm'}
                  color={'pmpurple.13'}
                >
                  Origin Date {originDateFormatted}
                </Text>

                {/* <Box */}
                {/*    position={'absolute'} */}
                {/*    bottom={'0px'} */}
                {/*    right={'0px'} */}
                {/*    left={'0px'} */}
                {/*    h={'32px'} */}
                {/*    backgroundPosition="center" */}
                {/*    objectFit={'cover'} */}
                {/*    // w={'100%'} */}
                {/*    bg={'pmpurple.10'} */}
                {/* > */}
                {/*    <Text p={'6px'} fontSize={'9pt'} color={'white'} */}
                {/*          whiteSpace={'break-spaces'}> */}
                {/*        {walletAccount} */}
                {/*    </Text> */}
                {/* </Box> */}
              </Stack>
            </Box>
          </Stack>
        </Box>
      </AspectRatio>
    </Container>
  );
};

export default ValidateAvatar;
