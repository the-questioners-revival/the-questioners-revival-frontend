import { Box, Flex, Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import Footer from './CustomFooter';
import CustomHeader from './CustomHeader';

const CustomLayout = ({ children }: { children: any }) => {
  const bgColor = useColorModeValue('white', 'black');
  const color = useColorModeValue('black', 'white');
  const bgColorBody = useColorModeValue('green', 'purpleDark');

  return (
    <Grid
      minHeight={'100vh'}
      maxWidth="100%"
      width="100%"
      templateAreas={`"header"
                  "main"
                  "footer"`}
      gridTemplateRows={'50px 1fr 50px'}
      gridTemplateColumns={'1fr'}
      color="white"
      fontWeight="bold"
    >
      <GridItem
        bg={bgColor}
        color={color}
        display="flex"
        alignItems="center"
        area="header"
        maxWidth="100%"
        width="100%"
        overflowX="hidden"
        overflowY="unset"
        position="fixed"
        zIndex={1}
        boxShadow="0px 1px 5px rgba(190, 190, 190, 0.46) !important"
      >
        <CustomHeader />
      </GridItem>
      <GridItem
        pl="2"
        bg={bgColorBody}
        area="main"
        maxWidth="100%"
        width="100%"
        overflowX="hidden"
        overflowY="hidden"
        paddingX={{ base: '10px', md: '150px' }}
      >
        <Box maxW="760px" margin="auto" h="100%">
          {children}
        </Box>
      </GridItem>
      <GridItem
        pl="2"
        bg={bgColor}
        color={color}
        display="flex"
        alignItems="center"
        justifyContent="center"
        area="footer"
        maxWidth="100%"
        width="100%"
        overflowX="hidden"
        overflowY="unset"
        paddingX={{ base: '10px', md: '150px' }}
      >
        <Box>
          <Footer />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default CustomLayout;
