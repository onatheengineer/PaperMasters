import * as React from 'react';
import {useState, useEffect, MouseEventHandler} from "react";
import Web3 from "web3";
//import {getFilledAccountsArr}
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
    InputLeftElement,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure, Container,
} from '@chakra-ui/react';
import {FaFacebook, FaGithub, FaGoogle, FaScroll} from 'react-icons/fa';
import { MdOutlineColorLens} from 'react-icons/md';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import PMLogo from '../../assets/PMGIMPResized.png';
import Logo from '../../assets/Logo';
import {ColorChangeHandler, ColorResult, SketchPicker, GithubPicker, RGBColor} from 'react-color';
import {RequestAccountsAsyncActionSaga} from "../../features/RequestWalletAccountSlice";
import {mintNFIAsyncActionSaga, gasForMintNFIAsyncActionSaga, mintingError} from "../../features/MintNFISlice";
import mintNFI from "../../abiFiles/PaperMastersNFI.json";
import {call} from "redux-saga/effects";


interface InterfaceRegister {

}

const ColorRGBToString=(colorResultRGB: ColorResult)=>{
    const colorStringRGB = `rgba(${colorResultRGB.rgb.r}, ${colorResultRGB.rgb.g}, ${colorResultRGB.rgb.b}, ${colorResultRGB.rgb.a})`
    return colorStringRGB;
}


