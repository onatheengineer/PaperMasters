export const Heading = {
  // 1. We can update the base styles
  baseStyle: {
    fontWeight: 'bold', // Normally, it is "semibold"
    color: 'pmpurple.13',
  },
  sizes: {
    xl: {
      h: '36px',
      fontSize: '32px',
    },
    lg: {
      fontSize: '28px',
    },
  },
  // 3. We can add a new visual variant
  variants: {
    'with-shadow': {
      bg: 'red.400',
      boxShadow: '0 0 2px 2px #efdfde',
    },
    contentHeader: {
      px: '22px',
      pt: '12px',
      pb: '24px',
      mb: '18px',
    },
    colorful: {
      item: {
        color: '#694b69',
      },
      // 4. We can override existing variants
      solid: (props: any) => ({
        bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
      }),
    },
  },
};
