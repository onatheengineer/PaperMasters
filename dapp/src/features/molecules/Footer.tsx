import { ReactNode } from 'react';
import {
    Box,
    Container,
    Stack,
    SimpleGrid,
    Text,
    Link,
    VisuallyHidden,
    chakra,
    useColorModeValue,
} from '@chakra-ui/react';
import {FaTwitter, FaYoutube, FaInstagram, FaLinkedin} from 'react-icons/fa';
import PMLogo from "../../../src/PaperMastersLogoGIMP.png"
import Logo from "../../PaperMastersLogoGIMP.png";
import {Link as ReachLink} from "react-router-dom";

//import AppStoreBadge from '@/components/AppStoreBadge';
//import PlayStoreBadge from '@/components/PlayStoreBadge';

const ListHeader = ({ children }: { children: ReactNode }) => {
    return (
        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
            {children}
        </Text>
    );
};

const SocialButton = ({
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

export default function Footer() {
    return (
        <Box
            bg={useColorModeValue('#EEEEF6', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Container as={Stack} maxW={'7xl'} py={8}>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 6 }} spacing={9}>
                    <Stack></Stack>
                    <Stack align={'flex-start'}>
                        <ListHeader><img src={PMLogo}/></ListHeader>
                        {/*<AppStoreBadge />*/}
                        {/*<PlayStoreBadge />*/}
                    </Stack>

                    <Stack align={'flex-start'}>
                        <ListHeader>Security</ListHeader>
                        <Link href={'#'}>Privacy Policy</Link>
                        <Link href={'#'}>Terms of Service</Link>
                        {/*<Link href={'#'}>Community Guidelines</Link>*/}
                    </Stack>
                    <Stack align={'flex-start'}>
                        <ListHeader>Support</ListHeader>
                        <Link href={'#'}>Learning Center</Link>
                        <Link href={'#'}>Community Forum</Link>
                    </Stack>
                    <Stack align={'flex-start'}>
                        <ListHeader>Products</ListHeader>
                        <Link href={'#'}>Authentic PM Identities</Link>
                        <Link href={'#'}>Minting NFTs</Link>
                        <Link href={'#'}>Validation</Link>
                        <Link href={'#'}>PM Identity Cataloging</Link>
                    </Stack>
                    <Stack align={'flex-start'}>
                        <ListHeader>Company</ListHeader>
                        <Link href={'#'}>Analytics</Link>
                        <Link as={ReachLink} to="/AboutUs" href={'#'}>About Us</Link>
                        {/*<Link href={'#'}>Careers</Link>*/}
                        <Link href={'#'}>Contact Us</Link>
                        <Link href={'#'}>Logo Kit</Link>
                        <Link href={'#'}>News and Events</Link>
                    </Stack>

                </SimpleGrid>
            </Container>

            <Box
                borderTopWidth={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                <Container
                    as={Stack}
                    maxW={'6xl'}
                    py={4}
                    direction={{ base: 'column', md: 'row' }}
                    spacing={4}
                    justify={{ md: 'space-between' }}
                    align={{ md: 'center' }}>
                    {/*    copyright={`${currentYear} ${defaultMessage}`}*/}
                    <Text>© 2022 The PaperMasters. Bringing Legitimacy to the Blockchain.</Text>
                    <Stack direction={'row'} spacing={7}>
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
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}