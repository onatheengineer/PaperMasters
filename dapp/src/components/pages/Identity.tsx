import * as React from 'react';
import type {FC} from 'react';
import {Link as ReachLink} from "react-router-dom";
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Flex,
    Grid, GridItem,
    Icon,
    Image,
    Link, MenuItem, Stack,
    Switch,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { BsFillCloudRainFill } from 'react-icons/bs'
import Card from '../Card/Card';
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
// Assets
import avatar2 from "../../assets/img/avatars/avatar2.png";
import avatar3 from "../../assets/img/avatars/avatar3.png";
import avatar4 from "../../assets/img/avatars/avatar4.png";
import avatar5 from "../../assets/img/avatars/avatar5.png";
import avatar6 from "../../assets/img/avatars/avatar6.png";
import ImageArchitect1 from "../../assets/img/ImageArchitect1.png";
import ImageArchitect2 from "../../assets/img/ImageArchitect2.png";
import ImageArchitect3 from "../../assets/img/ImageArchitect3.png";
import ProfileBgImage from "../../assets/img/ProfileBackground.png";
import {
    FaCube,
    FaFacebook,
    FaInstagram,
    FaPenFancy,
    FaPlus,
    FaTwitter,
} from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";
import Sidebar from "../Sidebar";
import {GiNewShoot} from "react-icons/gi";
import {useAppSelector} from "../../app/hooks";
import {SiSololearn} from "react-icons/si";


interface Interface {

}

