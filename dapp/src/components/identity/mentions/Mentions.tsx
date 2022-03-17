import * as React from 'react';
import {FC, useEffect, useRef, useState} from "react";
import moment from 'moment';
import {
    Avatar, AvatarGroup, Box, Button, Flex, Grid, GridItem, Icon, Image, Link, MenuItem,
    Stack, Switch, Text, useColorModeValue, HStack, useDisclosure, Tooltip, VStack,
    Container, AspectRatio, AvatarBadge, Divider, Center, InputRightElement, useStyleConfig,
    TabPanel, TabPanels, TabList, Tabs, Tab, Select, RadioGroup, Radio, Textarea,
    FormLabel, InputGroup, InputLeftAddon, InputRightAddon, Input, Heading, Spacer,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import {AiOutlineComment} from "react-icons/ai";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useParams} from "react-router-dom";
import {paramsWalletAccAction} from "../../../features/IdentityPageUseParamsSlice";



interface Interface {

}

export const Mentions: FC<Interface>=()=> {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [scrollBehavior, setScrollBehavior] = useState('inside')

    const btnRef = useRef(null)

    return(

        <>
            <Box p="5px">
                <Text fontSize="18px" color={'pmpurple.13'} fontWeight="bold">
                    Mentions Box mini - view
                </Text>
            </Box>


        </>
    )
}

export default Mentions;