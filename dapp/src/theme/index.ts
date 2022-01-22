import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'


import {global} from "./styles.global";
import {Button} from "./components/Button"
import {Box} from "./components/Box"
import {MenuButton} from "./components/MenuButton";
import {Menu} from "./components/Menu"
const theme = extendTheme({
    styles: {
        global: global
    },
    components: {
        Button,
        Box,
        MenuButton,
        Menu
    }
});
export default theme;