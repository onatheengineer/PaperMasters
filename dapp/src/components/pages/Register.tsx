import * as React from 'react';
import {useState, useEffect} from "react";
import Web3 from "web3";
import type {FC} from 'react';
import {
    FormControl,
    FormLabel,
    Grid,
    Input,
    Stack,
    Box,
    Button,
    Heading,
    Text,
    Flex,
    AspectRatio,
    Center,
    Image,
    Avatar,
    Progress,
    FormErrorMessage,
    GridItem,
    AvatarBadge,
} from '@chakra-ui/react';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import {useAppSelector} from "../../app/hooks";
import PMLogo from '../../assets/PMGIMPResized.png';
import Logo from '../../assets/Logo';


interface Interface {

}

export const Register: FC<Interface>=()=> {

    const accounts = useAppSelector((state) => state.register.accounts);
    const status = useAppSelector((state) => state.register.status);

    const [name, setName] = useState<string>("");
    const [profession, setProfession] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [slogan, setSlogan] = useState<string | null>(null);
    const [organization, setOrganization] = useState<string | null>(null);
    const [uniqueYou, setuniqueYou] = useState<string | null>(null);
    const [website, setWebsite] = useState<string | null>(null);

    const [submitButtonClicked, setSubmitButtonClicked] = useState<boolean>(false);

    const [originDate, setOriginDate] = useState(new Date())
    console.log(originDate.getTime());
    const originDateFormatted: string = `${originDate.toLocaleString('en-us', {month: 'short'})} ${originDate.getDate()}, ${originDate.getFullYear()}`

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
    const uniqueYouHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setuniqueYou(e.currentTarget.value);
    };
    const websiteHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setWebsite(e.currentTarget.value);
    };


    return (


        <Grid templateColumns='repeat(2, 1fr)' gap={'0px'}>

            {/*<GridItem colstart={1} rowSpan={1} colSpan={1} w='100%'>*/}

            <Box flex='auto' style={{border: '1px solid #b59eb5'}} mx={{xl: '8px'}}
                 borderRadius='15px' py="22px" px="56px" my={{xl: "8px"}} bg={'pmpurple.1'}>

                <Heading textAlign="center" size="xl" fontWeight="extrabold">
                    Mint PaperMaster NFI
                </Heading>

                <Text mt="4" mb="8" align="center" maxW="100%" fontWeight="medium">
                    <Text as="span">PaperMaster Identities are permanent Blockchain PaperMaster
                        Non-Fungible-Identity, future changes require additional minting, please proofread!</Text>
                </Text>

                <Stack spacing="6">
                    <FormControl isRequired>
                        <FormLabel htmlFor='name'>Name</FormLabel>
                        <Input id='name' placeholder='name, company' isDisabled={submitButtonClicked}
                               onChange={nameHandler}/>
                        <FormErrorMessage>Field is required.</FormErrorMessage>
                        //40 characters , make logic to take out leading or trailing spaces - js TRIM
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='email'>Email</FormLabel>
                        <Input id='email' placeholder='email' isDisabled={submitButtonClicked}
                               onChange={emailHandler}/>
                        //40 characters
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='profession'>Profession</FormLabel>
                        <Input id='profession' placeholder='profession' isDisabled={submitButtonClicked}
                               onChange={professionHandler}/>
                        //30 characters , make logic to take out leading or trailing spaces
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='slogan'>Slogan</FormLabel>
                        <Input id='slogan' placeholder='slogan' isDisabled={submitButtonClicked}
                               onChange={sloganHandler}/>
                        //80 characters
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='organization'>Organization</FormLabel>
                        <Input id='organization' placeholder='organization' isDisabled={submitButtonClicked}
                               onChange={organizationHandler}/>
                        //60 characters
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='Website'>website</FormLabel>
                        <Input id='website' placeholder='website, url' isDisabled={submitButtonClicked}
                               onChange={websiteHandler}/>
                        //40 characters
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='uniqueYou'>Your Uniqueness</FormLabel>
                        <Input id='uniqueYou'
                               placeholder='About you, date of birth, also known as, anything and everything but keep it short'
                               isDisabled={submitButtonClicked} onChange={uniqueYouHandler}/>
                        //200 characters
                    </FormControl>
                </Stack>
            </Box>
            {/*</GridItem>*/}


            {/*<GridItem colstart={2} rowSpan={1} colSpan={2} w='100%'>*/}

            <Box
                flex='auto'
                showBorder={true}
                border={'2px'}
                borderStyle={'solid'}
                borderColor={'pmpurple.13'}
                mx={{xl: '8px'}}
                borderRadius='15px'
                py="22px" px="56px"
                my={{xl: "8px"}}
                bg={'pmpurple.1'}>

                <Heading textAlign="center" size="xl" fontWeight="extrabold">
                    Your PaperMaster Non-Fungible-Identity
                </Heading>

                <Text mt="4" mb="8" align="center" maxW="100%" fontWeight="medium">
                    Below is what your Papermaster Non-Fungible-Identification will
                    look like, please make sure you love it!
                </Text>


                    <AspectRatio maxW='320px' ratio={4 / 5} bg={'red'}>

                        <Center>
                            <Box
                                centerContent
                                // maxW={'320px'}
                                //ratio={4 / 5}
                                w={'full'}
                                bg={'pmpurple.2'}
                                rounded={'md'}
                                overflow={'hidden'}
                                //backgroundImage='legoLavendarheadercroped.png'
                                //backgroundPosition="center"
                                //backgroundRepeat="no-repeat"
                            >
                                <Image
                                    h={'60px'}
                                    w={'full'}
                                    backgroundPosition="center"
                                    src='legoLavendarheadercroped.png'
                                    objectFit={'cover'}
                                />
                                <Flex justify={'center'} mt={-10}>
                                    <Avatar
                                        size={'lg'}
                                        src='PMlogo.png'
                                        border={'2px'}
                                        borderColor={'white'}
                                        borderStyle={'solid'}
                                    >
                                        <AvatarBadge
                                            border={'1px'}
                                            borderColor={'pmpurple.15'}
                                            borderStyle={'solid'}
                                            boxSize='1.10em'
                                            bg='pmpurple.2'>
                                            <Text mt='0px' fontSize={'12px'} fontWeight={500}
                                                  fontFamily={'body'} align={'center'} color={'pmpurple.15'}>
                                                NFI
                                            </Text>
                                        </AvatarBadge>
                                    </Avatar>
                                </Flex>


                                    <Stack spacing={0} align={'center'} mb={3} wordBreak={'break-word'}>


                                        {/*ﯹ*/}
                                        <Text mt='0px' fontSize={'22px'} fontWeight={500}
                                              fontFamily={'body'} align={'center'} color={'pmpurple.15'}>
                                            PaperMaster ﯹ
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
                                            {website}
                                        </Text>
                                        <Text align={'center'} color={'pmpurple.10'}>
                                            {uniqueYou}
                                        </Text>
                                        <Text fontSize={'sm'} color={'pmpurple.11'}>
                                            Origin Date {originDateFormatted}
                                        </Text>
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
                                            <Text fontSize={'sm'} color={'white'}>
                                                {/*NFI Identification string will show once minted*/}
                                                0x0000000000000000000000000000000 <br/>
                                                000000000000000000000000000000000
                                            </Text>
                                        </Button>

                                    </Stack>

                            </Box>
                        </Center>
                    </AspectRatio>


                <Center>
                    {name !== "" ?
                        <Button
                            onClick={() => {
                                console.log('Im submitting my mint')
                                console.log(name)
                                console.log(email)
                                console.log(profession)
                                console.log(slogan)
                                console.log(organization)
                                console.log(website)
                                console.log(uniqueYou)
                                setSubmitButtonClicked(true)
                                //dispatch sage action mintIdentitySaga
                            }}
                            isLoading={submitButtonClicked}
                            loadingText='Submitting'
                            colorScheme='"#9c7e9c"'
                            variant='outline'
                        >
                            Submit
                        </Button>
                        : null}
                </Center>

                <Progress hasStripe value={64} size='md' colorScheme="purple" mt={'16px'}/>

                {/*</GridItem>*/}
            </Box>
        </Grid>

    )
};

export default Register;