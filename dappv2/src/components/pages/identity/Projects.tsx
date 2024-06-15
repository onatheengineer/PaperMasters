import * as React from 'react';
import type { FC } from 'react';
import { Link as ReachLink, useParams } from 'react-router-dom';
import {
  Avatar,
  AvatarGroup,
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
  Switch,
  Text,
  useColorModeValue,
  HStack,
  useDisclosure,
  Tooltip,
  VStack,
  Container,
  AspectRatio,
  AvatarBadge,
  Divider,
  Center,
  InputRightElement,
  useStyleConfig,
  TabPanel,
  TabPanels,
  TabList,
  Tabs,
  Tab,
  Select,
  Heading,
  Spacer,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { FaFacebook, FaInstagram, FaPlus, FaTwitter } from 'react-icons/fa';
import { AiOutlineComment } from 'react-icons/ai';
import ImageArchitect1 from '../../../assets/img/ImageArchitect1.png';
import MentionsDrawer from './mentions/MentionsDrawer';
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

import { select } from 'redux-saga/effects';

export const Projects = () => {
  // Settings for the slider
  const settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // const [slider, setSlider] = useState<Slider | null>(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '40px' });
  const project = [
    {
      title: 'Contract actual BC name',
      text: 'Contract description coming from the owner of the contract',
    },
    // {
    //     title: 'Contract actual BC name',
    //     text:
    //         "Contract description coming from the owner of the contract",
    //     image:
    //         'image of the NFT coming from the owner of the contract',
    // },
    // {
    //     title: 'Contract actual BC name',
    //     text:
    //         "Contract description coming from the owner of the contract",
    //     image:
    //         'image of the NFT coming from the owner of the contract',
    // }
  ];

  return (
    <Box
      //h={'100%'}
      w={'300px'}
      px="5px"
      mt={'5px'}
      //border={'1px solid orange'}
      //display={'inline-block'}
      display={'flex'}
    >
      <Grid
        templateColumns={{ base: '1fr 1fr' }}
        templateRows={{ base: '1fr 1fr' }}
        gap="24px"
      >
        <Flex
          h={'100%'}
          border={'1px solid'}
          borderColor={'pmpurple.8'}
          mx={{ xl: '15px' }}
          my="5px"
          borderRadius="15px"
          bg="white"
          p="16px"
          direction="column"
          justifyContent={'space-evenly'}
          //display={'inline-block'}
          flexGrow={1}
        >
          <Box mb="20px" position="relative" borderRadius="15px">
            <Image src={ImageArchitect1} borderRadius="15px" />
            <Box
              w="100%"
              h="100%"
              position="absolute"
              top="0"
              borderRadius="15px"
              bg="linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)"
            ></Box>
          </Box>
          <Flex direction="column">
            <Text fontSize="md" color="gray.500" fontWeight="600" mb="10px">
              Project #1 Smart Contract BC Names
            </Text>
            <Text
              fontSize="xl"
              color={'pmpurple.13'}
              fontWeight="bold"
              mb="10px"
            >
              My future project...
            </Text>
            <Text
              fontSize="md"
              color={'pmpurple.13'}
              fontWeight="400"
              mb="20px"
            >
              As I look through my bucket list...
            </Text>
            <Flex justifyContent="space-between">
              <Button
                variant="outline"
                color={'pmpurple.13'}
                minW="110px"
                h="36px"
                fontSize="xs"
                px="1.5rem"
                //onClick={()=>{dispatch(' saga')}}
              >
                VIEW PROJECT
              </Button>
              <AvatarGroup size="xs">
                <Avatar name="Nautica Nieder" src={'PMlogo.png'} />
                <Avatar name="Ammon Nieder" src={'legoLavendar.png'} />
                <Avatar name="Atlas Nieder" src={'legoLavendar.png'} />
                <Avatar name="Elijah Early" src={'PMlogo.png'} />
              </AvatarGroup>
            </Flex>
          </Flex>
        </Flex>
      </Grid>
    </Box>
  );
};

export default Projects;
