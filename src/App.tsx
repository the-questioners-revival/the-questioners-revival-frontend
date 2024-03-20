import CustomRouter from './CustomRouter';
import FloatingLoader from './components/FloatingLoader';
import theme from './theme';
import {
  ColorModeProvider,
  ColorModeScript,
  ThemeProvider,
} from '@chakra-ui/react';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <div className="App">
          <CustomRouter />
          <FloatingLoader />
        </div>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
