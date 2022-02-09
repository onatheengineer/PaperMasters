export const MenuButton = {
    // 1. We can update the base styles
    baseStyle: {
        fontSize: '2em',
        fontWeight: 'bold',
        color:"#694b69",
        border:"3px",
        borderColor:"black"
    },
    // 2. We can add a new button size or extend existing
    sizes: {
        xl: {
            h: '56px',
                fontSize: '2em',
                px: '32px',
        },
        lg: {
            h: '26px',
            fontSize: '2em',
            px: '26px',
        },
        sm: {
            h: '26px',
                fontSize: '2em',
                px: '26px',
        },
    },
    // 3. We can add a new visual variant
    variants: {
        'with-shadow': {
            bg: 'red.400',
                boxShadow: '0 0 2px 2px #c1aec1',
        },
        colorful: {
            item: {
                color: '#694b69'
            },
            // 4. We can override existing variants
            // solid: (props: any) => ({
            //     bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
            // }),
        },
    },
    defaultProps: {
    },
};
