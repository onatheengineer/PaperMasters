import {ReactNode} from "react";
import * as React from 'react'
import {
    Box, ButtonGroupProps,
    chakra,
    Container,
    Heading,
    HeadingProps, Icon,
    Link,
    SimpleGrid,
    Stack,
    Text,
    useColorModeValue, VisuallyHidden,
    ButtonGroup,
    IconButton,
    Flex,
} from '@chakra-ui/react'
import PMLogo from "../../assets/PaperMastersLogoGIMP.png";
import {Link as ReachLink} from "react-router-dom";
import {BsHeartFill} from "react-icons/bs";
import {FaDiscord, FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaYoutube} from "react-icons/fa";



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
            color='pmpurple.12'
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

const ListHeader = ({ children }: { children: ReactNode }) => {
    return (
        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
            {children}
        </Text>
    );
};

export default function Footer(props: ButtonGroupProps) {
    return (

        <Box
            flex={'auto'}
            bg={'pmpurple.2'}
            color={'pmpurple.13'}
            borderTopWidth={1}
            borderStyle={'solid'}
            borderColor={'pmpurple.8'}>
            <Container as={Stack}
                       maxW={'9xl'}
                       px={2}
                       pt={8}
                       pb={8}
                       pl={16}
                       direction={{base: 'column', md: 'row'}}
                       justify={'center'}>
                <SimpleGrid columns={5} spacing={24}>

                    <Stack>
                        {/*<ListHeader ><img src={PMLogo}/></ListHeader>*/}
                        <Link as={ReachLink} to="/"><img src={PMLogo}/></Link>
                        {/*<AppStoreBadge />*/}
                        {/*<PlayStoreBadge />*/}
                    </Stack>
                    <Stack>
                        <ListHeader>Services</ListHeader>
                        <Link as={ReachLink} to="/">Non-Fungible Identities</Link>
                        <Link as={ReachLink} to="/">Validation</Link>
                        <Link as={ReachLink} to="/">Search</Link>
                        <Link as={ReachLink} to="/">Report</Link>
                        <Link as={ReachLink} to="/">CloudHWM</Link>
                    </Stack>
                    <Stack>
                        <ListHeader>Community Support</ListHeader>
                        <Link as={ReachLink} to="/">Learning Center</Link>
                        <Link as={ReachLink} to="/">Authentic PM Identities</Link>
                        <Link as={ReachLink} to="/">Community Guidelines</Link>
                        <Link as={ReachLink} to="/">New & Updated Features</Link>
                        <Link as={ReachLink} to="/">Future Stories</Link>
                    </Stack>
                    <Stack>
                        <ListHeader>Security</ListHeader>
                        <Link as={ReachLink} to="/">Blockchain Protection</Link>
                        <Link as={ReachLink} to="/">Blockchain Legitimacy</Link>
                        <Link as={ReachLink} to="/">Privacy Policy</Link>
                        <Link as={ReachLink} to="/">Terms of Service</Link>
                    </Stack>
                    <Stack>
                        <ListHeader>Your People</ListHeader>
                        <Link as={ReachLink} to="/Analytics">Analytics</Link>
                        <Link as={ReachLink} to="/AboutUs">About Us</Link>
                        <Link as={ReachLink} to="/SupportProject">Support the Project</Link>
                        <Link as={ReachLink} to="/Logokit">Logo Kit</Link>
                    </Stack>

                </SimpleGrid>
            </Container>

            <Box
                bg={"white"}
                // minH={'80px'}
                // maxH={"120px"}
               // border={'1px solid'}
                //borderColor={'pmpurple.9'}
              >
                <Container
                    as={Stack}
                    maxW={'7xl'}
                    py={4}
                    direction={{base: 'column', md: 'row'}}
                    spacing={8}
                    justify={{md: 'space-between'}}
                    align={'center'}>
                    {/*<Copyright />*/}
                    {/*    copyright={`${currentYear} ${defaultMessage}`}*/}
                    <Text color='pmpurple.13'>© 2022 Made with <Icon as={BsHeartFill} fontSize={'13px'}
                                                                     color='pmpurple.11'
                                                                     style={{marginRight: "5px", marginLeft: "5px"}}/>
                        by The PaperMasters ~ working to bring protection and legitimacy to the Blockchain.</Text>
                    <Stack direction={'row'} spacing={7}>
                        <SocialButton label={'Twitter'} href={'https://twitter.com/ramonajenny_n'}>
                            <FaTwitter/>
                        </SocialButton>
                        <SocialButton label={'YouTube'}
                                      href={'https://www.youtube.com/channel/UC-w92fylwBTYGK--jse0jeQ'}>
                            <FaYoutube/>
                        </SocialButton>
                        <SocialButton label={'Instagram'}
                                      href={'https://www.instagram.com/ramonaandrew_niederhausern/'}>
                            <FaInstagram/>
                        </SocialButton>
                        <SocialButton label={'Linkedin'} href={'https://www.linkedin.com/in/ramonajenny/'}>
                            <FaLinkedin/>
                        </SocialButton>
                        <SocialButton label={'Linkedin'} href={'https://www.linkedin.com/in/andrew-nieder/'}>
                            <FaLinkedin/>
                        </SocialButton>
                        <SocialButton label={'GitHub'} href={'https://github.com/ramonajenny'}>
                            <FaGithub/>
                        </SocialButton>
                        <SocialButton label={'GitHub'} href={'https://github.com/Arzemn'}>
                            <FaGithub/>
                        </SocialButton>
                        <SocialButton label={'GitHub'} href={'https://discord.com/channels/ramonajenny#1512'}>
                            <FaDiscord/>
                        </SocialButton>
                    </Stack>
                </Container>
            </Box>
        </Box>

    );
};