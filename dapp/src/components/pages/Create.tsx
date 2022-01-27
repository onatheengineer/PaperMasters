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
    FlexProps, chakra, Center, Image, Avatar, Progress, HTMLChakraProps, FormHelperText, FormErrorMessage,
} from '@chakra-ui/react';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import { PMNFI } from '../atoms/PMNFI';
import { DividerWithText } from '../atoms/DividerWithText';
import { Link } from '../atoms/Link';
import {useAppSelector} from "../../app/hooks";
import { ReactNode, ReactText } from 'react';
import PMLogo from '../../PMGIMPResized.png';
import Logo from '../atoms/Logo';
import SidebarCreate from "../molecules/Sidebars/SidebarCreate";

interface Interface {

}

export const Create: FC<Interface>=(props: HTMLChakraProps<'form'>)=> {

    const accounts = useAppSelector((state) => state.PMI.accounts);
    const status = useAppSelector((state) => state.PMI.status);

    const [name, setName] = useState<string | null>(null);
    const [profession, setProfession] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [slogan, setSlogan] = useState<string | null>(null);
    const [organization, setOrganization] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [url, setUrl] = useState<string | null>(null);


    const [account, setAccount] = useState<string[]>([]);
    const [identities, setIdentities] = useState({});

    const nameHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
    };

    const professionHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setProfession(e.currentTarget.value);
    };
    const emailHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
    };
    const sloganHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setSlogan(e.currentTarget.value);
    };
    const organizationHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setOrganization(e.currentTarget.value);
    };
    const descriptionHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setDescription(e.currentTarget.value);
    };
    const urlHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setUrl(e.currentTarget.value);
    };


    return (

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
                                    <FormControl isRequired>
                                        <FormLabel htmlFor='name'>Name</FormLabel>
                                        <Input id='name' placeholder='name, company' onChange={nameHandler}/>
                                        <FormErrorMessage>Field is required.</FormErrorMessage>

                                    </FormControl>
                                    <FormControl >
                                        <FormLabel htmlFor='profession'>Profession</FormLabel>
                                        <Input id='profession' placeholder='profession' onChange={professionHandler}/>

                                    </FormControl>
                                    <FormControl >
                                        <FormLabel htmlFor='email'>Email</FormLabel>
                                        <Input id='email' placeholder='email' onChange={emailHandler} />

                                    </FormControl>
                                    <FormControl >
                                        <FormLabel htmlFor='slogan'>Slogan</FormLabel>
                                        <Input id='slogan' placeholder='slogan' onChange={sloganHandler}/>

                                    </FormControl>
                                    <FormControl >
                                        <FormLabel htmlFor='organization'>Organization</FormLabel>
                                        <Input id='organization' placeholder='organization' onChange={organizationHandler}/>

                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor='url'>url</FormLabel>
                                        <Input id='url' placeholder='url' onChange={urlHandler} />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel htmlFor='description'>Description</FormLabel>
                                        <Input id='description' placeholder='description' onChange={descriptionHandler}/>
                                        <FormErrorMessage>Field is required.</FormErrorMessage>
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
                        {/*this is the start of the avatar*/}
                                    <Center py={6}>
                                        <Box
                                            maxW={'320px'}
                                            w={'full'}
                                            bg={useColorModeValue('white', 'gray.800')}
                                            boxShadow={'2xl'}
                                            rounded={'md'}
                                            overflow={'hidden'}
                                            //backgroundImage='legoLavendarheadercroped.png'
                                            //backgroundPosition="center"
                                            //backgroundRepeat="no-repeat"
                                            >
                                            <Image
                                                h={'70px'}
                                                w={'full'}
                                                backgroundPosition="center"
                                                src='legoLavendarheadercroped.png'
                                                objectFit={'cover'}
                                            />
                                            <Flex justify={'center'} mt={-10}>
                                                <Avatar
                                                    size={'lg'}
                                                    src='PMlogo.png'
                                                    css={{
                                                        border: '2px solid white',
                                                    }}
                                                />
                                            </Flex>

                                            <Box px={'16px'}>
                                                <Stack spacing={0} align={'center'} mb={5} wordBreak={'break-word'}>
                                                    <Text mt='0px' fontSize={'24px'} fontWeight={500}
                                                          fontFamily={'body'} align={'center'} color={'pmpurple.15'}>
                                                        PaperMaster
                                                    </Text>
                                                    <Text mt='0px' fontSize={'20px'} fontWeight={500}
                                                             fontFamily={'body'} align={'center'} color={'pmpurple.15'}>
                                                        {name}
                                                    </Text>

                                                    <Text align={'center'} color={'pmpurple.15'}>
                                                        {profession}
                                                    </Text>
                                                    <Text align={'center'} color={'pmpurple.15'}>
                                                        {email}
                                                    </Text>
                                                    <Text align={'center'} color={'pmpurple.15'}>
                                                        {slogan}
                                                    </Text>
                                                    <Text align={'center'} color={'pmpurple.15'}>
                                                        {organization}
                                                    </Text>
                                                    <Text align={'center'} color={'pmpurple.15'}>
                                                        {url}
                                                    </Text>
                                                    <Text align={'center'} color={'pmpurple.10'} >
                                                        {description}
                                                    </Text>
                                            </Stack>

                                                <Stack direction={'row'} justify={'center'} spacing={6} >
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
                                                    <Stack spacing={0} align={'center'} whiteSpace={'pre'}>
                                                        <Text fontWeight={600}>Dec 30, 1976</Text>
                                                        <Text fontSize={'sm'} color={'pmpurple.11'}>
                                                            Origin Date
                                                        </Text>
                                                    </Stack>
                                                </Stack>
                                                <Text mt='12px' align={'center'} color={'pmpurple.11'}>
                                                    PaperMaster NFI
                                                </Text>

                                                <Button
                                                    w={'full'}
                                                    mt={2}
                                                    mb={2}
                                                    bg={'pmpurple.13'}
                                                    color={'white'}
                                                    rounded={'md'}
                                                    _hover={{
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: 'lg',
                                                    }}>
                                                    NFI Identification string will show once minted
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

    )
};

export default Create;