export const Button = {
  baseStyle: {
    lineHeight: '1.2',
    borderRadius: 'md',
    fontWeight: 'semibold',
    transitionProperty: 'common',
    transitionDuration: 'normal',
    focusBorderColor: 'none !important',
    boxShadow: 'none !important',
    _focus: {
      boxShadow: 'none !important',
    },
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed',
      boxShadow: 'none',
    },
    _hover: {
      _disabled: {
        bg: 'initial',
      },
    },
    _active: {
      bg: 'pmpurple.4',
      color: 'pmpurple.9',
      transform: 'scale(0.96)',
    },
  },
  variants: {
    unstyled: {
      bg: 'red',
      color: 'pmpurple.13',
      display: 'inline',
      lineHeight: 'inherit',
      m: 0,
      p: 0,
    },
    fontWeight: 'bold',
  },
  sizes: {
    lg: {
      h: 12,
      minW: 12,
      fontSize: 'lg',
      px: 6,
    },
    md: {
      h: 10,
      minW: 10,
      fontSize: 'md',
      px: 4,
    },
    sm: {
      h: 8,
      minW: 8,
      fontSize: 'sm',
      px: 3,
    },
    xs: {
      h: 6,
      minW: 6,
      fontSize: 'xs',
      px: 2,
    },
  },
  defaultProps: {
    variant: 'solid',
    size: 'md',
    colorScheme: 'pmpurple.13',
  },
};
