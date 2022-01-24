import * as React from 'react';
import {useState, useEffect} from "react";
import Web3 from "web3";
import type {FC} from 'react';
import MintIdentity from '../../contracts/MintIdentity.json';
import {
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Input,
    Stack,
    Box,
    Button,
    Heading,
    SimpleGrid,
    Text,
    useColorModeValue,
    VisuallyHidden,
    IconButton,
    CloseButton,
    Flex,
    Icon,
    Drawer,
    DrawerContent,
    useDisclosure,
    BoxProps,
    FlexProps, chakra, Center, Image, Avatar, Progress, HTMLChakraProps,
} from '@chakra-ui/react';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import { PMNFI } from '../atoms/PMNFI';
import { DividerWithText } from '../atoms/DividerWithText';
import { Link } from '../atoms/Link';
import {useAppSelector} from "../../app/hooks";
import { ReactNode, ReactText } from 'react';
import PMLogo from '../../PMGIMPResized.png';
import Logo from '../atoms/Logo';
import BoxBox from "../atoms/BoxBox";
import Sidebar from "../molecules/Sidebar";

interface Interface {

}

export const CreatePM: FC<Interface>=(props: HTMLChakraProps<'form'>)=> {

    const accounts = useAppSelector((state) => state.PMI.accounts);
    const status = useAppSelector((state) => state.PMI.status);

    const [name, setName] = useState<string | null>(null);
    const [profession, setProfession] = useState<string | null>(null);
    const [slogan, setSlogan] = useState<string | null>(null);
    const [org, setOrg] = useState<string | null>(null);
    const [descr, setDescr] = useState<string | null>(null);
    const [url, setUrl] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    const [account, setAccount] = useState<string[]>([]);
    const [identities, setIdentities] = useState({});

    const nameChange = (e: any) => {
        console.log(e);
        console.log(e.target.value);
        setName(e.target.value);
    };
    const professionChange = (e: any) => {
        setProfession(e.target.value);
    };
    const sloganChange = (e: any) => {
        setSlogan(e.target.value);
    };
    const orgChange = (e: any) => {
        setOrg(e.target.value);
    };
    const descrChange = (e: any) => {
        setDescr(e.target.value);
    };
    const urlChange = (e: any) => {
        setUrl(e.target.value);
    };
    const emailChange = (e: any) => {
        setEmail(e.target.value);
    };

    return (

        <Flex justify-content={'space-between'}>

            <Flex borderRight="1px solid " borderColor='#daceda'>
                <Sidebar/>
            </Flex>
            <Box flex='auto' style={{border: '1px solid #b59eb5'}} mx={{sm: '12px', xl: '12px'}} borderRadius='8px'
                 py="18px" px="18px" my={{sm: "12px", xl: "12px"}} bg={'pmpurple.1'}>
                <Grid templateColumns='repeat(2, 1fr)' gap={2}>

                    <GridItem colstart={1} rowSpan={1} colSpan={1} w='100%'>


                        <Box flex='auto' style={{border: '1px solid #b59eb5'}} mx={{xl: '8px'}}
                             borderRadius='15px' py="22px" px="56px" my={{xl: "8px"}} bg={'pmpurple.1'}>

                            <Heading textAlign="center" size="xl" fontWeight="extrabold">
                                Mint PaperMaster NFI
                            </Heading>
                            <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
                                <Text as="span">PaperMaster Identities are permanent Blockchain PaperMaster
                                    Non-Fungible-Identity,
                                    future changes require additional minting, please proofread!</Text>
                                {/*<Link href="#">Start free trial</Link>*/}
                            </Text>

                            <chakra.form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    console.log(e.target);
                                    console.log(name)
                                    // your login logic here
                                }}
                                {...props}
                            >
                                <Stack spacing="6">
                                    <FormControl id="name">
                                        <FormLabel>Name</FormLabel>
                                        <Input name="name" onChange={nameChange} type="name" required/>
                                    </FormControl>
                                    <FormControl id="profession">
                                        <FormLabel>profession</FormLabel>
                                        <Input name="profession" onChange={professionChange}
                                               type="profession" />
                                    </FormControl>
                                    <FormControl id="email">
                                        <FormLabel>Email</FormLabel>
                                        <Input name="email" type="email"/>
                                    </FormControl>
                                    <FormControl id="slogan">
                                        <FormLabel>Slogan</FormLabel>
                                        <Input name="slogan" type="slogan"/>
                                    </FormControl>
                                    <FormControl id="org">
                                        <FormLabel>Organization</FormLabel>
                                        <Input name="org" type="org" />
                                    </FormControl>
                                    <FormControl id="url">
                                        <FormLabel>url</FormLabel>
                                        <Input name="url" type="url" />
                                    </FormControl>
                                    <FormControl id="descr">
                                        <FormLabel>Description</FormLabel>
                                        <Input name="descr" type="descr" required/>
                                    </FormControl>
                                </Stack>
                            </chakra.form>
                        </Box>
                    </GridItem>

                    <Box flex='auto' style={{border: '1px solid #b59eb5'}} mx={{xl: '8px'}}
                         borderRadius='15px' py="22px" px="56px" my={{xl: "8px"}} bg={'pmpurple.1'}>

                        <GridItem colstart={2} rowSpan={1} colSpan={1} w='100%'>

                            <Heading textAlign="center" size="xl" fontWeight="extrabold">
                                Your PaperMaster Non-Fungible-Identity
                            </Heading>
                            <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
                                <Text as="span">Below is what your Papermaster Non-Fungible-Identification will
                                    look like, please
                                    make sure you love it!</Text>
                                {/*<Link href="#">Start free trial</Link>*/}
                            </Text>

                            <chakra.form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    // your login logic here
                                }}
                                {...props}
                            >

                                <Box
                                    bg={'pmpurple.6'}
                                    minH="60vh"
                                    py="8"
                                    px={{base: '2', lg: '6'}}
                                >

                                    <Center py={6}>
                                        <Box
                                            maxW={'270px'}
                                            w={'full'}
                                            bg={useColorModeValue('white', 'gray.800')}
                                            boxShadow={'2xl'}
                                            rounded={'md'}
                                            overflow={'hidden'}>
                                            <Image
                                                h={'70px'}
                                                w={'full'}
                                                src='legoLavendarheadercroped.png'
                                                objectFit={'cover'}
                                            />
                                            <Flex justify={'center'} mt={-12}>
                                                <Avatar
                                                    size={'lg'}
                                                    src='PMlogo.png'
                                                    css={{
                                                        border: '2px solid white',
                                                    }}
                                                />
                                            </Flex>

                                            <Box p={6}>
                                                <Stack spacing={0} align={'center'} mb={5}>
                                                    <Heading fontSize={'2xl'} fontWeight={500}
                                                             fontFamily={'body'} align={'center'}>
                                                        PaperMaster Andrew the Tusken from Mos Eisley
                                                    </Heading>
                                                    <Text align={'center'} color={'gray.500'}>Mos Eisley
                                                        Software Developer</Text>
                                                    <Text align={'center'}
                                                          color={'gray.500'}>www.ramonajenny.com</Text>
                                                    <Text align={'center'}
                                                          color={'gray.500'}>ramonajenny@gmail.com</Text>
                                                    <Text align={'center'} color={'gray.500'}>PaperMaster
                                                        Non-Fungible-Identification</Text>
                                                    <Text align={'center'}
                                                          color={'gray.500'}>sdkrhwer93847538475kjekhfskjjhdfsdjf</Text>
                                                </Stack>

                                                <Stack direction={'row'} justify={'center'} spacing={6}>
                                                    <Stack spacing={0} align={'center'}>
                                                        <Text fontWeight={600}>57</Text>
                                                        <Text fontSize={'sm'} color={'gray.500'}>
                                                            Validations
                                                        </Text>
                                                    </Stack>
                                                    <Stack spacing={0} align={'center'}>
                                                        <Text fontWeight={600}>23k</Text>
                                                        <Text fontSize={'sm'} color={'gray.500'}>
                                                            Mentions
                                                        </Text>
                                                    </Stack>
                                                    <Stack spacing={0} align={'center'}>
                                                        <Text fontWeight={600}>2</Text>
                                                        <Text fontSize={'sm'} color={'gray.500'}>
                                                            Reported
                                                        </Text>
                                                    </Stack>
                                                </Stack>

                                                <Button
                                                    w={'full'}
                                                    mt={8}
                                                    bg={useColorModeValue('#4f384f', 'gray.900')}
                                                    color={'white'}
                                                    rounded={'md'}
                                                    _hover={{
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: 'lg',
                                                    }}>
                                                    PMNFI: sdkrhwer93847538475kjekhfskjjhdfsdjf
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Center>
                                    <Center>
                                        <Button
                                            isLoading
                                            loadingText='Submitting'
                                            colorScheme='purple'
                                            variant='outline'
                                        >
                                            Submit
                                        </Button>
                                    </Center>
                                    <Progress hasStripe value={20} size='xs' colorScheme='pink'/>
                                </Box>
                            </chakra.form>

                        </GridItem>
                    </Box>
                </Grid>
            </Box>
        </Flex>
    )
};

export default CreatePM;