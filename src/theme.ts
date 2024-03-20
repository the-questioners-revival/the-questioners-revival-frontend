// theme.ts

import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    black: '#000',
    white: '#fff',
    green: '#21D19F',
    greenLight: '#4CAF4F',
    purpleDark: '#222A68',
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});

export default theme;
