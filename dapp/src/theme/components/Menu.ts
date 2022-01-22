export const Menu = {
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
            color:"purple.100"
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
    },
};