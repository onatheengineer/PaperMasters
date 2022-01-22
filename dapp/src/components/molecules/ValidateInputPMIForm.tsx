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
import {PMNFI} from "../atoms/PMNFI";


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



export const ValidateInputPMIForm = (props: HTMLChakraProps<'form'>) => (

    <Box
        bg={useColorModeValue('#f2eef2', 'inherit')}
        minH="100vh"
        py="12"
        px={{ base: '4', lg: '8' }}

    >
        <Box maxW="md" mx="auto">
            <Logo mx="auto" h="8" mb={{ base: '10', md: '20' }} />
            <Heading textAlign="center" size="xl" fontWeight="extrabold">
                Validate PaperMaster NFI
            </Heading>
            <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
                <Text as="span">PaperMaster Validation are permanent and attached to Blockchain PaperMaster Non-Fungible-Identities, future changes require additional minting, please proofread!</Text>
                {/*<Link href="#">Start free trial</Link>*/}
            </Text>
            <PMNFI>
                <chakra.form
                    onSubmit={(e) => {
                        e.preventDefault()
                        // your login logic here
                    }}
                    {...props}
                >
                    <Stack spacing="6">
                        <FormControl id="Your unique PaperMaster Non-Fungiable Identity number">
                            <FormLabel>Your PMI Number</FormLabel>
                            <Input name="Your PMI Number" type="Your PMI Number" autoComplete="Your PMI Number" required />
                        </FormControl>
                        <FormControl id="The unique PaperMaster Non-Fungiable Identity number that you want to vailidate">
                            <FormLabel>Their PMI Number</FormLabel>
                            <Input name="Their PMI Number" type="Their PMI Number" autoComplete="Their PMI Number" required />
                        </FormControl>
                        <FormControl id="email">
                            <FormLabel>Email</FormLabel>
                            <Input name="email" type="email" autoComplete="email" required />
                        </FormControl>
                        <FormControl id="descr">
                            <FormLabel>Description</FormLabel>
                            <Input name="descr" type="descr" autoComplete="descr" required />
                        </FormControl>



                    </Stack>
                </chakra.form>

            </PMNFI>
        </Box>
    </Box>

)

export default ValidateInputPMIForm;