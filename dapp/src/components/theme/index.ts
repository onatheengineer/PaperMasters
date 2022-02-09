import {extendTheme} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

import {global} from "./styles.global";
import {Button} from "./components/Button";
import {Box} from "./components/Box";
import {MenuButton} from "./components/MenuButton";
import {colors} from './colors';
import {Card} from './components/Card';
import {Heading} from './components/Heading';
import {SocialMediaLinks} from "./components/SocialMediaLinks";
import {Link} from "./components/Link";


const theme = extendTheme({
    colors,
    styles: {
        global,
    },
    components: {
        Button,
        Box,
        MenuButton,
        Card,
        Heading,
        SocialMediaLinks,
        Link,
    }
});
export default theme;