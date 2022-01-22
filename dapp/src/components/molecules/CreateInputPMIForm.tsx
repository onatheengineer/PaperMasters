import { useForm } from 'react-hook-form';
import * as React from 'react';
import {
    Box,
    Button,
    chakra,
    FormControl,
    FormLabel,
    Heading,
    HTMLChakraProps,
    Input, FormErrorMessage,
    Stack, Text, useColorModeValue,
    Progress,
} from '@chakra-ui/react';
import Logo from "../atoms/Logo";
import type {FC} from 'react';

// export default function HookForm() {
//     const {
//         handleSubmit,
//         register,
//         formState: { errors, isSubmitting },
//     } = useForm()
//
//     function onSubmit(values: any) {
//         return new Promise((resolve) => {
//             setTimeout(() => {
//                 alert(JSON.stringify(values, null, 2))
//                 resolve()
//             }, 3000)
//         })
//     }
//
//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <FormControl isInvalid={errors.name}>
//                 <FormLabel htmlFor='name'>First name</FormLabel>
//                 <Input
//                     id='name'
//                     placeholder='name'
//                     {...register('name', {
//                         required: 'This is required',
//                         minLength: { value: 4, message: 'Minimum length should be 4' },
//                     })}
//                 />
//                 <FormErrorMessage>
//                     {errors.name && errors.name.message}
//                 </FormErrorMessage>
//             </FormControl>
//             <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
//                 Submit
//             </Button>
//         </form>
//     )
// }
//
//
//

interface Interface {

}

export const CreateInputPMIForm:FC<Interface> = (props: HTMLChakraProps<'form'>) => {

    return (

        <Box
            bg={useColorModeValue('#f2eef2', 'inherit')}
            minH="100vh"
            py="12"
            px={{base: '4', lg: '8'}}

        >
            <Box maxW="md" mx="auto">
                <Logo mx="auto" h="8" mb={{base: '10', md: '20'}}/>
                <Heading textAlign="center" size="xl" fontWeight="extrabold">
                    Mint PaperMaster NFI
                </Heading>
                <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
                    <Text as="span">PaperMaster Identities are permanent Blockchain PaperMaster Non-Fungible-Identity,
                        future changes require additional minting, please proofread!</Text>
                    {/*<Link href="#">Start free trial</Link>*/}
                </Text>

                <Box
                    bg={useColorModeValue('#ffffff', 'inherit')}
                    minH="60vh"
                    py="8"
                    px={{base: '2', lg: '6'}}
                >


                    <chakra.form
                        onSubmit={(e) => {
                            e.preventDefault()
                            // your login logic here
                        }}
                        {...props}
                    >
                        <Stack spacing="6">
                            <FormControl id="familiarName">
                                <FormLabel>Familiar Name</FormLabel>
                                <Input name="familiarName" type="familiarName" autoComplete="familiarName" required/>
                            </FormControl>
                            <FormControl id="title">
                                <FormLabel>Title</FormLabel>
                                <Input name="title" type="title" autoComplete="title" required/>
                            </FormControl>
                            <FormControl id="email">
                                <FormLabel>Email</FormLabel>
                                <Input name="email" type="email" autoComplete="email" required/>
                            </FormControl>
                            <FormControl id="slogan">
                                <FormLabel>Slogan</FormLabel>
                                <Input name="slogan" type="slogan" autoComplete="slogan" required/>
                            </FormControl>
                            <FormControl id="org">
                                <FormLabel>Organization</FormLabel>
                                <Input name="org" type="org" autoComplete="org" required/>
                            </FormControl>
                            <FormControl id="url">
                                <FormLabel>url</FormLabel>
                                <Input name="url" type="url" autoComplete="url" required/>
                            </FormControl>
                            <FormControl id="descr">
                                <FormLabel>Description</FormLabel>
                                <Input name="descr" type="descr" autoComplete="descr" required/>
                            </FormControl>


                        </Stack>
                    </chakra.form>
                </Box>
            </Box>
        </Box>

    )
};

export default CreateInputPMIForm;
