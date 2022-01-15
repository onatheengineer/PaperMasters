import {
    Button,
    chakra,
    HTMLChakraProps,
    Input,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import FooterHeading from './FooterHeading'

export const SubscribeForm = (props: HTMLChakraProps<'form'>) => {
    return (
        <chakra.form {...props} onSubmit={(e) => e.preventDefault()}>
            <Stack spacing="1">

                <Text>Subscribe to our newsletter. Get notified when we add new features or have exciting news for you.</Text>
                <Stack spacing="1" direction={{ base: 'column', md: 'row' }}>
                    <Input
                        bg={useColorModeValue('white', 'inherit')}
                        placeholder="Enter your email"
                        type="email"
                        required
                        focusBorderColor={useColorModeValue('purple.500', 'blue.300')}
                        _placeholder={{
                            opacity: 1,
                            color: useColorModeValue('gray.500', 'whiteAlpha.700'),
                        }}
                    />
                    <Button
                        type="submit"
                        colorScheme='purple'
                        flexShrink={1}
                        width={{ base: 'full', md: 'auto' }}
                    >
                        Subscribe
                    </Button>
                </Stack>
            </Stack>
        </chakra.form>
    )
}