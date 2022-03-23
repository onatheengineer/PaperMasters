import React, {FC, ReactNode, useEffect} from 'react';
import Sparkle from 'react-sparkle';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack, Text, Container,
    MenuIcon, Spacer,
} from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import {Link as ReachLink, To, useParams} from "react-router-dom";
import {HamburgerIcon, CloseIcon, AddIcon, EditIcon, LinkIcon} from '@chakra-ui/icons';
import { Icon } from '@chakra-ui/react';
import { FaScroll } from "react-icons/fa";
import { SiSololearn } from "react-icons/si";
import { ImBooks } from "react-icons/im";
import {GiBookshelf, GiNewShoot, GiHeatHaze, GiDiscussion, GiBookCover, GiFlowerPot, GiFlowerHat} from "react-icons/gi";
import {MdManageAccounts, MdOutlineReport, MdOutlineWarningAmber, MdOutlineNaturePeople} from "react-icons/md";
import Logo from '../assets/PaperMastersLogoGIMP.png';
import PMLogo from '../assets/legoLavendar.png';
import PMGIMPResized from '../assets/PMGIMPResized.png';
import {IoMdCheckmarkCircleOutline} from "react-icons/io";
import {RiPlantFill} from "react-icons/ri";
import {FiTrendingUp} from "react-icons/fi";
import Web3 from "web3";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import RegisterSlice, {accountsArr, requestAccountsAsyncAction, statusOfArr} from '../features/UserWalletSlice';
import detectEthereumProvider from "@metamask/detect-provider";
import identity from "./pages/Identity";
import {AiOutlineFileSearch} from "react-icons/ai";
import {BiBookmarkHeart, BiHomeHeart} from "react-icons/bi";

export const SparklyComponent = () => (
    // Note: the parent of Sparkle must be positioned relatively or absolutely
    <div style={{ position: 'relative' }}>
        <Sparkle />
    </div>
)

interface navSubItemInterface {
    reachSubLink: To,
    menuSubName: string,
    iconSubItem: JSX.Element,
}
    export const NavSubItem:FC<navSubItemInterface> = ({reachSubLink, menuSubName, iconSubItem}) =>{
    return(
        <Box
            textAlign={'center'}
            _focus={
                {boxShadow: "none !important"}}
        >
        <MenuItem
            as={ReachLink} to={reachSubLink}
            _hover={{color: 'pmpurple.9'}}
            //_expanded={{ bg: 'none !important' }}
            _active={{
                color: 'pmpurple.9',
                transform: 'scale(0.98)',
            }}
            pl={'20px'}
            color={'pmpurple.13'}
            icon={iconSubItem}
        >
            <Text fontSize="md" color={'pmpurple.13'} fontWeight="semi-bold">
                {menuSubName}
            </Text>
        </MenuItem>
        </Box>
    ) }


interface navMenuItem {
    dropDown: boolean,
    navMenuName: string,
    iconNav: JSX.Element,
    menuSubArr: JSX.Element[]

}
//{`/identity/${requestAccountsArr[0]}`}
//MdManageAccounts
export const NavMenuItem:FC<navMenuItem> = ({ dropDown, navMenuName, iconNav, menuSubArr}) => {

    return (
        <Box>
            <Menu>
                <MenuButton
                    as={Button}
                    leftIcon={iconNav}
                    color={'pmpurple.13'}
                    focusBorderColor='none !important'
                    boxShadow="none !important"
                    _focus={
                        {boxShadow: "none !important"}}
                    _hover={{color: 'pmpurple.9'}}
                    _expanded={{bg: 'none !important'}}
                    _active={{
                        color: 'pmpurple.9',
                        transform: 'scale(0.98)',
                    }}
                >
                    <Text pl={'2px'} textAlign={'center'} fontSize="lg" color={'pmpurple.13'}
                          fontWeight="bold">
                        {navMenuName}
                    </Text>
                </MenuButton>

                {dropDown &&
                    <MenuList>
                        {menuSubArr}
                    </MenuList>
                }
            </Menu>
        </Box>
    )
}


