export const Link = {

    baseStyle: {
        transitionProperty: "common",
        transitionDuration: "fast",
        transitionTimingFunction: "ease-out",
        cursor: "pointer",
        textDecoration: "none",
        outline: "none",
        color: "pmpurple.13",
        _hover: {
            textDecoration: "underline"
        },
        _focus: {
            boxShadow: "none"
        }
    },
    variants: {
        navLinks: {
            _hover: {
                textDecoration: "none"
            },
        },
    }
}

//from F12, direction