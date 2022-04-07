import * as React from 'react';
import type {FC} from 'react';
import {Link as ReachLink, useParams} from "react-router-dom";
import {
    Avatar, AvatarGroup, Box, Button, Flex, Grid, GridItem, Icon, Image, Link, MenuItem,
    Stack, Switch, Text, useColorModeValue, HStack, useDisclosure, Tooltip, VStack,
    Container, AspectRatio, AvatarBadge, Divider, Center, InputRightElement, useStyleConfig,
    TabPanel, TabPanels, TabList, Tabs, Tab, Select, Heading, Spacer,
     IconButton, useBreakpointValue,
} from "@chakra-ui/react";
import {useMemo, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {FaFacebook, FaInstagram, FaPlus, FaTwitter} from "react-icons/fa";
import {AiOutlineComment} from "react-icons/ai";
import ImageArchitect1 from "../../assets/img/ImageArchitect1.png";
import {Carousel } from 'react-responsive-carousel';
import Mentions from "./mentions/Mentions";
import DisplayMentions from "./mentions/DisplayMentions";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
//import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


interface Interface {

}


export const Projects:FC<Interface>=()=> {

    const {walletAccount} = useParams();
    const filledAccountsArr = useAppSelector((state) => state.register.accounts);
    const dispatch = useAppDispatch();

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
            text:
                "Contract description coming from the owner of the contract",

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
        ]

    return (
        <Stack
        //maxH={'455px'}
        border={'1px solid blue'}
        direction={{base: 'column', md: 'row'}}
        >
            <Flex
                flexDirection={'column'}
                w={'50%'}
                p="16px"
                //my="24px"
                //mx={{xl: '32px'}}
                borderRadius='15px'
                bg='white'
                px="24px"
                border={'1px solid red'}
                maxH={'455px'}
            >
                <Box
                    display = 'flex'
                    border={'1px solid green'}
                    // borderBottom={'1px solid'}
                    // borderColor={'pmpurple.6'}
                >
                    <HStack
                    w={'100%'}
                    >
                        <Heading mb="18px">
                            <Flex direction="column">
                                <Text mb={'5px'} fontSize="18px" color={'pmpurple.13'} fontWeight="bold" align={'left'}>
                                    Projects
                                </Text>
                                <Text fontSize="15px" color={'pmpurple.13'} fontWeight="400" align={'left'}>
                                    PaperMasters protect the Blockchain
                                </Text>
                            </Flex>
                        </Heading>
                        <Spacer/>
                        <Button
                            //style={{border: '1px solid #b59eb5'}}
                            px="6px"
                            py={'4px'}
                            //bg="transparent"
                            color={'pmpurple.13'}
                            border="1px solid"
                            borderColor={'pmpurple.2'}
                            //borderRadius="15px"
                            //minHeight={{sm: "200px", md: "100%"}}
                            rightIcon={<FaPlus fontSize="10px"/>}
                        >
                            <Text fontSize="sm" fontWeight="bold">
                                Add Project
                            </Text>
                        </Button>
                    </HStack>
                </Box>
                <Divider
                    border={'1px solid'}
                    borderColor={'pmpurple.8'}
                />

                <Flex
                    h={'100%'}
                    w={'100%'}
                    px="5px"
                     mt={'5px'}
                     border={'1px solid orange'}
                >
                    <Grid
                        templateColumns={{sm: "1fr", md: "1fr 1fr", xl: "repeat(5, 1fr)"}}
                        templateRows={{sm: "1fr 1fr 1fr auto", md: "1fr 1fr", xl: "1fr"}}
                        gap="24px"
                    >
                        <Flex
                            h={'100%'}
                            border={'1px solid'}
                            borderColor={'pmpurple.8'}
                            mx={{xl: "15px"}}
                            m='5px'
                            borderRadius='15px' bg='white' p="16px" direction="column"
                              justifyContent={'space-evenly'}
                        >
                            {/*<Box*/}
                            {/*    position={'relative'}*/}
                            {/*    height={'600px'}*/}
                            {/*    width={'full'}*/}
                            {/*    overflow={'hidden'}>*/}

                            {/*    <IconButton*/}
                            {/*        aria-label="left-arrow"*/}
                            {/*        variant="ghost"*/}
                            {/*        position="absolute"*/}
                            {/*        left={side}*/}
                            {/*        top={top}*/}
                            {/*        transform={'translate(0%, -50%)'}*/}
                            {/*        zIndex={2}*/}
                            {/*        onClick={() => slider?.slickPrev()}>*/}
                            {/*        <BiLeftArrowAlt size="40px" />*/}
                            {/*    </IconButton>*/}
                            {/*    /!* Right Icon *!/*/}
                            {/*    <IconButton*/}
                            {/*        aria-label="right-arrow"*/}
                            {/*        variant="ghost"*/}
                            {/*        position="absolute"*/}
                            {/*        right={side}*/}
                            {/*        top={top}*/}
                            {/*        transform={'translate(0%, -50%)'}*/}
                            {/*        zIndex={2}*/}
                            {/*        onClick={() => slider?.slickNext()}>*/}
                            {/*        <BiRightArrowAlt size="40px" />*/}
                            {/*    </IconButton>*/}
                                {/* Slider */}
                            {/*    <Slider {...settings} ref={(slider:any) => setSlider(slider)}>*/}
                            {/*        {project.map((project, index) => (*/}
                            {/*            <Box*/}
                            {/*                key={index}*/}
                            {/*                height={'6xl'}*/}
                            {/*                position="relative"*/}
                            {/*                backgroundPosition="center"*/}
                            {/*                backgroundRepeat="no-repeat"*/}
                            {/*                backgroundSize="cover"*/}
                            {/*                backgroundImage={`url(${project.image})`}>*/}
                            {/*                /!* This is the block you need to change, to customize the caption *!/*/}
                            {/*                <Container size="container.lg" height="600px" position="relative">*/}
                            {/*                    <Stack*/}
                            {/*                        spacing={6}*/}
                            {/*                        w={'full'}*/}
                            {/*                        maxW={'lg'}*/}
                            {/*                        position="absolute"*/}
                            {/*                        top="50%"*/}
                            {/*                        transform="translate(0, -50%)">*/}
                            {/*                        <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>*/}
                            {/*                            {project.title}*/}
                            {/*                        </Heading>*/}
                            {/*                        <Text fontSize={{ base: 'md', lg: 'lg' }} color="GrayText">*/}
                            {/*                            {project.text}*/}
                            {/*                        </Text>*/}
                            {/*                    </Stack>*/}
                            {/*                </Container>*/}
                            {/*            </Box>*/}
                            {/*        ))}*/}
                            {/*    </Slider>*/}
                            {/*</Box>*/}

                            <Box mb="20px" position="relative" borderRadius="15px">
                                <Image src={ImageArchitect1} borderRadius="15px"/>
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
                                <Text fontSize="md" color={'pmpurple.13'} fontWeight="400" mb="20px">
                                    As I look through my bucket list, I find my next endeavor...
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
                                        <Avatar name="Nautica Nieder" src={'PMlogo.png'}/>
                                        <Avatar name="Ammon Nieder" src={'legoLavendar.png'}/>
                                        <Avatar name="Atlas Nieder" src={'legoLavendar.png'}/>
                                        <Avatar name="Elijah Early" src={'PMlogo.png'}/>
                                    </AvatarGroup>
                                </Flex>
                            </Flex>
                            {/*</Carousel>*/}
                        </Flex>

                    </Grid>
                </Flex>
            </Flex>
            <Box
                w={'50%'}
                p="16px"
                //my="24px"
                //mx={{xl: '32px'}}
                borderRadius='15px'
                bg='white'
                px="24px"
                //border={'1px solid red'}
                h={'100%'}
                >
                <Mentions/>
            </Box>

        </Stack>
    )
};

export default Projects;


