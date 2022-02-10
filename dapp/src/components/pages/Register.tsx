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
    Textarea,
    Divider,
    InputGroup,
    InputRightAddon,
    InputRightElement,
    PopoverHeader,
    PopoverContent,
    PopoverCloseButton, PopoverBody, PopoverArrow, PopoverFooter, PopoverTrigger, Popover, Portal, MenuItem,
} from '@chakra-ui/react';
import {FaFacebook, FaGithub, FaGoogle, FaScroll} from 'react-icons/fa';
import { MdOutlineColorLens} from 'react-icons/md';
import {useAppSelector} from "../../app/hooks";
import PMLogo from '../../assets/PMGIMPResized.png';
import Logo from '../../assets/Logo';
import {ColorChangeHandler, ColorResult, SketchPicker, GithubPicker, RGBColor} from 'react-color';




interface InterfaceRegister {

}



export const Register: FC<InterfaceRegister>=()=> {

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



    const [colorBG, setColorBG] = useState<ColorResult>({hex: '#f2eef2', rgb:{r:242, g:238, b:242, a:1}, hsl:{h: 300, s:0.13333333333333283, l:0.9411764705882353, a:1}});
    const [colorTextName, setColorTextName] = useState<ColorResult>({hex:'#906e90', rgb:{r:144, g:110, b:144, a:1}, hsl:{h: 300, s:0.1338582677165354, l:0.4980392156862745, a:1}});
    const [colorTextEmail, setColorTextEmail] = useState<ColorResult>({hex:'#906e90', rgb:{r:144, g:110, b:144, a:1}, hsl:{h: 300, s:0.1338582677165354, l:0.4980392156862745, a:1}});
    const [colorTextProfession, setColorTextProfession] = useState<ColorResult>({hex:'#906e90', rgb:{r:144, g:110, b:144, a:1}, hsl:{h: 300, s:0.1338582677165354, l:0.4980392156862745, a:1}});
    const [colorTextSlogan, setColorTextSlogan] = useState<ColorResult>({hex:'#906e90', rgb:{r:144, g:110, b:144, a:1}, hsl:{h: 300, s:0.1338582677165354, l:0.4980392156862745, a:1}});
    const [colorTextOrganization, setColorTextOrganization] = useState<ColorResult>({hex:'#906e90', rgb:{r:144, g:110, b:144, a:1}, hsl:{h: 300, s:0.1338582677165354, l:0.4980392156862745, a:1}});
    const [colorTextWebsite, setColorTextWebsite] = useState<ColorResult>({hex:'#906e90', rgb:{r:144, g:110, b:144, a:1}, hsl:{h: 300, s:0.1338582677165354, l:0.4980392156862745, a:1}});
    const [colorTextUniqueYou, setColorTextUniqueYou] = useState<ColorResult>({hex:'#906e90', rgb:{r:144, g:110, b:144, a:1}, hsl:{h: 300, s:0.1338582677165354, l:0.4980392156862745, a:1}});


    const [whichColorField, setWhichColorField] = useState<string>('');


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


    const colorChangeHandler: ColorChangeHandler = (colorSelect: ColorResult) => {
        switch (whichColorField) {
            case 'colorBG':
                setColorBG(colorSelect);
                break;
            case "name":
                setColorTextName(colorSelect);
                break;
            case 'email':
                setColorTextEmail(colorSelect);
                break;
            case 'profession':
                setColorTextProfession(colorSelect);
                break;
            case 'slogan':
                setColorTextSlogan(colorSelect);
                break;
            case 'organization':
                setColorTextOrganization(colorSelect);
                break;
            case 'website':
                setColorTextWebsite(colorSelect);
                break;
            case 'uniqueYou':
                setColorTextUniqueYou(colorSelect);
                break;
            default:
                break;
        }
        console.table(colorSelect);
    };


    return (


        <Flex
            w={"100%"}
        >
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


                <Heading textAlign="center" size="xl" fontWeight="extrabold">
                    Mint PaperMaster NFI
                </Heading>

                <Text mt="4" mb="8" align="center" maxW="100%" fontWeight="medium">
                    PaperMaster Identities are permanent Blockchain PaperMaster
                    Non-Fungible-Identity, future changes require additional minting, please proofread!
                </Text>


                <Stack spacing="5">

                                <Popover>
                                    <PopoverTrigger>
                                        <Button
                                            //w={'100%'}
                                            m={'4px'}
                                            bg={colorBG.hex}
                                            h='2.00rem'
                                            size='mg'
                                            rounded={'md'}
                                            borderStyle={'solid'}
                                            border={'1px'}
                                            borderColor={'pmpurple.10'}
                                            _hover={{
                                                transform: 'translateY(-2px)',
                                                boxShadow: 'lg',
                                            }}
                                            onClick={() => {
                                                setWhichColorField('colorBG')
                                            }}
                                        >

                                            <Text px={'20px'} color={"pmpurple.13"}> Set NFI Background Color </Text>
                                            <MdOutlineColorLens fontSize={'20px'} color={"#9c7e9c"}/>
                                        </Button>
                                    </PopoverTrigger>

                                    <Portal>
                                        <PopoverContent
                                            bg='transparent'
                                            border={'1px'}
                                            w={'50px'}
                                            p={'0px'}
                                            m={'0px'}
                                            h={'50px'}
                                        >
                                            <PopoverBody>

                                                <Box postition={'absolute'} zIndex={'2'}>
                                                    <SketchPicker
                                                        color={colorBG.rgb}
                                                        onChange={colorChangeHandler}
                                                        onSwatchHover={(colorHover: any) => {
                                                            console.log(colorHover);
                                                        }}
                                                    />
                                                </Box>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Portal>
                                </Popover>

                    <FormControl isRequired>
                        <FormLabel htmlFor='name'>Name</FormLabel>
                        <InputGroup size='md'>
                            <Input focusBorderColor='pmpurple.9' id='name' placeholder='name, company'
                                   isDisabled={submitButtonClicked}
                                   onChange={nameHandler}
                                   color={'pmpurple.15'}
                            />
                            <InputRightElement
                                width='3.5rem'
                            >
                                <Popover>
                                    <PopoverTrigger>
                                        <Button
                                            //w={'100%'}
                                            borderStyle={'solid'}
                                            border={'1px'}
                                            borderColor={'pmpurple.13'}
                                            m={'4px'}
                                            bg={colorTextName.hex}
                                            h='1.75rem'
                                            size='sm'
                                            rounded={'md'}
                                            _hover={{
                                                transform: 'translateY(-2px)',
                                                boxShadow: 'lg',
                                            }}
                                            onClick={() => {
                                                setWhichColorField('name')
                                            }}
                                        >
                                            <MdOutlineColorLens fontSize={'20px'}/>

                                        </Button>
                                    </PopoverTrigger>

                                    <Portal>
                                        <PopoverContent
                                            bg='transparent'
                                            border={'1px'}
                                            w={'50px'}
                                            p={'0px'}
                                            m={'0px'}
                                            h={'50px'}
                                        >
                                            <PopoverBody>

                                                <Box postition={'absolute'} zIndex={'2'}>
                                                    <SketchPicker
                                                        color={colorTextName.rgb}
                                                        onChange={colorChangeHandler}
                                                        onSwatchHover={(colorHover: any) => {
                                                            console.log(colorHover);
                                                        }}
                                                    />
                                                </Box>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Portal>
                                </Popover>
                            </InputRightElement>
                        </InputGroup>

                        <FormErrorMessage>Field is required.</FormErrorMessage>
                    </FormControl>


                    <FormControl>
                        <FormLabel htmlFor='email'>Email</FormLabel>
                        <InputGroup size='md'>
                            <Input focusBorderColor='pmpurple.9' id='email' placeholder='email'
                                   isDisabled={submitButtonClicked}
                                   onChange={emailHandler}
                                   color={'pmpurple.15'}
                            />
                            <InputRightElement
                                width='3.5rem'
                            >
                                <Popover>
                                    <PopoverTrigger>
                                        <Button
                                            //w={'100%'}
                                            borderStyle={'solid'}
                                            border={'1px'}
                                            borderColor={'pmpurple.13'}
                                            m={'4px'}
                                            bg={colorTextEmail.hex}
                                            h='1.75rem'
                                            size='sm'
                                            rounded={'md'}
                                            _hover={{
                                                transform: 'translateY(-2px)',
                                                boxShadow: 'lg',
                                            }}
                                            onClick={() => {
                                                setWhichColorField('email')
                                            }}
                                        >
                                            <MdOutlineColorLens fontSize={'20px'}/>
                                        </Button>
                                    </PopoverTrigger>

                                    <Portal>
                                        <PopoverContent
                                            bg='transparent'
                                            border={'1px'}
                                            w={'50px'}
                                            p={'0px'}
                                            m={'0px'}
                                            h={'50px'}
                                        >
                                            <PopoverBody>

                                                <Box postition={'absolute'} zIndex={'2'}>

                                                    <SketchPicker
                                                        color={colorTextEmail.rgb}
                                                        onChange={colorChangeHandler}
                                                        onSwatchHover={(colorHover: any) => {
                                                            console.log(colorHover);
                                                        }}
                                                    />
                                                </Box>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Portal>
                                </Popover>
                            </InputRightElement>
                        </InputGroup>

                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor='profession'>Profession</FormLabel>
                        <InputGroup size='md'>
                            <Input focusBorderColor='pmpurple.9' id='profession' placeholder='profession'
                                   isDisabled={submitButtonClicked}
                                   onChange={professionHandler}
                                   color={'pmpurple.15'}
                            />
                            <InputRightElement
                                width='3.5rem'
                            >
                                <Popover>
                                    <PopoverTrigger>
                                        <Button
                                            //w={'100%'}
                                            borderStyle={'solid'}
                                            border={'1px'}
                                            borderColor={'pmpurple.13'}
                                            m={'4px'}
                                            bg={colorTextProfession.hex}
                                            h='1.75rem'
                                            size='sm'
                                            rounded={'md'}
                                            _hover={{
                                                transform: 'translateY(-2px)',
                                                boxShadow: 'lg',
                                            }}
                                            onClick={() => {
                                                setWhichColorField('profession')
                                            }}
                                        >
                                            <MdOutlineColorLens fontSize={'20px'}/>
                                        </Button>
                                    </PopoverTrigger>

                                    <Portal>
                                        <PopoverContent
                                            bg='transparent'
                                            border={'1px'}
                                            w={'50px'}
                                            p={'0px'}
                                            m={'0px'}
                                            h={'50px'}
                                        >
                                            <PopoverBody>

                                                <Box postition={'absolute'} zIndex={'2'}>

                                                    <SketchPicker
                                                        color={colorTextProfession.rgb}
                                                        onChange={colorChangeHandler}
                                                        onSwatchHover={(colorHover: any) => {
                                                            console.log(colorHover);
                                                        }}
                                                    />
                                                </Box>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Portal>
                                </Popover>
                            </InputRightElement>
                        </InputGroup>

                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='slogan'>Slogan</FormLabel>
                        <InputGroup size='md'>
                            <Input focusBorderColor='pmpurple.9' id='slogan' placeholder='slogan'
                                   isDisabled={submitButtonClicked}
                                   onChange={sloganHandler}
                                   color={'pmpurple.15'}
                            />
                            <InputRightElement
                                width='3.5rem'
                            >
                                <Popover>
                                    <PopoverTrigger>
                                        <Button
                                            //w={'100%'}
                                            borderStyle={'solid'}
                                            border={'1px'}
                                            borderColor={'pmpurple.13'}
                                            m={'4px'}
                                            bg={colorTextSlogan.hex}
                                            h='1.75rem'
                                            size='sm'
                                            rounded={'md'}
                                            _hover={{
                                                transform: 'translateY(-2px)',
                                                boxShadow: 'lg',
                                            }}
                                            onClick={() => {
                                                setWhichColorField('slogan')
                                            }}
                                        >
                                            <MdOutlineColorLens fontSize={'20px'}/>
                                        </Button>
                                    </PopoverTrigger>

                                    <Portal>
                                        <PopoverContent
                                            bg='transparent'
                                            border={'1px'}
                                            w={'50px'}
                                            p={'0px'}
                                            m={'0px'}
                                            h={'50px'}
                                        >
                                            <PopoverBody>

                                                <Box postition={'absolute'} zIndex={'2'}>
                                                    <SketchPicker
                                                        color={colorTextSlogan.rgb}
                                                        onChange={colorChangeHandler}
                                                        onSwatchHover={(colorHover: any) => {
                                                            console.log(colorHover);
                                                        }}
                                                    />
                                                </Box>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Portal>
                                </Popover>
                            </InputRightElement>
                        </InputGroup>

                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor='organization'>Organization</FormLabel>
                        <InputGroup size='md'>
                            <Input focusBorderColor='pmpurple.9' id='organization' placeholder='organization'
                                   isDisabled={submitButtonClicked}
                                   onChange={organizationHandler}
                                   color={'pmpurple.15'}
                            />
                            <InputRightElement
                                width='3.5rem'
                            >
                                <Popover>
                                    <PopoverTrigger>
                                        <Button
                                            //w={'100%'}
                                            borderStyle={'solid'}
                                            border={'1px'}
                                            borderColor={'pmpurple.13'}
                                            m={'4px'}
                                            bg={colorTextOrganization.hex}
                                            h='1.75rem'
                                            size='sm'
                                            rounded={'md'}
                                            _hover={{
                                                transform: 'translateY(-2px)',
                                                boxShadow: 'lg',
                                            }}
                                            onClick={() => {
                                                setWhichColorField('organization')
                                            }}
                                        >
                                            <MdOutlineColorLens fontSize={'20px'}/>

                                        </Button>
                                    </PopoverTrigger>

                                    <Portal>
                                        <PopoverContent
                                            bg='transparent'
                                            border={'1px'}
                                            w={'50px'}
                                            p={'0px'}
                                            m={'0px'}
                                            h={'50px'}
                                        >
                                            <PopoverBody>
                                                <Box postition={'absolute'} zIndex={'2'}>
                                                    <SketchPicker
                                                        color={colorTextOrganization.rgb}
                                                        onChange={colorChangeHandler}
                                                        onSwatchHover={(colorHover: any) => {
                                                            console.log(colorHover);
                                                        }}
                                                    />
                                                </Box>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Portal>
                                </Popover>
                            </InputRightElement>
                        </InputGroup>

                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='website'>website</FormLabel>
                        <InputGroup size='md'>
                            <Input focusBorderColor='pmpurple.9' id='website' placeholder='website'
                                   isDisabled={submitButtonClicked}
                                   onChange={websiteHandler}
                                   color={'pmpurple.15'}
                            />
                            <InputRightElement
                                width='3.5rem'
                            >
                                <Popover>
                                    <PopoverTrigger>
                                        <Button
                                            //w={'100%'}
                                            borderStyle={'solid'}
                                            border={'1px'}
                                            borderColor={'pmpurple.13'}
                                            m={'4px'}
                                            bg={colorTextWebsite.hex}
                                            h='1.75rem'
                                            size='sm'
                                            rounded={'md'}
                                            _hover={{
                                                transform: 'translateY(-2px)',
                                                boxShadow: 'lg',
                                            }}
                                            onClick={() => {
                                                setWhichColorField('website')
                                            }}
                                        >
                                            <MdOutlineColorLens fontSize={'20px'}/>

                                        </Button>
                                    </PopoverTrigger>

                                    <Portal>
                                        <PopoverContent
                                            bg='transparent'
                                            border={'1px'}
                                            w={'50px'}
                                            p={'0px'}
                                            m={'0px'}
                                            h={'50px'}
                                        >
                                            <PopoverBody>
                                                <Box postition={'absolute'} zIndex={'2'}>
                                                    <SketchPicker
                                                        color={colorTextWebsite.rgb}
                                                        onChange={colorChangeHandler}
                                                        onSwatchHover={(colorHover: any) => {
                                                            console.log(colorHover);
                                                        }}
                                                    />
                                                </Box>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Portal>
                                </Popover>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor='uniqueYou'>Your Uniqueness</FormLabel>
                        <InputGroup size='md'>
                            <Input focusBorderColor='pmpurple.9' id='uniqueYou' placeholder='uniqueYou'
                                   isDisabled={submitButtonClicked}
                                   onChange={uniqueYouHandler}
                                   color={'pmpurple.15'}
                            />
                            <InputRightElement
                                width='3.5rem'
                            >
                                <Popover>
                                    <PopoverTrigger>
                                        <Button
                                            //w={'100%'}
                                            borderStyle={'solid'}
                                            border={'1px'}
                                            borderColor={'pmpurple.13'}
                                            m={'4px'}
                                            bg={colorTextUniqueYou.hex}
                                            h='1.75rem'
                                            size='sm'
                                            rounded={'md'}
                                            _hover={{
                                                transform: 'translateY(-2px)',
                                                boxShadow: 'lg',
                                            }}
                                            onClick={() => {
                                                setWhichColorField('uniqueYou')
                                            }}
                                        >
                                            <MdOutlineColorLens fontSize={'20px'}/>

                                        </Button>
                                    </PopoverTrigger>

                                    <Portal>
                                        <PopoverContent
                                            bg='transparent'
                                            border={'1px'}
                                            w={'50px'}
                                            p={'0px'}
                                            m={'0px'}
                                            h={'50px'}
                                        >
                                            <PopoverBody>
                                                <Box postition={'absolute'} zIndex={'2'}>
                                                    <SketchPicker
                                                        color={colorTextUniqueYou.rgb}
                                                        onChange={colorChangeHandler}
                                                        onSwatchHover={(colorHover: any) => {
                                                            console.log(colorHover);
                                                        }}
                                                    />
                                                </Box>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Portal>
                                </Popover>
                            </InputRightElement>
                        </InputGroup>
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

                <Heading textAlign="center" size="xl" fontWeight="extrabold">
                    Your PaperMaster Non-Fungible-Identity
                </Heading>

                <Text mt="4" mb="8" align="center" maxW="100%" fontWeight="medium">
                    Below is what your Papermaster Non-Fungible-Identification will
                    look like, please make sure you love it!
                </Text>


                <AspectRatio w='320px' ratio={4 / 5}>
                    <Box
                        h={"100%"}
                        w={'full'}
                        border={'3px'}
                        rounded={'10px'}
                        borderColor={'pmpurple.13'}
                        borderStyle={'solid'}
                        bg={'pmpurple.13'}
                    >

                        <Stack
                            h={"100%"}
                            w={'full'}
                            align={'center'}
                            spacing={0}
                            bg={colorBG.hex}
                            wordBreak={'break-word'}
                            rounded={'10px'}
                        >

                            <Image
                                position={'absolute'}
                                top={'0px'}
                                right={'0px'}
                                left={'0px'}
                                h={'60px'}
                                backgroundPosition="center"
                                src='legoLavendarheadercroped.png'
                                objectFit={'cover'}
                            />

                            <Flex justify={'center'}>
                                <Avatar
                                    mt={'22px'}
                                    src='PMlogo.png'
                                    boxSize='3.05em'
                                    variant={"square"}
                                    square={true}
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

                            <Text noOfLines={2} py={'0px'} px={'16px'} fontSize={'18px'} fontWeight={500}
                                  fontFamily={'body'} align={'center'} color={colorTextName.hex}>
                                {name}
                            </Text>

                            <Divider py={'0px'} css={{borderColor: '#a88ea8'}}/>

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
                                        <Text noOfLines={1} color={colorTextEmail.hex}>
                                            {email}
                                        </Text>

                                        <Text noOfLines={1} color={colorTextProfession.hex}>
                                            {profession}
                                        </Text>
                                        <Text noOfLines={1} color={colorTextSlogan.hex}>
                                            {slogan}
                                        </Text>
                                        <Text noOfLines={1} color={colorTextOrganization.hex}>
                                            {organization}
                                        </Text>
                                        <Text noOfLines={1} color={colorTextWebsite.hex}>
                                            {website}
                                        </Text>
                                        <Text noOfLines={2} color={colorTextUniqueYou.hex}>
                                            {uniqueYou}
                                        </Text>
                                    </VStack>
                                </Center>
                            </Flex>

                            <Box>
                                <Text as='cite' mb={'0px'} pb={'0px'} fontSize={'sm'} color={'pmpurple.13'}>
                                    Origin Date {originDateFormatted}
                                </Text>

                                <Button
                                    w={'90%'}
                                    py={'2px'}
                                    px={'2px'}
                                    m={'0px'}
                                    mt={'0px'}
                                    mb={'8px'}
                                    bg={'pmpurple.10'}
                                    borderStyle={'solid'}
                                    border={'1px'}
                                    borderColor={'pmpurple.13'}
                                    //color={'pmpurple.15'}
                                    rounded={'md'}
                                    _hover={{
                                        transform: 'translateY(-2px)',
                                        boxShadow: 'md',
                                    }}>
                                    <Text fontSize={'sm'} color={'white'} textAlign={'center'}>
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
                            borderStyle={'solid'}
                            border={'2px'}
                            borderColor={'pmpurple.13'}
                            bg={'pmpurple.3'}
                            mt={"20px"}
                            mb={"2px"}
                            _hover={{
                                transform: 'translateY(-2px)',
                                boxShadow: 'md',
                            }}
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
                            color={"pmpurple.13"}
                            variant='outline'
                        >
                            Submit
                        </Button>
                        : null}
                </Center>
                {submitButtonClicked ?
                    <Progress
                        isAnimated
                        hasStripe
                        value={64}
                        size='sm'
                        mt={'8px'}
                        height='10px'
                        css={{
                            border: '1px solid #c1aec1',
                        }}
                        colorScheme="green"/>
                    : null}
            </Box>
        </Flex>
    )
};

export default Register;