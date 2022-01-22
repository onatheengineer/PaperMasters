export const MenuButton = {
    // 1. We can update the base styles
    baseStyle: {
        fontWeight: 'bold',
        color:"#bb0000",
        border:"3px",
        borderColor:"black"
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
    },
};
