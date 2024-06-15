export const Text = {
  baseStyle: {
    fontWeight: 'bold',
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
      solid: (props: any) => ({
        bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
      }),
    },
  },
};
