import { extendTheme } from '@chakra-ui/react';

import { colors } from './colors';
import { Box } from './components/Box';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { Divider } from './components/Divider';
import { Heading } from './components/Heading';
import { Link } from './components/Link';
import { SocialMediaLinks } from './components/SocialMediaLinks';
import { Text } from './components/Text';
import { global } from './styles.global';

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
