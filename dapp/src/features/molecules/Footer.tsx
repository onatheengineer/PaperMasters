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
    useColorModeValue, ButtonGroupProps,
} from '@chakra-ui/react';
import {FaTwitter, FaYoutube, FaInstagram, FaLinkedin} from 'react-icons/fa';
import PMLogo from "../../../src/PaperMastersLogoGIMP.png"
import Logo from "../../PaperMastersLogoGIMP.png";
import {Link as ReachLink} from "react-router-dom";
import { LinkGrid } from '../atoms/LinkGrid';
import { SubscribeForm } from '../atoms/SubscribeForm';
//import AppStoreBadge from '@/components/AppStoreBadge';
//import PlayStoreBadge from '@/components/PlayStoreBadge';
import {SocialMediaLinks} from "../atoms/SocialMediaLinks";
import FooterHeading from "../atoms/FooterHeading";




import React from 'react';
import {useState, useEffect} from "react";
import type {FC} from 'react'


interface Interface {

}

export const Footer:FC<Interface>=()=>{

    return(
        <div>
            <FooterHeading/>
          <SocialMediaLinks/>
        </div>
    )
};

export default Footer;

