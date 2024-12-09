import CustomRouter from './CustomRouter';
import { CategoryProvider } from './components/Category/CategoriesContext';
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
        <CategoryProvider>
          <div className="App">
            <CustomRouter />
            <FloatingLoader />
          </div>{' '}
        </CategoryProvider>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
