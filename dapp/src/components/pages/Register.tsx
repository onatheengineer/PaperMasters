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
    VStack,
    HStack,
    Textarea, Divider,
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


        <Flex>
            <Box
                w={"50%"}
                showBorder={true}
                border={'2px'}
                borderStyle={'solid'}
                borderColor={'pmpurple.13'}
                mx={{xl: '8px'}}
                borderRadius='15px'
                py="22px" px="56px"
                my={{xl: "8px"}}
                bg={'pmpurple.1'}
                align="center"
            >
                <Flex flexDirection={'column'}>


                    <Heading textAlign="center" size="xl" fontWeight="extrabold">
                        Mint PaperMaster NFI
                    </Heading>

                    <Text mt="4" mb="8" align="center" maxW="100%" fontWeight="medium">
                        <Text as="span">PaperMaster Identities are permanent Blockchain PaperMaster
                            Non-Fungible-Identity, future changes require additional minting, please proofread!</Text>
                    </Text>
                </Flex>
                <Stack spacing="6">
                    <FormControl isRequired>
                        <FormLabel htmlFor='name'>Name</FormLabel>
                        <Input focusBorderColor='pmpurple.9' id='name' placeholder='name, company'
                               isDisabled={submitButtonClicked}
                               onChange={nameHandler}/>
                        <FormErrorMessage>Field is required.</FormErrorMessage>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='email'>Email</FormLabel>
                        <Input focusBorderColor='pmpurple.9' id='email' placeholder='email'
                               isDisabled={submitButtonClicked}
                               onChange={emailHandler}/>

                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='profession'>Profession</FormLabel>
                        <Input focusBorderColor='pmpurple.9' id='profession' placeholder='profession'
                               isDisabled={submitButtonClicked}
                               onChange={professionHandler}/>

                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='slogan'>Slogan</FormLabel>
                        <Input focusBorderColor='pmpurple.9' id='slogan' placeholder='slogan'
                               isDisabled={submitButtonClicked}
                               onChange={sloganHandler}/>

                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='organization'>Organization</FormLabel>
                        <Input focusBorderColor='pmpurple.9' id='organization' placeholder='organization'
                               isDisabled={submitButtonClicked}
                               onChange={organizationHandler}/>

                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='Website'>website</FormLabel>
                        <Input focusBorderColor='pmpurple.9' id='website' placeholder='website, url'
                               isDisabled={submitButtonClicked}
                               onChange={websiteHandler}/>

                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='uniqueYou'>Your Uniqueness</FormLabel>
                        <Input focusBorderColor='pmpurple.9' id='uniqueYou'
                               placeholder='About you, date of birth, also known as, anything and everything but keep it short'
                               isDisabled={submitButtonClicked} onChange={uniqueYouHandler}/>

                    </FormControl>
                </Stack>
            </Box>


            <Box
                w={"50%"}
                showBorder={true}
                border={'2px'}
                borderStyle={'solid'}
                borderColor={'pmpurple.13'}
                mx={{xl: '8px'}}
                borderRadius='15px'
                py="22px" px="56px"
                my={{xl: "8px"}}
                bg={'pmpurple.1'}
                align="center"
            >
                <Flex flexDirection={'column'}>

                    <Heading textAlign="center" size="xl" fontWeight="extrabold">
                        Your PaperMaster Non-Fungible-Identity
                    </Heading>

                    <Text mt="4" mb="8" align="center" maxW="100%" fontWeight="medium">
                        Below is what your Papermaster Non-Fungible-Identification will
                        look like, please make sure you love it!
                    </Text>
                </Flex>

                <AspectRatio w='320px' ratio={4 / 5}>
                    <Box
                        h={"100%"}
                        w={'full'}
                        border={'3px'}
                        rounded={'12px'}
                        borderColor={'pmpurple.13'}
                        borderStyle={'solid'}
                        bg={'pmpurple.13'}
                    >

                        <Stack
                            h={"100%"}
                            w={'full'}
                            align={'center'}
                            spacing={0}
                            bg={'pmpurple.2'}
                            wordBreak={'break-word'}
                            rounded={'12px'}
                        >

                            <Image
                                position={'absolute'}
                                top={'0px'}
                                right={'0px'}
                                left={'0px'}
                                //borderRadius='full'
                                h={'60px'}
                                // w={'110%'}
                                backgroundPosition="center"
                                src='legoLavendarheadercroped.png'
                                objectFit={'cover'}
                            />

                            <Flex justify={'center'}>
                                <Avatar
                                    mt={'22px'}
                                    src='PMlogo.png'
                                    boxSize='3.05em'
                                    css={{
                                        border: '2px solid #4f384f',
                                    }}
                                >
                                    <AvatarBadge
                                        border={'1px'}
                                        borderColor={'pmpurple.15'}
                                        borderStyle={'solid'}
                                        boxSize='1.25em'
                                        bg='pmpurple.2'>
                                        <Text mt='0px' fontSize={'12px'} fontWeight={500}
                                              fontFamily={'body'} align={'center'} color={'pmpurple.15'}>
                                            NFI
                                        </Text>
                                    </AvatarBadge>
                                </Avatar>
                            </Flex>


                            <Text pt={'0px'} fontSize={'22px'} fontWeight={500}
                                  fontFamily={'body'} align={'center'} color={'pmpurple.15'}>
                                PaperMaster
                            </Text>
                            <Text noOfLines={2} py={'0px'} fontSize={'18px'} fontWeight={500}
                                  fontFamily={'body'} align={'center'} color={'pmpurple.15'}>
                                {name}
                            </Text>

                            <Divider css={{borderColor: '#a88ea8'}}/>
                            <Flex
                                flexGrow={'1'}
                                flexDirection={'row'}
                                border={'0px'}
                                borderColor={'pmpurple.15'}
                                borderStyle={'solid'}
                                textAlign={'center'}

                                maxH={'20vh'}
                            >
                                <Center>
                                    <VStack
                                        align={'center'}
                                        fontSize={'16px'}
                                        px={'18px'}
                                        spacing={0}
                                        alignItems={"center"}
                                    >

                                        <Text noOfLines={1} color={'pmpurple.15'}>
                                            {email}
                                        </Text>
                                        <Text noOfLines={1} color={'pmpurple.15'}>
                                            {profession}
                                        </Text>
                                        <Text noOfLines={1} color={'pmpurple.15'}>
                                            {slogan}
                                        </Text>
                                        <Text noOfLines={1} color={'pmpurple.15'}>
                                            {organization}
                                        </Text>
                                        <Text noOfLines={1} color={'pmpurple.15'}>
                                            {website}
                                        </Text>
                                        <Text noOfLines={2} color={'pmpurple.12'}>
                                            {uniqueYou}
                                        </Text>
                                    </VStack>
                                </Center>
                            </Flex>

                            <Box>
                                <Text as='cite' mb={'0px'} pb={'0px'} fontSize={'sm'} color={'pmpurple.12'}>
                                    Origin Date {originDateFormatted}
                                </Text>

                                <Button
                                    w={'90%'}
                                    pb={'0px'}
                                    m={'0px'}
                                    mt={'0px'}
                                    mb={'8px'}
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
                            </Box>
                        </Stack>
                    </Box>
                </AspectRatio>


                <Center>
                    {name !== "" ?
                        <Button
                            align={'center'}
                            mt={"18px"}
                            mb={"2px"}
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
                            loadingText='Submitting to the Blockchain for minting, this can take up to 10 minutes'
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

        </Flex>
    )
};

export default Register;