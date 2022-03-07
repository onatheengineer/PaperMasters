import * as React from 'react';
import {FC, useRef, useState} from "react";
import moment from 'moment';
import {
    Avatar, AvatarGroup, Box, Button, Flex, Grid, GridItem, Icon, Image, Link, MenuItem,
    Stack, Switch, Text, useColorModeValue, HStack, useDisclosure, Tooltip, VStack,
    Container, AspectRatio, AvatarBadge, Divider, Center, InputRightElement, useStyleConfig,
    TabPanel, TabPanels, TabList, Tabs, Tab, Select, RadioGroup, Radio, Textarea,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton, FormLabel, InputGroup, InputLeftAddon, InputRightAddon, Input, Heading, Spacer,
} from "@chakra-ui/react";
import {AiOutlineComment} from "react-icons/ai";
import {useAppSelector} from "../../app/hooks";
import {useParams} from "react-router-dom";




interface Interface {

}

export const Mentions: FC<Interface>=()=> {

    const [resize, setResize] = useState('horizontal')
    const {isOpen, onOpen, onClose} = useDisclosure()
    const firstField = useRef<HTMLTextAreaElement>(null)
    const filledAccountsArr = useAppSelector((state) => state.register.accounts);
    const {walletAccount} = useParams();

    const dateFormated = moment().format('MMM DD YYYY, hh:mm:ss a');


    return (

            <HStack>
                <Box  p="5px">
                    <Text fontSize="18px" color={'pmpurple.13'} fontWeight="bold">
                        Mentions
                    </Text>
                </Box>

<Spacer/>
                {filledAccountsArr[0] !== walletAccount ?
                    <Box>

                        <Button leftIcon={<AiOutlineComment/>} color={'pmpurple.10'} onClick={onOpen}>
                            <Text fontSize="14px"  >
                                Add Mention
                            </Text>
                        </Button>

                        <Drawer
                            isOpen={isOpen}
                            placement='right'
                            initialFocusRef={firstField}
                            onClose={onClose}
                        >
                            <DrawerOverlay/>
                            <DrawerContent>
                                <DrawerCloseButton/>
                                <DrawerHeader
                                    color='pmpurple.15'
                                    borderBottomWidth='1px'>
                                    Mentions
                                </DrawerHeader>

                                <DrawerBody>
                                    <Stack spacing='24px'>
                                        <Box>
                                            <FormLabel
                                                mt={'22px'}
                                                color='pmpurple.15'
                                                htmlFor='username'>From Wallet Account</FormLabel>
                                            {filledAccountsArr.length !== 0 ?
                                                <Input
                                                    isDisabled={true}
                                                    border={'1px solid'}
                                                    borderColor={'pmpurple.8'}
                                                    bg={'pmpurple.2'}
                                                    color='pmpurple.15'
                                                    value={filledAccountsArr[0]}
                                                    id='username'
                                                    placeholder={filledAccountsArr[0]}
                                                />
                                                :
                                                <Input
                                                    color='pmpurple.15'
                                                    border={'1px solid'}
                                                    borderColor={'pmpurple.6'}
                                                    bg={'pmpurple.2'}
                                                    value={filledAccountsArr[0]}
                                                    id='username'
                                                    placeholder='Please Connect your Wallet'
                                                />

                                            }
                                            <FormLabel
                                                mt={'22px'}
                                                color='pmpurple.15'
                                                htmlFor='username'>To Wallet Account</FormLabel>
                                            {filledAccountsArr.length !== 0 ?
                                                <Input
                                                    isDisabled={true}
                                                    border={'1px solid'}
                                                    borderColor={'pmpurple.8'}
                                                    bg={'pmpurple.2'}
                                                    color='pmpurple.15'
                                                    value={filledAccountsArr[0]}
                                                    id='username'
                                                    placeholder={filledAccountsArr[0]}
                                                />
                                                :
                                                <Input
                                                    color='pmpurple.15'
                                                    border={'1px solid'}
                                                    borderColor={'pmpurple.6'}
                                                    bg={'pmpurple.2'}
                                                    value={filledAccountsArr[0]}
                                                    id='username'
                                                    placeholder='Please Connect your Wallet'
                                                />

                                            }

                                        </Box>
                                        <RadioGroup mt={'48px'} defaultValue={resize} onChange={setResize}
                                                    mb={'0px'}>
                                            <Stack direction='row' spacing={5}>
                                                <Radio color='pmpurple.15' bg={'pmgreen.15'}
                                                       colorScheme='green' value='Positive'>Postive</Radio>
                                                <Radio color='pmpurple.15' bg={'red.600'} colorScheme='red'
                                                       value='Negative'>Negative</Radio>
                                                <Radio color='pmpurple.15' bg={'pmpurple.6'}
                                                       colorScheme='pmpurple.13'
                                                       value='Neutral'>Neutral</Radio>
                                            </Stack>
                                        </RadioGroup>

                                        <Box>
                                            <FormLabel
                                                mt={'0px'}
                                                color='pmpurple.15'
                                                htmlFor='desc'>Add Mention</FormLabel>
                                            <Textarea
                                                color='pmpurple.13'
                                                border={'1px solid'}
                                                borderColor={'pmpurple.6'}
                                                bg={'pmpurple.2'}
                                                h={'400px'}
                                                id='desc' ref={firstField}
                                                placeholder='Give a Mention'
                                            />
                                        </Box>
                                        <Box>
                                            <Input
                                                isDisabled={true}
                                                border={'1px solid'}
                                                borderColor={'pmpurple.8'}
                                                bg={'pmpurple.2'}
                                                color='pmpurple.15'
                                                value={dateFormated}
                                                id='username'
                                                placeholder={'Date'}
                                            />

                                        </Box>

                                    </Stack>
                                </DrawerBody>

                                <DrawerFooter borderTopWidth='1px'>
                                    <Button
                                        variant='outline'
                                        color='pmpurple.12'
                                        border={'1px solid'}
                                        borderColor={'pmpurple.6'}
                                        bg={'pmpurple.2'}
                                        mr={3}
                                        onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button
                                        color='pmpurple.12'
                                        border={'1px solid'}
                                        borderColor={'pmpurple.6'}
                                        bg={'pmpurple.4'}
                                    > Submit </Button>

                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>

                    </Box>


                    :
                    null
                }
            </HStack>
    )
};

export default Mentions;
