import {
    Box,
    Button,
    chakra,
    FormControl,
    FormLabel, Heading,
    HTMLChakraProps,
    Input, Progress,
    Stack, Text, useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import Logo from "../atoms/Logo";
import {PMNFI} from "../atoms/PMNFI";


export const VailidateOutputPMIForm = (props: HTMLChakraProps<'form'>) => (
    <Box
        bg={useColorModeValue('#f2eef2', 'inherit')}
        minH="100vh"
        py="12"
        px={{ base: '4', lg: '8' }}

    >
        <Box maxW="md" mx="auto">
            <Logo mx="auto" h="8" mb={{ base: '10', md: '20' }} />
            <Heading textAlign="center" size="xl" fontWeight="extrabold">
                Validated PaperMaster Non-Fungible-Identity
            </Heading>
            <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
                <Text as="span">Below is what your Papermaster Non-Fungible-Identification will look like, please make sure you love it!</Text>
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
                        <FormControl id="email">
                            {/*<FormLabel>Email address</FormLabel>*/}
                            <Input name="email" type="email" autoComplete="email" required />
                        </FormControl>

                        <Button
                            isLoading
                            loadingText='Submitting'
                            colorScheme='purple'
                            variant='outline'
                        >
                            Submit
                        </Button>

                        <Progress hasStripe value={20} size='xs' colorScheme='pink' />

                    </Stack>
                </chakra.form>

            </PMNFI>
        </Box>
    </Box>

)

export default VailidateOutputPMIForm;