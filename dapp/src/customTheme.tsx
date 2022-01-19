import {ChakraProvider, extendTheme} from '@chakra-ui/react'


const theme = extendTheme({
    components: {
        Button: {
            // 1. We can update the base styles
            baseStyle: {
                fontWeight: 'bold', // Normally, it is "semibold"
            },
            // 2. We can add a new button size or extend existing
            sizes: {
                xl: {
                    h: '56px',
                    fontSize: 'lg',
                    px: '32px',
                },
            },
            // 3. We can add a new visual variant
            variants: {
                'with-shadow': {
                    bg: 'red.400',
                    boxShadow: '0 0 2px 2px #efdfde',
                },
                colorful: {
                    item: {
                        color: '#694b69'
                    },
                    // 4. We can override existing variants
                    solid: (props: any) => ({
                        bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
                    }),
                },
            },
        },

        MenuButton: {
            // 1. We can update the base styles
            baseStyle: {
                fontWeight: 'bold', // Normally, it is "semibold"
            },
            // 2. We can add a new button size or extend existing
            sizes: {
                xl: {
                    h: '56px',
                    fontSize: 'lg',
                    px: '32px',
                },
                sm: {
                    h: '26px',
                    fontSize: 'sm',
                    px: '12px',
                },
            },
                // 3. We can add a new visual variant
                variants: {
                    'with-shadow': {
                        bg: 'red.400',
                        boxShadow: '0 0 2px 2px #efdfde',
                    },
                    colorful: {
                        item: {
                            color: 'orange.600'
                        },
                    // 4. We can override existing variants
                    solid: (props: any) => ({
                        bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
                    }),
                },
            },
            defaultProps: {
                variant: '#9c7e9c'
            },
        },

        Menu: {
            parts: ['menu', 'item'],
            baseStyle: {
                menu: {
                    boxShadow: 'lg',
                    square: 'lg',
                    flexDirection: 'column',
                    py: '2',
                },
                item: {
                    fontWeight: 'medium',
                    lineHeight: 'normal',
                    color: 'gray.600',
                },
            },
            sizes: {
                sm: {
                    item: {
                        fontSize: '0.75rem',
                        px: 2,
                        py: 1,
                    },
                },
                md: {
                    item: {
                        fontSize: '0.875rem',
                        px: 3,
                        py: 2,
                    },
                },
            },
            variants: {
                bold: {
                    item: {
                        fontWeight: 'bold',
                    },
                    menu: {
                        boxShadow: 'xl',
                    },
                },
                colorful: {
                    item: {
                        color: '#694b69',
                    },
                    menu: {
                        bg: 'orange.100',
                    },
                },
            },
            defaultProps: {
                size: 'lg',
                variant: 'colorful'
            },
        },

    },
})

export default theme;

