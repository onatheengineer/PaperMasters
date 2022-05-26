import * as React from 'react';
import { FC, useEffect, useRef, useState } from 'react';
import moment from 'moment';
import {
  Box,
  Button,
  Text,
  useDisclosure,
  Textarea,
  FormLabel,
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '../../../../app/hooks';

export const ReplyMentions: FC = () => {
  const firstField = useRef<HTMLTextAreaElement>(null);
  const dateFormated = moment().format('MMM DD YYYY, hh:mm:ss a');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = (newSize: any) => {
    // setSize(newSize)
    onOpen();
  };

  return (
    <>
      <Box p="5px">
        <Button
          bg={'pmpurple.2'}
          border={'1px solid'}
          borderColor={'pmpurple.4'}
          mt={3}
          //value={scrollBehavior}
          //onChange={setScrollBehavior}
          onClick={() => handleClick(isOpen)}
        >
          <Text fontSize="18px" color={'pmpurple.13'} fontWeight="bold">
            Mentions
          </Text>
        </Button>
      </Box>
      <Drawer onClose={onClose} isOpen={isOpen} size="xl">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader color={'pmpurple.13'}> Mentions </DrawerHeader>
          <DrawerBody>
            Please feel free to reply to your mentions
            <Box mb={'18px'}>
              <FormLabel mt={'0px'} color="pmpurple.15" htmlFor="desc">
                Mention
              </FormLabel>
              <Textarea
                color="pmpurple.13"
                border={'1px solid'}
                borderColor={'pmpurple.6'}
                bg={'pmpurple.2'}
                h={'100px'}
                id="desc"
                ref={firstField}
                placeholder="Reply to a Mention"
              />
            </Box>
            <Box>
              <Input
                isDisabled={true}
                border={'1px solid'}
                borderColor={'pmpurple.8'}
                bg={'pmpurple.2'}
                color="pmpurple.15"
                value={dateFormated}
                id="username"
                placeholder={'Date'}
              />
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
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              color="pmpurple.12"
              border={'1px solid'}
              borderColor={'pmpurple.6'}
              bg={'pmpurple.4'}
            >
              {' '}
              Submit{' '}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ReplyMentions;
