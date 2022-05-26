export const SocialMediaLinks = {
  // 1. We can update the base styles

  baseStyle: {
    bg: 'pmpurple.2',
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
        color: '#694b69',
      },
      // 4. We can override existing variants
      solid: (props: any) => ({
        bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
      }),
    },
  },
};
