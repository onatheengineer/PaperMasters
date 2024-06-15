import React, {
  FC,
  useRef,
  MouseEventHandler,
  useState,
  FormEvent,
} from 'react';
import { Link as ReachLink, useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Link,
  MenuItem,
  Stack,
  Text,
  useColorModeValue,
  HStack,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Container,
  AspectRatio,
  AvatarBadge,
  Divider,
  Center,
  InputRightElement,
  useStyleConfig,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

interface identityEntryModalInterface {
  text: string;
  isOpen: boolean;
  onClose: any;
  placeHolder: string;
  title: string;
  buttonText: string;
}

export const IdentityEntryModal: FC<identityEntryModalInterface> = ({
  text,
  isOpen,
  onClose,
  placeHolder,
  title,
  buttonText,
}) => {
  const initialRef = useRef<HTMLInputElement>(null);
  const initialRefChain = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState<string>('');
  const inputTextHandler = (e: FormEvent<HTMLInputElement>) => {
    setTypedText(e.currentTarget.value);
  };
  const navToProfilePageHandler = () => {
    navigate(
      `/identity/${initialRefChain.current?.value}/${initialRef.current?.value}`,
    );
    console.log(initialRef.current?.value);
  };
  return (
    <Box>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>
            <FormControl mt={4}>
              <FormLabel>Chain Id</FormLabel>
              <Input
                onChange={inputTextHandler}
                focusBorderColor="pmpurple.6"
                border={'1px solid'}
                borderColor={'pmpurple.8'}
                ref={initialRefChain}
                placeholder="chain Id"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>{text}</FormLabel>
              <Input
                onChange={inputTextHandler}
                focusBorderColor="pmpurple.6"
                border={'1px solid'}
                borderColor={'pmpurple.8'}
                ref={initialRef}
                placeholder={placeHolder}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              bg={'pmpurple.8'}
              disabled={typedText.length <= 32}
              border={'1px solid'}
              borderColor={'pmpurple.13'}
              color={'pmpurple.1'}
              mr={3}
              onClick={navToProfilePageHandler}
            >
              {buttonText}
            </Button>
            <Button
              bg={'pmpurple.2'}
              border={'1px solid'}
              borderColor={'pmpurple.4'}
              color={'pmpurple.13'}
              mr={3}
              onClick={onClose}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default IdentityEntryModal;