export default function Navbar() {
    //const {isOpen, onOpen, onClose} = useDisclosure();
    const tokenIDtoIdentityStruct = useAppSelector((state) => state.minted.tokenIDtoIdentityStruct);
    const {walletAccount} = useParams();
    const requestAccountsArr = useAppSelector((state) => state.register.accounts);

    const dispatch = useAppDispatch();


    return (

        <Box
            //flex={'auto'}
            p={'8px'}
            alignItems={'center'}
            border={'0px solid'}
            borderBottom={'1px solid'}
            borderColor={"pmpurple.8"}
            bg={"pmpurple.2"}
            //flexBasis={{ base: "100%", md: "auto" }}
            // transform={{
            //     sm: "translateY(45%)",
            //     md: "translateY(90%)",
            //     lg: "translateY(85%)",
            // }}

        >
            <HStack spacing={8} alignItems={'center'}>
                <Box px={'16px'}><Link as={ReachLink} to="/"><img src={Logo}/></Link></Box>
                <Menu>
<NavMenuItem navMenuName={'Non-Fungible Identity'} iconNav={<MdManageAccounts fontSize={'18px'} />}
             dropDown={true}
             menuSubArr={[<NavSubItem menuSubName={'Identity'} reachSubLink={`/identity/${requestAccountsArr[0]}`} iconSubItem={<MdManageAccounts fontSize={'18px'} />} /> ,
                 <MenuDivider/>,
                 <NavSubItem menuSubName={'Register'} reachSubLink={'/register'} iconSubItem={<BiBookmarkHeart fontSize={'18px'} />}/>,
                 <NavSubItem menuSubName={'Validate'} reachSubLink={'/validate'} iconSubItem={<IoMdCheckmarkCircleOutline fontSize={'18px'} />}/>,
                 <NavSubItem menuSubName={'Report'} reachSubLink={'/report'} iconSubItem={<MdOutlineReport fontSize={'18px'} />}/>
             ]}
             />

<NavMenuItem navMenuName={'Search'} iconNav={<MdOutlineNaturePeople fontSize={'18px'} fontWeight={'bolder'} /> }
             dropDown={false}
             menuSubArr={[ ]}
/>

<NavMenuItem navMenuName={'CloudHWM'} iconNav={<GiHeatHaze fontSize={'18px'} />}
             dropDown={false}
             menuSubArr={[ ]}
/>

<NavMenuItem navMenuName={'Learning Center'} iconNav={<ImBooks fontSize={'18px'} />}
             dropDown={true}
             menuSubArr={[<NavSubItem menuSubName={'Frequently Asked Questions'} reachSubLink={'/learningCenter'} iconSubItem={<GiDiscussion fontSize={'18px'} />} /> ,
                 <MenuDivider/>,
                 <NavSubItem menuSubName={'New & Updated Features'} reachSubLink={'/learningCenter'} iconSubItem={<GiFlowerPot fontSize={'18px'} />}/>,
                 <NavSubItem menuSubName={'Report Suspicious Activity'} reachSubLink={'/learningCenter'} iconSubItem={<MdOutlineWarningAmber fontSize={'18px'} />}/>,
             ]}
/>

<NavMenuItem navMenuName={'Your People'} iconNav={<FaScroll fontSize={'18px'} />}
             dropDown={true}
             menuSubArr={[<NavSubItem menuSubName={'About Us'} reachSubLink={'/about'} iconSubItem={<GiFlowerHat fontSize={'18px'} />} /> ,
                 <MenuDivider/>,
                 <NavSubItem menuSubName={'Analytics'} reachSubLink={'/analytics'} iconSubItem={<FiTrendingUp fontSize={'18px'} />}/>,
                 <NavSubItem menuSubName={'Support'} reachSubLink={'/support'} iconSubItem={<RiPlantFill fontSize={'18px'} />}/>,
             ]}
/>

                    <Spacer/>

                    <Menu>
                        {requestAccountsArr.length === 0 ?
                            <MenuButton
                                //border={'1px solid blue'}
                                as={Button}
                                color={'pmpurple.13'}
                                onClick={() => {
                                    console.log('i am clicked')
                                    dispatch(requestAccountsAsyncAction());
                                }}
                                _hover={{color: 'pmpurple.9'}}
                                // _active={{
                                //     color: '#c1aec1',
                                //     transform: 'scale(0.96)'
                                // }}
                            >
                                <MenuItem
                                    _focus={{boxShadow: 'none'}}
                                    fontSize={'18px'} fontWeight={'Bold'}
                                    icon={<SiSololearn fontSize={'16px'}/>}>Connect Wallet</MenuItem>

                                <Sparkle
                                    color="#694b69"
                                    count={20}
                                    minSize={7}
                                    maxSize={12}
                                    overflowPx={0}
                                    fadeOutSpeed={30}
                                    flicker={false}
                                    //newSparkleOnFadeOut={false}
                                    //flickerSpeed="fast"
                                />

                            </MenuButton>

                            :

                            <MenuButton>
                                <MenuItem
                                    _focus={{boxShadow: 'none !important'}}
                                    color={'pmpurple.13'} fontSize={'18px'} fontWeight={'Bold'}
                                    icon={<SiSololearn fontSize={'16px'}/>}>Connected</MenuItem>
                            </MenuButton>
                        }

                    </Menu>
                </Menu>
            </HStack>
        </Box>
    )
};