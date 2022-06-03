import {
  Box,
  Button,
  HStack,
  MenuButton,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import type { FC } from 'react';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Link as ReachLink, useNavigate } from 'react-router-dom';
import Sparkle from 'react-sparkle';

import { useAppDispatch } from '../../../app/hooks';
import { accountArrMetaMaskAction } from '../../../features/accountBC/AccountBCSlice';

export const ModalForIdentNoUseParams: FC = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <>
      <Modal
        finalFocusRef={finalRef}
        isOpen={true}
        onClose={onClose}
        blockScrollOnMount={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={'24px'}
            fontWeight="bold"
            color={'pmpurple.13'}
          >
            Connect Wallet Account
          </ModalHeader>
          <ModalBody>
            <Text
              fontSize={'18px'}
              color={'pmpurple.10'}
              fontWeight="bold"
              mb="1rem"
            >
              Please connect your wallet account to see your identity page
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              // border={'1px solid blue'}
              mr={'5px'}
              color={'pmpurple.13'}
              bgColor={'pmpurple.3'}
              border={'1px solid'}
              borderColor={'pmpurple.6'}
              onClick={() => {
                console.log('i am clicked');
                dispatch(accountArrMetaMaskAction());
              }}
              _hover={{ color: 'pmpurple.9' }}
            >
              <Text
                _focus={{ boxShadow: 'none' }}
                fontSize={'14px'}
                fontWeight={'Bold'}
              >
                Connect wallet using MetaMask
              </Text>
              <Sparkle
                color="#694b69"
                count={20}
                minSize={7}
                maxSize={12}
                overflowPx={0}
                fadeOutSpeed={30}
                flicker={false}
              />
            </Button>
            <Button
              as={ReachLink}
              to="/search"
              bg={'pmpurple.5'}
              color={'pmpurple.13'}
              border={'1px solid'}
              borderColor={'pmpurple.8'}
            >
              Go to Search Page
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalForIdentNoUseParams;
