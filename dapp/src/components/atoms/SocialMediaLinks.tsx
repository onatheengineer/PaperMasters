import {
    Box,
    ButtonGroup,
    ButtonGroupProps, chakra,
    Container,
    IconButton,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
    Icon,
} from '@chakra-ui/react'
import * as React from 'react'
import {FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaYoutube} from 'react-icons/fa';
import {BsHeartFill} from 'react-icons/bs';
import {ReactNode} from "react";

export const SocialButton = ({
                          children,
                          label,
                          href,
                      }: {
    children: ReactNode;
    label: string;
    href: string;
}) => {
    return (
        <chakra.button
            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};


export const SocialMediaLinks = (props: ButtonGroupProps) => (
    <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('#e6dee6', 'gray.700')}>
        <Container
            as={Stack}
            maxW={'7xl'}
            py={4}
            direction={{ base: 'column', md: 'row' }}
            spacing={4}
            justify={{ md: 'space-between' }}
            align={{ md: 'center' }}>
            {/*<Copyright />*/}
            {/*    copyright={`${currentYear} ${defaultMessage}`}*/}
            <Text>© 2022 Made with <Icon as={BsHeartFill} style={{marginRight:"5px", marginLeft:"5px"}}/> by The PaperMasters ~ working to bring protection and legitimacy to the Blockchain.</Text>
            <Stack direction={'row'} spacing={8}>
                <SocialButton label={'Twitter'} href={'https://twitter.com/ramonajenny_n'}>
                    <FaTwitter />
                </SocialButton>
                <SocialButton label={'YouTube'} href={'https://www.youtube.com/channel/UC-w92fylwBTYGK--jse0jeQ'}>
                    <FaYoutube />
                </SocialButton>
                <SocialButton label={'Instagram'} href={'https://www.instagram.com/ramonaandrew_niederhausern/'}>
                    <FaInstagram />
                </SocialButton>
                <SocialButton label={'Linkedin'} href={'https://www.linkedin.com/in/ramonajenny/'}>
                    <FaLinkedin />
                </SocialButton>
                <SocialButton label={'Linkedin'} href={'https://www.linkedin.com/in/andrew-nieder/'}>
                    <FaLinkedin />
                </SocialButton>
                <SocialButton label={'GitHub'} href={'https://github.com/ramonajenny'}>
                    <FaGithub />
                </SocialButton>
                <SocialButton label={'GitHub'} href={'https://github.com/Arzemn'}>
                    <FaGithub />
                </SocialButton>
            </Stack>
        </Container>
    </Box>

);

export default SocialMediaLinks;