export const Register: FC<InterfaceRegister>=()=> {

    const dispatch = useAppDispatch();
    const accountsArr = useAppSelector((state) => state.register.accounts);
    const status = useAppSelector((state) => state.register.status);
    const gasPrice = useAppSelector((state) => state.mint.gasPrice);
    const mintSucceeded = useAppSelector((state) => state.mint.mintSucceeded);

    const [name, setName] = useState<string | "">("");
    const [profession, setProfession] = useState<string | "">("");
    const [email, setEmail] = useState<string | "">("");
    const [slogan, setSlogan] = useState<string | "">("");
    const [organization, setOrganization] = useState<string | "">("");
    const [website, setWebsite] = useState<string | "">("");
    const [uniqueYou, setUniqueYou] = useState<string | "">("");

    const defaultColorBG = { hex: '#f2eef2', rgb: {r: 242, g: 238, b: 242, a: 1}, hsl: {h: 300, s: 0.13333333333333283, l: 0.9411764705882353, a: 1}}
    const defaultColorText = {hex: '#694b69', rgb: {r: 105, g: 75, b: 105, a: 1}, hsl: {h: 300, s: 0.17, l: 0.35, a: 1}}

    const [colorTextName, setColorTextName] = useState<ColorResult>(defaultColorText);
    const [colorTextEmail, setColorTextEmail] = useState<ColorResult>(defaultColorText);
    const [colorTextProfession, setColorTextProfession] = useState<ColorResult>(defaultColorText);
    const [colorTextSlogan, setColorTextSlogan] = useState<ColorResult>(defaultColorText);
    const [colorTextOrganization, setColorTextOrganization] = useState<ColorResult>(defaultColorText);
    const [colorTextWebsite, setColorTextWebsite] = useState<ColorResult>(defaultColorText);
    const [colorTextUniqueYou, setColorTextUniqueYou] = useState<ColorResult>(defaultColorText);
    const [bgRGB, setbgRGB] = useState<ColorResult>(defaultColorBG);

    const [whichColorField, setWhichColorField] = useState<string>('');

    const [originDate, setOriginDate] = useState(new Date())

    const [submitButtonClicked, setSubmitButtonClicked] = useState<boolean>(false);

    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);

    console.log(originDate.getTime());
    const originDateFormatted: string = `${originDate.toLocaleString('en-us', {month: 'short'})} ${originDate.getDate()}, ${originDate.getFullYear()}`

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
    const websiteHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setWebsite(e.currentTarget.value);
    };
    const organizationHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setOrganization(e.currentTarget.value);
    };
    const uniqueYouHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setUniqueYou(e.currentTarget.value);
    };

    const colorChangeHandler: ColorChangeHandler = (colorSelect: ColorResult) => {
        switch (whichColorField) {
            case 'colorBG':
                setbgRGB(colorSelect);
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

    useEffect(() => {
        if (accountsArr.length !== 0) {
            estimateGasHandler();
        }
    }, [accountsArr, name, email, profession, slogan, website, organization, uniqueYou]);

    const submitMintHandler = () => {
        const mintPayload: {} = {
            name: `${name},${ColorRGBToString(colorTextName)}`,
            email: `${email},${ColorRGBToString(colorTextEmail)}`,
            profession: `${profession},${ColorRGBToString(colorTextProfession)}`,
            organization: `${organization},${ColorRGBToString(colorTextOrganization)}`,
            slogan: `${slogan},${ColorRGBToString(colorTextSlogan)}`,
            website: `${website},${ColorRGBToString(colorTextWebsite)}`,
            uniqueYou: `${uniqueYou},${ColorRGBToString(colorTextUniqueYou)}`,
            bgRGB: `${ColorRGBToString(bgRGB)}`,
            originDate: originDate.getTime(),
        }
        console.table(mintPayload);
        setSubmitButtonClicked(true)
        dispatch(mintNFIAsyncActionSaga(mintPayload));
    };

    const estimateGasHandler = () => {
        const mintPayload: {} = {
            name: `${name},${ColorRGBToString(colorTextName)}`,
            email: `${email},${ColorRGBToString(colorTextEmail)}`,
            profession: `${profession},${ColorRGBToString(colorTextProfession)}`,
            organization: `${organization},${ColorRGBToString(colorTextOrganization)}`,
            slogan: `${slogan},${ColorRGBToString(colorTextSlogan)}`,
            website: `${website},${ColorRGBToString(colorTextWebsite)}`,
            uniqueYou: `${uniqueYou},${ColorRGBToString(colorTextUniqueYou)}`,
            bgRGB: `${ColorRGBToString(bgRGB)}`,
            originDate: originDate.getTime(),
        }
        dispatch(gasForMintNFIAsyncActionSaga(mintPayload));
    };

useEffect(()=>{
    if(mintSucceeded==='failed'){
        setIsModalOpen(true);
    }
},[mintSucceeded]);


    return (

        <Flex
            w={"100%"}
            align="center"
        >
            <Box
                w={"50%"}
                h={"98%"}
                border={'2px'}
                borderStyle={'solid'}
                borderColor={'pmpurple.13'}
                mx={{xl: '8px'}}
                borderRadius='15px'
                py="22px" px="56px"
                my={{xl: "16px"}}
                bg={'pmpurple.1'}
            >

                <Heading textAlign="center" size="xl" fontWeight="extrabold">
                    Mint PaperMaster NFI
                </Heading>

                <Text mt="4" mb="8px" color={'pmpurple.13'} align="center" maxW="100%" fontWeight="medium">
                    PaperMaster Identities are permanent Blockchain PaperMaster
                    Non-Fungible-Identity, future changes require additional minting, please proofread! Only one NFI per
                    account.
                    If you are minting your company, please make sure you use your company's wallet account.
                </Text>

                <Divider py={'0px'} color={'pmpurple.8'}/>

                <Stack spacing="5">

                    <Popover>
                        <PopoverTrigger>
                            <Button
                                //w={'100%'}
                                mt={'32px'}
                                bg={bgRGB.hex}
                                h='2.00rem'
                                size='mg'
                                rounded={'md'}
                                borderStyle={'solid'}
                                border={'1px'}
                                borderColor={'pmpurple.4'}
                                _hover={{
                                    transform: 'translateY(-2px)',
                                    boxShadow: 'lg',
                                }}
                                onClick={() => {
                                    setWhichColorField('colorBG')
                                }}
                            >

                                <Text px={'20px'} color={"pmpurple.10"}> Set NFI Background Color </Text>
                                <MdOutlineColorLens fontSize={'20px'} color={"#9c7e9c"}/>
                                <InputRightElement m='3px' textAlign={'center'}
                                                   children={<Button bg='pmpurple.9' size='xs' onClick={() => {
                                                       setbgRGB(defaultColorBG)
                                                   }}> Reset</Button>}/>
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
                                    <Box position={'absolute'} zIndex={'2'}>
                                        <SketchPicker
                                            color={bgRGB.rgb}
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
                        <FormLabel htmlFor='name' color={'pmpurple.13'} mb={'2px'}>Name</FormLabel>
                        <InputGroup size='md'>
                            <Input focusBorderColor='pmpurple.9' borderColor={"pmpurple.4"} id='name' pl={'62px'}
                                   placeholder='name, company'
                                   isDisabled={submitButtonClicked}
                                   onChange={nameHandler}
                                   color={'pmpurple.15'}
                            />
                            <InputRightAddon p='0' borderColor={"pmpurple.4"} bg={'pmpurple.3'}
                                             children={<Button size='xs' color={"pmpurple.10"} onClick={() => {
                                                 setColorTextName(defaultColorText)
                                             }}> Reset</Button>}/>
                            <InputLeftElement
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

                                                <Box position={'absolute'} zIndex={'2'}>
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

                            </InputLeftElement>
                        </InputGroup>

                        <FormErrorMessage>Field is required.</FormErrorMessage>
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor='email' color={'pmpurple.13'} mb={'2px'}>Email</FormLabel>
                        <InputGroup size='md'>
                            <Input focusBorderColor='pmpurple.9' borderColor={"pmpurple.4"} id='email' pl={'62px'}
                                   placeholder='email'
                                   isDisabled={submitButtonClicked}
                                   onChange={emailHandler}
                                   color={'pmpurple.15'}
                            />
                            <InputRightAddon p='0' borderColor={"pmpurple.4"} bg={'pmpurple.3'}
                                             children={<Button size='xs' color={"pmpurple.10"} onClick={() => {
                                                 setColorTextEmail(defaultColorText)
                                             }}> Reset</Button>}/>
                            <InputLeftElement
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

                                                <Box position={'absolute'} zIndex={'2'}>

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
                            </InputLeftElement>
                        </InputGroup>

                    </FormControl>

                    <FormControl>
                        <FormLabel color={'pmpurple.13'} mb={'2px'} htmlFor='profession'>Profession</FormLabel>
                        <InputGroup size='md'>
                            <Input focusBorderColor='pmpurple.9' id='profession' pl={'62px'} placeholder='profession'
                                   isDisabled={submitButtonClicked}
                                   onChange={professionHandler}
                                   color={'pmpurple.15'}
                            />
                            <InputRightAddon p='0' borderColor={"pmpurple.4"} bg={'pmpurple.3'}
                                             children={<Button size='xs' color={"pmpurple.10"} onClick={() => {
                                                 setColorTextProfession(defaultColorText)
                                             }}> Reset</Button>}/>
                            <InputLeftElement
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

                                                <Box position={'absolute'} zIndex={'2'}>

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
                            </InputLeftElement>
                        </InputGroup>

                    </FormControl>
                    <FormControl>
                        <FormLabel color={'pmpurple.13'} mb={'2px'} htmlFor='slogan'>Slogan</FormLabel>
                        <InputGroup size='md'>
                            <Input focusBorderColor='pmpurple.9' id='slogan' pl={'62px'} placeholder='slogan'
                                   isDisabled={submitButtonClicked}
                                   onChange={sloganHandler}
                                   color={'pmpurple.15'}
                            />
                            <InputRightAddon p='0' borderColor={"pmpurple.4"} bg={'pmpurple.3'}
                                             children={<Button size='xs' color={"pmpurple.10"} onClick={() => {
                                                 setColorTextSlogan(defaultColorText)
                                             }}> Reset</Button>}/>
                            <InputLeftElement
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

                                                <Box position={'absolute'} zIndex={'2'}>
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
                            </InputLeftElement>
                        </InputGroup>

                    </FormControl>

                    <FormControl>
                        <FormLabel color={'pmpurple.13'} mb={'2px'} htmlFor='organization'>Organization</FormLabel>
                        <InputGroup size='md'>
                            <Input focusBorderColor='pmpurple.9' id='organization' pl={'62px'}
                                   placeholder='organization'
                                   isDisabled={submitButtonClicked}
                                   onChange={organizationHandler}
                                   color={'pmpurple.15'}
                            />
                            <InputRightAddon p='0' borderColor={"pmpurple.4"} bg={'pmpurple.3'}
                                             children={<Button size='xs' color={"pmpurple.10"} onClick={() => {
                                                 setColorTextOrganization(defaultColorText)
                                             }}> Reset</Button>}/>
                            <InputLeftElement
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
                                                <Box position={'absolute'} zIndex={'2'}>
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
                            </InputLeftElement>
                        </InputGroup>

                    </FormControl>
                    <FormControl>
                        <FormLabel color={'pmpurple.13'} mb={'2px'} htmlFor='website'>website</FormLabel>
                        <InputGroup size='md'>
                            <Input focusBorderColor='pmpurple.9' id='website' pl={'62px'} placeholder='website'
                                   isDisabled={submitButtonClicked}
                                   onChange={websiteHandler}
                                   color={'pmpurple.15'}
                            />
                            <InputRightAddon p='0' borderColor={"pmpurple.4"} bg={'pmpurple.3'}
                                             children={<Button size='xs' color={"pmpurple.10"} onClick={() => {
                                                 setColorTextWebsite(defaultColorText)
                                             }}> Reset</Button>}/>
                            <InputLeftElement
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
                                                <Box position={'absolute'} zIndex={'2'}>
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
                            </InputLeftElement>
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel color={'pmpurple.13'} mb={'2px'} htmlFor='uniqueYou'>Your Uniqueness</FormLabel>
                        <InputGroup size='md'>
                            <Input focusBorderColor='pmpurple.9' id='uniqueYou' pl={'62px'}
                                   placeholder='unique you, date of birth, anything goes here'
                                   isDisabled={submitButtonClicked} onChange={uniqueYouHandler} color={'pmpurple.15'}
                                   mb={'18px'}
                            />
                            <InputRightAddon p='0' borderColor={"pmpurple.4"} bg={'pmpurple.3'}
                                             children={<Button size='xs' color={"pmpurple.10"} onClick={() => {
                                                 setColorTextUniqueYou(defaultColorText)
                                             }}> Reset</Button>}/>
                            <InputLeftElement
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
                                                <Box position={'absolute'} zIndex={'2'}>
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
                            </InputLeftElement>
                        </InputGroup>
                    </FormControl>
                </Stack>
            </Box>

            <Box
                w={"50%"}
                h={"98%"}
                border={'2px'}
                borderStyle={'solid'}
                borderColor={'pmpurple.13'}
                mx={{xl: '8px'}}
                borderRadius='15px'
                py="22px" px="56px"
                bg={'pmpurple.1'}
                my={{xl: "16px"}}
            >

                <Heading mb="54px" textAlign="center" size="xl" fontWeight="extrabold">
                    Your PaperMaster Non-Fungible-Identity
                </Heading>

                <Text mt="4" mb="8px" color={'pmpurple.13'} align="center" maxW="100%" fontWeight="medium">
                    Below is what your Papermaster Non-Fungible-Identification will
                    look like, please make sure you love it!
                </Text>

                <Divider py={'0px'} mb="54px" color={'pmpurple.8'}/>

                <Container centerContent>

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
                            bg={`rgba(${bgRGB.rgb.r}, ${bgRGB.rgb.g}, ${bgRGB.rgb.b}, ${bgRGB.rgb.a})`}
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

                            <Text noOfLines={[1, 2]} mb={'0px'} py={'0px'} px={'16px'} fontSize={'18px'} fontWeight={500}
                                  fontFamily={'body'} align={'center'}
                                  color={`rgba(${colorTextName.rgb.r}, ${colorTextName.rgb.g}, ${colorTextName.rgb.b}, ${colorTextName.rgb.a})`}>
                                {name}
                            </Text>

                            <Divider pt={'0px'} css={{borderColor: '#a88ea8'}}/>

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
                                        <Text noOfLines={1}
                                              color = {ColorRGBToString(colorTextEmail)}>
                                            {email}
                                        </Text>

                                        <Text noOfLines={1}
                                              color={ColorRGBToString(colorTextProfession)}>
                                            {profession}
                                        </Text>
                                        <Text noOfLines={1}
                                              color={ColorRGBToString(colorTextSlogan)}>
                                            {slogan}
                                        </Text>
                                        <Text noOfLines={1}
                                              color={ColorRGBToString(colorTextOrganization)}>
                                            {organization}
                                        </Text>
                                        <Text noOfLines={1}
                                              color={ColorRGBToString(colorTextWebsite)}>
                                            {website}
                                        </Text>
                                        <Text noOfLines={3}
                                              color={ColorRGBToString(colorTextUniqueYou)}>
                                            {uniqueYou}
                                        </Text>
                                    </VStack>
                                </Center>
                            </Flex>


                            <Stack
                            textAlign={'center'}
                            >
                                <Text as='cite' mb={'26px'} pb={'0px'} fontSize={'sm'} color={'pmpurple.13'}>
                                    Origin Date {originDateFormatted}
                                </Text>

                                <Box
                                    position={'absolute'}
                                    bottom={'0px'}
                                    right={'0px'}
                                    left={'0px'}
                                    h={'26px'}
                                    backgroundPosition="center"
                                    objectFit={'cover'}
                                    // w={'100%'}
                                    bg={'pmpurple.10'}
                                    // borderStyle={'solid'}
                                    // border={'1px'}
                                    // borderColor={'pmpurple.13'}
                                    _hover={{
                                        transform: 'translateY(4px)',
                                        //boxShadow: 'md',
                                    }}
                                >
                                    <Text p={'3px'} fontSize={'9.8pt'} color={'white'} whiteSpace={'break-spaces'}>
                                        {accountsArr[0]}
                                    </Text>
                                </Box>
                            </Stack>
                        </Stack>
                    </Box>
                </AspectRatio>
                </Container>




                   <Center>
                       {name !== "" ?
                           <Button
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
                               onClick={submitMintHandler}
                               isLoading={submitButtonClicked}
                               loadingText='Submitting to the Blockchain for minting, this can take up to 2.5 minutes'
                               color={"pmpurple.13"}
                               variant='outline'
                           >
                               Submit
                           </Button>
                           : null}
                   </Center>
                   <Center>

                   <Box
                   borderStyle={'solid'}
                   border={'2px'}
                   borderColor={'pmpurple.13'}
                   bg={'pmpurple.3'}
                   mt={"20px"}
                   mb={"2px"}
                   px={'6px'}
                   //loadingText='Waiting to get cost estimates for gas'
                   color={"pmpurple.13"}
                   >
                   <Text as='u'>Estimated Gas: {gasPrice}</Text>
               {/*{estimateGasHandler}*/}
                   </Box>
                   </Center>



                {isModalOpen &&
                    <Modal closeOnOverlayClick={false} blockScrollOnMount={false} isOpen={true} onClose={()=>{setIsModalOpen(false)}}>
                        <ModalOverlay/>
                        <ModalContent>
                            <ModalHeader fontWeight="bold" >You've already minted, one identity per account number</ModalHeader>
                            <ModalCloseButton/>
                            <ModalBody pb={6}>
                                <Text mb="1rem">
                                    If you need failure message......
                                </Text>
                            </ModalBody>
                            <ModalFooter>

                                <Button color={"pmpurple.13"} mr={3} onClick={()=>{setIsModalOpen(false)}}>
                                    Close
                                </Button>

                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                }

            </Box>

        </Flex>

    )
};

export default Register;