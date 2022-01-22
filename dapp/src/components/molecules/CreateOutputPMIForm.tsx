import {
    Avatar,
    Box,
    Button, Center,
    chakra, Flex,
    FormControl,
    FormLabel, Heading,
    HTMLChakraProps, Image,
    Input, Progress,
    Stack, Text, useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import Logo from "../atoms/Logo";
import {PMNFI} from "../atoms/PMNFI";
import type {FC} from 'react';


interface Interface {

}


export const CreateOutputPMIForm:FC<Interface> = (props: HTMLChakraProps<'form'>) => {

   return(
    <Box
        bg={useColorModeValue('#f2eef2', 'inherit')}
        minH="100vh"
        py="12"
        px={{ base: '4', lg: '8' }}

    >
        <Box maxW="md" mx="auto">
            <Logo mx="auto" h="8" mb={{ base: '10', md: '20' }} />
            <Heading textAlign="center" size="xl" fontWeight="extrabold">
                Your PaperMaster Non-Fungible-Identity
            </Heading>
            <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
                <Text as="span">Below is what your Papermaster Non-Fungible-Identification will look like, please make sure you love it!</Text>
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
                        bg={useColorModeValue('#ffffff', 'inherit')}
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
                                        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'} align={'center'} >
                                            PaperMaster Andrew the Tusken from Mos Eisley
                                        </Heading>
                                        <Text align={'center'} color={'gray.500'}>Mos Eisley Software Developer</Text>
                                        <Text align={'center'} color={'gray.500'}>www.ramonajenny.com</Text>
                                        <Text align={'center'} color={'gray.500'}>ramonajenny@gmail.com</Text>
                                        <Text align={'center'}  color={'gray.500'}>PaperMaster Non-Fungible-Identification</Text>
                                        <Text align={'center'}  color={'gray.500'}>sdkrhwer93847538475kjekhfskjjhdfsdjf</Text>

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
                        <Progress hasStripe value={20} size='xs' colorScheme='pink' />

                    </Box>


                </chakra.form>


        </Box>
    </Box>

   )

};

export default CreateOutputPMIForm;