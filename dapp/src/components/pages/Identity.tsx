import * as React from 'react';
import type {FC} from 'react';
import {Link as ReachLink, useParams} from "react-router-dom";
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
    HStack, useDisclosure,
    VStack, Container, AspectRatio, AvatarBadge, Divider, Center, InputRightElement, useStyleConfig,
} from "@chakra-ui/react";
import { RiShareForwardLine} from 'react-icons/ri';
// Custom components
import { BsFillCloudRainFill } from 'react-icons/bs'
// Assets
import ImageArchitect1 from "../../assets/img/ImageArchitect1.png";
import ImageArchitect2 from "../../assets/img/ImageArchitect2.png";
import ImageArchitect3 from "../../assets/img/ImageArchitect3.png";
import ProfileBgImage from "../../assets/img/ProfileBackground.png";
import { FaCube, FaFacebook, FaInstagram, FaPenFancy, FaPlus, FaTwitter,} from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";
import Sidebar from "../Sidebar";
import {GiNewShoot} from "react-icons/gi";
import {useAppSelector} from "../../app/hooks";
import {SiSololearn} from "react-icons/si";
import {accountsArr} from "../../features/RequestWalletAccountSlice";
import {MdOutlineColorLens} from "react-icons/md";
import AvatarNFI from "../AvatarNFI";
import bgImage from '../../assets/legoLavendarheadercroped.png'
import {useState} from "react";

function Card(props: any) {
    const { variant, children, ...rest } = props;
    const styles = useStyleConfig("Card", { variant });
    // Pass the computed styles into the `__css` prop
    return (
        <Box __css={styles} {...rest}>
            {children}
        </Box>
    );
}

function CardBody(props: any) {
    const { variant, children, ...rest } = props;
    const styles = useStyleConfig("CardBody", { variant });
    // Pass the computed styles into the `__css` prop
    return (
        <Box __css={styles} {...rest}>
            {children}
        </Box>
    );
}

function CardHeader(props: any) {
    const { variant, children, ...rest } = props;
    const styles = useStyleConfig("CardHeader", { variant });
    // Pass the computed styles into the `__css` prop
    return (
        <Box __css={styles} {...rest}>
            {children}
        </Box>
    );
}


interface Interface {

}


