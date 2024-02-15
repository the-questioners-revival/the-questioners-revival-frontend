import { Box, Grid, GridItem } from '@chakra-ui/react';
import Footer from './CustomFooter';
import CustomHeader from './CustomHeader';

const CustomLayout = ({ children }: { children: any }) => {
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
        pl="2"
        bg="#2c3e4f"
        display="flex"
        alignItems="center"
        area="header"
        maxWidth="100%"
        width="100%"
        overflowX="scroll"
        overflowY="unset"
        paddingX={{ base: '10px', md: '150px' }}
      >
        <CustomHeader />
      </GridItem>
      <GridItem
        pl="2"
        bg="#19BC9B"
        area="main"
        maxWidth="100%"
        width="100%"
        overflowX="scroll"
        overflowY="unset"
        paddingX={{ base: '10px', md: '150px' }}
      >
        {children}
      </GridItem>
      <GridItem
        pl="2"
        bg="#2c3e4f"
        display="flex"
        alignItems="center"
        justifyContent="center"
        area="footer"
        maxWidth="100%"
        width="100%"
        overflowX="scroll"
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