export const Identity:FC<Interface>=()=> {

    // Chakra color mode
    const textColor = useColorModeValue("#5c415c", "white");
    const bgProfile = useColorModeValue(
        "hsla(0,0%,100%,.8)",
        "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
    );
    const borderProfileColor = useColorModeValue(
        "white",
        "rgba(255, 255, 255, 0.31)"
    );
    const emailColor = useColorModeValue("gray.400", "gray.300");
    const filledAccountsArr = useAppSelector((state)=> state.register.accounts);

    return (

        <Flex>

                <Grid templateColumns='repeat(1, 1fr)' padding={'0'}>

                    <Box bg='#e6dee6' style={{border: '8px solid white'}}>

                        <Flex direction="column" align="center">

                            <Box
                                mb={{sm: "205px", md: "75px", xl: "40px"}}
                                borderRadius="15px"
                                px="0px"
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                            >
                                <Box
                                    bgImage={'legoLavendarheadercroped.png'}
                                    w="100%"
                                    h="200px"
                                    // borderRadius="25px"
                                    bgPosition="0%"
                                    bgRepeat="repeat"
                                    position="relative"
                                    display="flex"
                                    justifyContent="center"
                                    mb={'48px'}
                                >
                                    <Flex
                                        direction={{sm: "column", md: "row"}}
                                        mx="1.5rem"
                                        maxH="330px"
                                        w={{sm: "90%", xl: "95%"}}
                                        justifyContent={{sm: "center", md: "space-between"}}
                                        align="center"
                                        backdropFilter="saturate(100%) blur(50px)"
                                        position="absolute"
                                        boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
                                        border="2px solid "
                                        borderColor='#694b69'
                                        p="24px"
                                        borderRadius="20px"
                                        transform={{
                                            sm: "translateY(45%)",
                                            md: "translateY(90%)",
                                            lg: "translateY(83%)",
                                        }}
                                    >
                                        <Flex
                                            align="center"
                                            mb={{sm: "10px", md: "0px"}}
                                            direction={{sm: "column", md: "row"}}
                                            w={{sm: "100%"}}
                                            textAlign={{sm: "center", md: "start"}}
                                            bg={'transparent'}

                                        >
                                            <Avatar
                                                me={{md: "22px"}}
                                                src='Andrew_Pic.JPG' //this is the profile image
                                                w="80px"
                                                h="80px"
                                                borderRadius="15px"
                                            />
                                            <Flex direction="column" maxWidth="100%">
                                                {filledAccountsArr.length === 0 ?
                                                <Text
                                                    fontSize={{sm: "lg", lg: "xl"}}
                                                    color={'#271c27'}
                                                    fontWeight="bold"
                                                    ms={{sm: "8px", md: "0px"}}
                                                >
                                                    {/*{name}*/}
                                                    Andrew from Mos Eisley
                                                </Text>

                                                    :  <Flex alignItems={'center'}> {filledAccountsArr[0]} </Flex>}


                                                <Text
                                                    fontSize={{sm: "sm", md: "md"}}
                                                    color='#342534'
                                                    fontWeight="semibold"
                                                >
                                                    ramonajenny.n@gmail.com
                                                </Text>
                                                <Flex align="center" mb="0px">
                                                    <Text
                                                        fontSize="md"
                                                        color={textColor}
                                                        fontWeight="bold"
                                                        me="10px"
                                                    >
                                                        Social Media:{" "}
                                                    </Text>
                                                    <Flex>
                                                        <Link
                                                            href="#"
                                                            color="#9c7e9c"
                                                            fontSize="lg"
                                                            me="10px"
                                                            _hover={{color: "#9c7e9c"}}
                                                        >
                                                            <Icon as={FaFacebook}/>
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            color="#9c7e9c"
                                                            fontSize="lg"
                                                            me="10px"
                                                            _hover={{color: "#9c7e9c"}}
                                                        >
                                                            <Icon as={FaInstagram}/>
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            color="#9c7e9c"
                                                            fontSize="lg"
                                                            me="10px"
                                                            _hover={{color: "#9c7e9c"}}
                                                        >
                                                            <Icon as={FaTwitter}/>
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            color="#9c7e9c"
                                                            fontSize="lg"
                                                            me="10px"
                                                            _hover={{color: "#9c7e9c"}}
                                                        >
                                                            <Icon as={FaFacebook}/>

                                                        </Link>

                                                    </Flex>

                                                </Flex>

                                                <Text
                                                    fontSize="md"
                                                    color={textColor}
                                                    fontWeight="bold"
                                                    me="10px"
                                                >
                                                    Your NFI QR code:{" "}
                                                    <Link
                                                        href="#"
                                                        color="#9c7e9c"
                                                        fontSize="lg"
                                                        me="10px"
                                                        _hover={{color: "#9c7e9c"}}
                                                    >
                                                        <Icon as={FaFacebook}/>

                                                    </Link>
                                                </Text>

                                            </Flex>
                                        </Flex>
                                        <Stack direction={'row'} justify={'center'} spacing={6} >
                                        <Flex
                                            direction={{sm: "column", lg: "row"}}
                                            w={{sm: "100%", md: "50%", lg: "auto"}}
                                        >

                                            <Button p="0px" bg="transparent" _hover={{bg: "none"}}>
                                                <Flex
                                                    align="center"
                                                    w={'100%'}
                                                    bg="hsla(0,0%,100%,.3)"
                                                    borderRadius="15px"
                                                    justifyContent="center"
                                                    py="12px"
                                                    px="14px"
                                                    mx={'42px'}
                                                    boxShadow="inset 0 0 1px 1px hsl(0deg 0% 100% / 90%), 0 20px 27px 0 rgb(0 0 0 / 5%)"
                                                    border="1px solid gray.500"
                                                    cursor="pointer"
                                                >
                                                    <Icon as={FaCube} me="6px"/>
                                                    <Text fontSize="sm" color={textColor} fontWeight="bold">
                                                        {/*//when I click on this button I want it to route me to the validations page*/}
                                                        <Link as={ReachLink} to={'/validate'}>
                                                            NFI:
                                                            Transaction HASH
                                                        </Link>
                                                    </Text>
                                                </Flex>
                                            </Button>
                                        </Flex>
                                            <Stack spacing={0} align={'center'}>
                                                <Text fontWeight={600}>57</Text>
                                                <Text fontSize={'sm'} color={'pmpurple.11'}>
                                                    Validations
                                                </Text>
                                            </Stack>
                                            <Stack spacing={0} align={'center'}>
                                                <Text fontWeight={600}>23k</Text>
                                                <Text fontSize={'sm'} color={'pmpurple.11'}>
                                                    Mentions
                                                </Text>
                                            </Stack>
                                        </Stack>
                                    </Flex>
                                </Box>
                            </Box>

                            <Card mx={"5px"} borderRadius='15px' bg='white' p="16px" px="24px"
                                  mt={{sm: "24px", md: '5px', xl: "16px"}} mb='16px'>
                                <CardHeader p="12px 5px" mb="12px">
                                    <Text fontSize="lg" color={textColor} fontWeight="bold">
                                        Description
                                    </Text>
                                </CardHeader>
                                <CardBody px="5px">
                                    <Flex direction="column">
                                        <Text fontSize="md" color="gray.500" fontWeight="400" mb="30px">
                                            Mathematics may not teach us how to add love or subtract hate, but it gives
                                            us every reason to hope that every problem has a solution.
                                        </Text>
                                    </Flex>
                                </CardBody>
                            </Card>
                            <Card>
                                <Grid templateColumns={{sm: "1fr", xl: "repeat(3, 1fr)"}} gap="12px">
                                    <Card mx={{xl: "15px"}} m='5px' borderRadius='15px' bg='white' p="16px" px="24px">
                                        <CardHeader p="12px 5px" mb="12px">
                                            <Text fontSize="lg" color={textColor} fontWeight="bold">
                                                Platform Settings
                                            </Text>
                                        </CardHeader>
                                        <CardBody px="5px">
                                            <Flex direction="column">
                                                <Text fontSize="sm" color="gray.500" fontWeight="600" mb="20px">
                                                    ACCOUNT
                                                </Text>
                                                <Flex align="center" mb="20px">
                                                    <Switch colorScheme="purple" me="10px"/>
                                                    <Text
                                                        noOfLines={1}
                                                        fontSize="md"
                                                        color="gray.500"
                                                        fontWeight="400"
                                                    >
                                                        Email me when someone Validates me
                                                    </Text>
                                                </Flex>
                                                <Flex align="center" mb="20px">
                                                    <Switch colorScheme="purple" me="10px"/>
                                                    <Text
                                                        noOfLines={1}
                                                        fontSize="md"
                                                        color="gray.500"
                                                        fontWeight="400"
                                                    >
                                                        Email me when my PMI attached NFTs sell
                                                    </Text>
                                                </Flex>
                                                <Flex align="center" mb="20px">
                                                    <Switch colorScheme="purple" me="10px"/>
                                                    <Text
                                                        noOfLines={1}
                                                        fontSize="md"
                                                        color="gray.500"
                                                        fontWeight="400"
                                                    >
                                                        Email me when someone answers on my post
                                                    </Text>
                                                </Flex>
                                                <Flex align="center" mb="20px">
                                                    <Switch colorScheme="purple" me="10px"/>
                                                    <Text
                                                        noOfLines={1}
                                                        fontSize="md"
                                                        color="gray.500"
                                                        fontWeight="400"
                                                    >
                                                        Email me when someone mentions me
                                                    </Text>
                                                </Flex>
                                                <Text
                                                    fontSize="sm"
                                                    color="gray.500"
                                                    fontWeight="600"
                                                    m="6px 0px 20px 0px"
                                                >
                                                    APPLICATION
                                                </Text>
                                                <Flex align="center" mb="20px">
                                                    <Switch colorScheme="purple" me="10px"/>
                                                    <Text
                                                        noOfLines={1}
                                                        fontSize="md"
                                                        color="gray.500"
                                                        fontWeight="400"
                                                    >
                                                        New launches and projects
                                                    </Text>
                                                </Flex>
                                                <Flex align="center" mb="20px">
                                                    <Switch colorScheme="purple" me="10px"/>
                                                    <Text
                                                        noOfLines={1}
                                                        fontSize="md"
                                                        color="gray.500"
                                                        fontWeight="400"
                                                    >
                                                        Monthly product changes
                                                    </Text>
                                                </Flex>
                                                <Flex align="center" mb="20px">
                                                    <Switch colorScheme="purple" me="10px"/>
                                                    <Text
                                                        noOfLines={1}
                                                        fontSize="md"
                                                        color="gray.500"
                                                        fontWeight="400"
                                                    >
                                                        Subscribe to newsletter
                                                    </Text>
                                                </Flex>
                                            </Flex>
                                        </CardBody>
                                    </Card>
                                    <Card mx={{xl: "15px"}} m='5px' borderRadius='15px' bg='white' p="16px" px="24px">
                                        <CardHeader p="12px 5px" mb="12px">
                                            <Text fontSize="lg" color={textColor} fontWeight="bold">
                                                PMI goes here
                                            </Text>
                                        </CardHeader>
                                        <CardBody px="5px">
                                            <Flex direction="column">
                                                <Flex align="center" mb="18px">
                                                    <Text
                                                        fontSize="md"
                                                        color={textColor}
                                                        fontWeight="bold"
                                                        me="10px"
                                                    >
                                                        Familiar Name:{" "}
                                                    </Text>
                                                    <Text fontSize="md" color="gray.500" fontWeight="400">
                                                        Andrew the Jedi
                                                    </Text>
                                                </Flex>


                                                <Flex align="center" mb="18px">
                                                    <Text
                                                        fontSize="md"
                                                        color={textColor}
                                                        fontWeight="bold"
                                                        me="10px"
                                                    >
                                                        Location:{" "}
                                                    </Text>
                                                    <Text fontSize="md" color="gray.500" fontWeight="400">
                                                        United States
                                                    </Text>
                                                </Flex>
                                                {/*<Flex align="center" mb="18px">*/}
                                                {/*    <Text*/}
                                                {/*        fontSize="md"*/}
                                                {/*        color={textColor}*/}
                                                {/*        fontWeight="bold"*/}
                                                {/*        me="10px"*/}
                                                {/*    >*/}
                                                {/*        Social Media:{" "}*/}
                                                {/*    </Text>*/}
                                                {/*    <Flex>*/}
                                                {/*        <Link*/}
                                                {/*            href="#"*/}
                                                {/*            color="#9c7e9c"*/}
                                                {/*            fontSize="lg"*/}
                                                {/*            me="10px"*/}
                                                {/*            _hover={{color: "#9c7e9c"}}*/}
                                                {/*        >*/}
                                                {/*            <Icon as={FaFacebook}/>*/}
                                                {/*        </Link>*/}
                                                {/*        <Link*/}
                                                {/*            href="#"*/}
                                                {/*            color="#9c7e9c"*/}
                                                {/*            fontSize="lg"*/}
                                                {/*            me="10px"*/}
                                                {/*            _hover={{color: "#9c7e9c"}}*/}
                                                {/*        >*/}
                                                {/*            <Icon as={FaInstagram}/>*/}
                                                {/*        </Link>*/}
                                                {/*        <Link*/}
                                                {/*            href="#"*/}
                                                {/*            color="#9c7e9c"*/}
                                                {/*            fontSize="lg"*/}
                                                {/*            me="10px"*/}
                                                {/*            _hover={{color: "#9c7e9c"}}*/}
                                                {/*        >*/}
                                                {/*            <Icon as={FaTwitter}/>*/}
                                                {/*        </Link>*/}
                                                {/*    </Flex>*/}
                                                {/*</Flex>*/}
                                            </Flex>
                                        </CardBody>
                                    </Card>
                                    <Card mx={{xl: "15px"}} m='5px' borderRadius='15px' bg='white' p="16px" px="24px">
                                        <CardHeader p="12px 5px" mb="12px">
                                            <Text fontSize="lg" color={textColor} fontWeight="bold">
                                                Mentions
                                            </Text>
                                        </CardHeader>
                                        <CardBody px="5px">
                                            <Flex direction="column" w="100%">
                                                <Flex justifyContent="space-between" mb="21px">
                                                    <Flex align="center">
                                                        <Avatar
                                                            src='PMlogo.png'
                                                            w="50px"
                                                            h="50px"
                                                            borderRadius="15px"
                                                            me="10px"
                                                        />
                                                        <Flex direction="column">
                                                            <Text fontSize="sm" color={textColor} fontWeight="bold">
                                                                JediKnight{" "}
                                                            </Text>
                                                            <Text fontSize="xs" color="gray.500" fontWeight="400">
                                                                Hi! I need more information...
                                                            </Text>
                                                        </Flex>
                                                    </Flex>
                                                    <Button p="0px" bg="transparent" variant="no-hover">
                                                        <Text
                                                            fontSize="sm"
                                                            fontWeight="600"
                                                            color="#9c7e9c"
                                                            alignSelf="center"
                                                        >
                                                            REPLY
                                                        </Text>
                                                    </Button>
                                                </Flex>
                                                <Flex justifyContent="space-between" mb="21px">
                                                    <Flex align="center">
                                                        <Avatar
                                                            src='legoLavendar.png'
                                                            w="50px"
                                                            h="50px"
                                                            borderRadius="15px"
                                                            me="10px"
                                                        />
                                                        <Flex direction="column">
                                                            <Text fontSize="sm" color={textColor} fontWeight="bold">
                                                                WhyWhyWhy{" "}
                                                            </Text>
                                                            <Text fontSize="xs" color="gray.500" fontWeight="400">
                                                                Awesome work, can you change...
                                                            </Text>
                                                        </Flex>
                                                    </Flex>
                                                    <Button p="0px" bg="transparent" variant="no-hover">
                                                        <Text
                                                            fontSize="sm"
                                                            fontWeight="600"
                                                            color="#9c7e9c"
                                                            alignSelf="center"
                                                        >
                                                            REPLY
                                                        </Text>
                                                    </Button>
                                                </Flex>
                                                <Flex justifyContent="space-between" mb="21px">
                                                    <Flex align="center">
                                                        <Avatar
                                                            src={'PMlogo.png'}
                                                            w="50px"
                                                            h="50px"
                                                            borderRadius="15px"
                                                            me="10px"
                                                        />
                                                        <Flex direction="column">
                                                            <Text fontSize="sm" color={textColor} fontWeight="bold">
                                                                Ammon AC{" "}
                                                            </Text>
                                                            <Text fontSize="xs" color="gray.500" fontWeight="400">
                                                                Have a great afternoon...
                                                            </Text>
                                                        </Flex>
                                                    </Flex>
                                                    <Button p="0px" bg="transparent" variant="no-hover">
                                                        <Text
                                                            fontSize="sm"
                                                            fontWeight="600"
                                                            color="#9c7e9c"
                                                            alignSelf="center"
                                                        >
                                                            REPLY
                                                        </Text>
                                                    </Button>
                                                </Flex>
                                                <Flex justifyContent="space-between" mb="21px">
                                                    <Flex align="center">
                                                        <Avatar
                                                            src={'legoLavendar.png'}
                                                            w="50px"
                                                            h="50px"
                                                            borderRadius="15px"
                                                            me="10px"
                                                        />
                                                        <Flex direction="column">
                                                            <Text fontSize="sm" color={textColor} fontWeight="bold">
                                                                Captain Nautica{" "}
                                                            </Text>
                                                            <Text fontSize="xs" color="gray.500" fontWeight="400">
                                                                About NFTs I can...
                                                            </Text>
                                                        </Flex>
                                                    </Flex>
                                                    <Button p="0px" bg="transparent" variant="no-hover">
                                                        <Text
                                                            fontSize="sm"
                                                            fontWeight="600"
                                                            color="#9c7e9c"
                                                            alignSelf="center"
                                                        >
                                                            REPLY
                                                        </Text>
                                                    </Button>
                                                </Flex>
                                                <Flex justifyContent="space-between" mb="21px">
                                                    <Flex align="center">
                                                        <Avatar
                                                            src={'PMlogo.png'}
                                                            w="50px"
                                                            h="50px"
                                                            borderRadius="15px"
                                                            me="10px"
                                                        />
                                                        <Flex direction="column">
                                                            <Text fontSize="sm" color={textColor} fontWeight="bold">
                                                                Atlas World{" "}
                                                            </Text>
                                                            <Text fontSize="xs" color="gray.500" fontWeight="400">
                                                                Are you the author...
                                                            </Text>
                                                        </Flex>
                                                    </Flex>
                                                    <Button p="0px" bg="transparent" variant="no-hover">
                                                        <Text
                                                            fontSize="sm"
                                                            fontWeight="600"
                                                            color="#9c7e9c"
                                                            alignSelf="center"
                                                        >
                                                            REPLY
                                                        </Text>
                                                    </Button>
                                                </Flex>
                                            </Flex>
                                        </CardBody>
                                    </Card>
                                </Grid>
                            </Card>
                            <Card p="16px" my="24px" mx={{xl: '32px'}} borderRadius='15px' bg='white' px="24px">
                                <CardHeader p="12px 5px" mb="12px">
                                    <Flex direction="column">
                                        <Text fontSize="lg" color={textColor} fontWeight="bold">
                                            Non-Fungible-Tokens
                                        </Text>
                                        <Text fontSize="sm" color="gray.500" fontWeight="400">
                                            PaperMasters protect the Blockchain
                                        </Text>
                                    </Flex>
                                </CardHeader>
                                <CardBody px="5px">
                                    <Grid
                                        templateColumns={{sm: "1fr", md: "1fr 1fr", xl: "repeat(4, 1fr)"}}
                                        templateRows={{sm: "1fr 1fr 1fr auto", md: "1fr 1fr", xl: "1fr"}}
                                        gap="24px"
                                    >

                                        <Flex style={{border: '1px solid #b59eb5'}} mx={{xl: "15px"}} m='5px'
                                              borderRadius='15px' bg='white' p="16px" direction="column">
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
                                                    Project #1
                                                </Text>
                                                <Text
                                                    fontSize="xl"
                                                    color={textColor}
                                                    fontWeight="bold"
                                                    mb="10px"
                                                >
                                                    Modern
                                                </Text>
                                                <Text fontSize="md" color="gray.500" fontWeight="400" mb="20px">
                                                    As Uber works through a huge amount of internal management
                                                    turmoil.
                                                </Text>
                                                <Flex justifyContent="space-between">
                                                    <Button
                                                        variant="outline"
                                                        colorScheme="purple"
                                                        minW="110px"
                                                        h="36px"
                                                        fontSize="xs"
                                                        px="1.5rem"
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
                                        </Flex>
                                        <Flex style={{border: '1px solid #b59eb5'}} mx={{xl: "15px"}} m='5px'
                                              borderRadius='15px' bg='white' p="16px" direction="column">
                                            <Box mb="20px" position="relative" borderRadius="15px">
                                                <Image src={ImageArchitect2} borderRadius="15px"/>
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
                                                    Project #2
                                                </Text>
                                                <Text
                                                    fontSize="xl"
                                                    color={textColor}
                                                    fontWeight="bold"
                                                    mb="10px"
                                                >
                                                    Scandinavian
                                                </Text>
                                                <Text fontSize="md" color="gray.500" fontWeight="400" mb="20px">
                                                    Music is something that every person has his or her own
                                                    specific opinion about.
                                                </Text>
                                                <Flex justifyContent="space-between">
                                                    <Button
                                                        variant="outline"
                                                        colorScheme="purple"
                                                        minW="110px"
                                                        h="36px"
                                                        fontSize="xs"
                                                        px="1.5rem"
                                                    >
                                                        VIEW PROJECT
                                                    </Button>
                                                    <AvatarGroup size="xs">
                                                        <Avatar name="Matthias Early" src={'legoLavendar.png'}/>
                                                        <Avatar name="Zechariah Early" src={'PMlogo.png'}/>
                                                        <Avatar name="Elijah Early" src={'legoLavendar.png'}/>
                                                        <Avatar name="Andrew Nieder" src={'PMlogo.png'}/>
                                                    </AvatarGroup>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                        <Flex style={{border: '1px solid #b59eb5'}} mx={{xl: "15px"}} m='5px'
                                              borderRadius='15px' bg='white' p="16px" direction="column">
                                            <Box mb="20px" position="relative" borderRadius="15px">
                                                <Image src={ImageArchitect3} borderRadius="15px"/>
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
                                                    Project #3
                                                </Text>
                                                <Text
                                                    fontSize="xl"
                                                    color={textColor}
                                                    fontWeight="bold"
                                                    mb="10px"
                                                >
                                                    Minimalist
                                                </Text>
                                                <Text fontSize="md" color="gray.500" fontWeight="400" mb="20px">
                                                    Different people have different taste, especially various
                                                    types of music.
                                                </Text>
                                                <Flex justifyContent="space-between">
                                                    <Button
                                                        variant="outline"
                                                        colorScheme="purple"
                                                        minW="110px"
                                                        h="36px"
                                                        fontSize="xs"
                                                        px="1.5rem"
                                                    >
                                                        VIEW PROJECT
                                                    </Button>
                                                    <AvatarGroup size="xs">
                                                        <Avatar name="Nautica Nieder" src={'PMlogo.png'}/>
                                                        <Avatar name="Ammon Nieder" src={'legoLavendar.png'}/>
                                                        <Avatar name="Nautica Nieder" src={'PMlogo.png'}/>
                                                        <Avatar name="Ammon Nieder" src={'legoLavendar.png'}/>
                                                    </AvatarGroup>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                        <Button
                                            style={{border: '1px solid #b59eb5'}}
                                            p="0px"
                                            bg="transparent"
                                            color="#9c7e9c"
                                            border="1px solid lightgray"
                                            borderRadius="15px"
                                            minHeight={{sm: "200px", md: "100%"}}
                                        >
                                            <Flex
                                                direction="column"
                                                justifyContent="center"
                                                align="center"
                                            >
                                                <Icon as={FaPlus} fontSize="lg" mb="12px"/>
                                                <Text fontSize="md" fontWeight="bold">
                                                    Add an existing NFT
                                                </Text>
                                            </Flex>
                                        </Button>
                                    </Grid>
                                </CardBody>
                            </Card>
                        </Flex>
                    </Box>
                </Grid>

        </Flex>
    )
};

export default Identity;
