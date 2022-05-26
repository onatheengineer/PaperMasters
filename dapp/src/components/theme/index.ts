import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

import { global } from './styles.global';
import { Button } from './components/Button';
import { Box } from './components/Box';
import { colors } from './colors';
import { Card } from './components/Card';
import { Heading } from './components/Heading';
import { Text } from './components/Text';
import { SocialMediaLinks } from './components/SocialMediaLinks';
import { Link } from './components/Link';
import { Divider } from './components/Divider';

const theme = extendTheme({
  colors,
  styles: {
    global,
  },
  components: {
    Button,
    Box,
    Card,
    Heading,
    SocialMediaLinks,
    Link,
    Divider,
    Text,
  },
});
export default theme;