export const Identity:FC<Interface>=()=> {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef()
    const finalRef = React.useRef()
    // Chakra color mode
    const textColor = useColorModeValue("#5c415c", "white");

    const filledAccountsArr = useAppSelector((state) => state.register.accounts);
    const tokenIDtoIdentityStruct = useAppSelector((state) => state.minted.tokenIDtoIdentityStruct);



    console.log(tokenIDtoIdentityStruct);


    return (
        <Flex>
            <Stack bg={"pmpurple.2"}>
                <Box
                    bgImage={bgImage}
                    w="100%"
                    h="200px"
                    bgPosition="0%"
                    bgRepeat="repeat"
                    position="relative"
                    display="flex"
                    justifyContent="center"
                    mb={'70px'}
                    top={'0px'}
                    right={'0px'}
                    left={'0px'}
                    backgroundPosition="center"
                    objectFit={'cover'}
                >
                    <Flex
                        direction={{sm: "column", md: "row"}}
                        left={'10px'}
                        right={'10px'}
                        //maxH="330px"
                        justifyContent={{sm: "center", md: "space-between"}}
                        backdropFilter="saturate(100%) blur(50px)"
                        position="absolute"
                        boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
                        border="2px solid "
                        borderColor='#694b69'
                        p="18px"
                        borderRadius="20px"
                        transform={{
                            sm: "translateY(45%)",
                            md: "translateY(90%)",
                            lg: "translateY(85%)",
                        }}
                    >
                        <Flex
                            align="center"
                            direction={{sm: "column", md: "row"}}
                            w={{sm: "100%"}}
                            //textAlign={{sm: "center", md: "start"}}
                            bg={'transparent'}
                            //border="2px solid yellow"
                            m={"0px"}
                            p={'0px'}
                        >
                            <Avatar
                                me={{md: "22px"}}
                                src='' //this is the profile image
                                w="98px"
                                h="98px"
                                mb={"6px"}
                                borderRadius="10px"
                            />
                            <Flex direction="column" maxWidth="100%"
                                  m={"0px"}
                                  p={'0px'}
                                  h={'100%'}
                                  // border="2px solid "
                                  // borderColor='red'
                            >
                                {filledAccountsArr.length === 0 ?
                                    <Text
                                        fontSize={{sm: "lg", lg: "xl"}}
                                        color={'#271c27'}
                                        fontWeight="bold"
                                        ms={{sm: "8px", md: "0px"}}
                                    >
                                        Non-Registered Wallet Account
                                    </Text>

                                    : <Flex alignItems={'center'}> {filledAccountsArr[0]} </Flex>}

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
                        <VStack direction={'row'} justify={'center'} spacing={6}
                                // border="2px solid "
                                // borderColor='red'
                        >

                            <Flex
                                direction={{sm: "column", lg: "row"}}
                                w={{sm: "100%", md: "50%", lg: "auto"}}
                                // border="2px solid "
                                // borderColor='blue'
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
                                        _hover={{
                                            transform: 'translateY(4px)',
                                            //boxShadow: 'md',
                                        }}
                                    >
                                        <Icon as={FaCube} me="6px"/>
                                        <Text fontSize="sm" color={textColor} fontWeight="bold">
                                            {/*//when I click on this button I want it to route me to the validations page*/}
                                            <Link as={ReachLink} to={'/validate'}  _hover={{ textDecor: 'none' }}>
                                                NFI:
                                                Transaction Hash --connect to HarmonyOne
                                            </Link>
                                        </Text>
                                    </Flex>
                                </Button>
                            </Flex>
                            <HStack spacing={'34px'} >
                                <Stack spacing={'0px'} align={'center'}>
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
                                <Stack spacing={0} align={'center'}>
                                    <Text fontWeight={600}>23k</Text>
                                    <Text fontSize={'sm'} color={'pmpurple.11'}>
                                        Report this NFI
                                    </Text>
                                </Stack>
                            </HStack>

                        </VStack>
                    </Flex>
                </Box>
                <Stack p={'10px'}>

                    <Card borderRadius='15px' bg='white' p="12px" px="24px">
                        <CardHeader p="12px 5px" mb="0px">
                            <Text fontSize="lg" color={textColor} fontWeight="bold">
                                Description
                            </Text>
                        </CardHeader>
                        <CardBody px="5px">
                            <Flex direction="column">
                                <Text fontSize="md" color="gray.500" fontWeight="400" mb="20px">
                                    Mathematics may not teach us how to add love or subtract hate, but it gives
                                    us every reason to hope that every problem has a solution.
                                </Text>
                            </Flex>
                        </CardBody>
                    </Card>
                        <HStack spacing={'10px'}  align='stretch' justify={'space-evenly'}>
                            <Card w='33%' borderRadius='15px' bg='white' p="16px" px="24px">
                                <CardHeader p="12px 5px" mb="12px">
                                    <Text fontSize="lg" color={textColor} fontWeight="bold">
                                        Alias / User Names / Also Known As
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
                                                Email me when my NFI attached NFTs sell
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
                            <Card w='33%' borderRadius='15px' bg='white' p="16px" px="24px">
                                <CardHeader p="12px 5px" mb="12px">
                                    <Text fontSize="lg" color={textColor} fontWeight="bold">

                                        </Text>
                                </CardHeader>
                                <CardBody px="5px">

                                    {filledAccountsArr.length !== 0 && tokenIDtoIdentityStruct.length !== 0 ?

                                       <AvatarNFI accountNumber={tokenIDtoIdentityStruct[0]}
                                                  name={tokenIDtoIdentityStruct[1].split("|||")[0]}
                                                  nameColor={tokenIDtoIdentityStruct[1].split("|||")[1]}
                                                  email={tokenIDtoIdentityStruct[2].split("|||")[0]}
                                                  emailColor={tokenIDtoIdentityStruct[2].split("|||")[1]}
                                                  profession={tokenIDtoIdentityStruct[3].split("|||")[0]}
                                                  professionColor={tokenIDtoIdentityStruct[3].split("|||")[1]}
                                                  organization={tokenIDtoIdentityStruct[4].split("|||")[0]}
                                                  organizationColor={tokenIDtoIdentityStruct[4].split("|||")[1]}
                                                  slogan={tokenIDtoIdentityStruct[5].split("|||")[0]}
                                                  sloganColor={tokenIDtoIdentityStruct[5].split("|||")[1]}
                                                  website={tokenIDtoIdentityStruct[6].split("|||")[0]}
                                                  websiteColor={tokenIDtoIdentityStruct[6].split("|||")[1]}
                                                  uniqueYou={tokenIDtoIdentityStruct[7].split("|||")[0]}
                                                  uniqueYouColor={tokenIDtoIdentityStruct[7].split("|||")[1]}
                                                  avatarBG={tokenIDtoIdentityStruct[8]}
                                                  originDate={parseInt(tokenIDtoIdentityStruct[9])}
                                                   />
                                           :

                                        <Button
                                            w={'100%'}
                                            p={"6px"}
                                            mt={'62px'}
                                            bg={'pmpurple.2'}
                                            h='10.00rem'
                                            //size='lg'
                                            borderRadius={'20px'}
                                            borderStyle={'solid'}
                                            border={'4px'}
                                            borderColor={'pmpurple.6'}
                                            textDecoration={'none'}
                                            _hover={{
                                                transform: 'translateY(-2px)',
                                                boxShadow: 'xl',
                                            }}
                                        >
                                        <Link as={ReachLink} to='/register'
                                              _hover={{ textDecor: 'none' }}
                                              cursor={'pointer'}
                                        >
                                            <CardHeader p="12px 5px" mb="12px">
                                                <HStack>
                                                <Text p='12px' textAlign={'center'} fontSize="xl" color={'pmpurple.13'} fontWeight="bold" whiteSpace={'pre-wrap'} >
                                                    NFI will display here, please mint an NFI to your wallet account
                                                </Text>
                                                    <Box position={"absolute"} bottom={'10px'} right={"10px"}>
                                                        <RiShareForwardLine fontSize={'40px'} />
                                                    </Box>

                                            </HStack>
                                            </CardHeader>

                                        </Link>
                                        </Button>
                                    }
                                </CardBody>
                            </Card>

                            <Card w='33%' borderRadius='15px' bg='white' p="16px" px="24px">
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
                                                        Hi! I need more information about your upcoming project...
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
                        </HStack>
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
                                            My future project...
                                        </Text>
                                        <Text fontSize="md" color="gray.500" fontWeight="400" mb="20px">
                                            As I look through my bucket list, I find my next endeavor...
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
                                            Back in the day
                                        </Text>
                                        <Text fontSize="md" color="gray.500" fontWeight="400" mb="20px">
                                            Drawing was the thing to do, now it's digital art.
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
                                            Nowadays
                                        </Text>
                                        <Text fontSize="md" color="gray.500" fontWeight="400" mb="20px">
                                            Different people have different taste, especially various
                                            types of NFTs.
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
                </Stack>

            </Stack>
        </Flex>
    )
};

export default Identity;
