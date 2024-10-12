// theme.ts

import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    black: '#000',
    white: '#fff',
    greenMain: '#21D19F',
    purpleDark: '#222A68',
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});

export default theme;
