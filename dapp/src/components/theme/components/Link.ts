export const Link = {
  baseStyle: {
    transitionProperty: 'common',
    transitionDuration: 'fast',
    transitionTimingFunction: 'ease-out',
    cursor: 'pointer',
    textDecoration: 'none',
    outline: 'none',
    color: 'pmpurple.13',
    baseStyle: {
      _focus: {
        boxShadow: 'none !important',
      },
    },
    _hover: {
      textDecoration: 'none !important',
    },
    _active: {
      boxShadow: 'transparent !important',
      color: 'pmpurple.9',
      transform: 'scale(0.96)',
    },
  },
  variants: {
    navLinks: {
      _focus: {
        boxShadow: 'none !important',
      },
      _hover: {
        textDecoration: 'none !important',
      },
    },
  },
};
