import { Grid, GridItem } from '@chakra-ui/react';
import Footer from './CustomFooter';
import CustomHeader from './CustomHeader';

const CustomLayout = ({ children }: { children: any }) => {
  return (
    <Grid
      minHeight={'100vh'}
      templateAreas={`"header"
                  "main"
                  "footer"`}
      gridTemplateRows={'50px 1fr 30px'}
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
        paddingX={{ base: '10px', md: 150 }}
      >
        <CustomHeader />
      </GridItem>
      <GridItem
        pl="2"
        bg="#19BC9B"
        area="main"
        paddingX={{ base: '10px', md: 150 }}
      >
        {children}
      </GridItem>
      <GridItem
        pl="2"
        bg="#2c3e4f"
        display="flex"
        alignItems="center"
        justifyContent="center"
        h="50px"
        area="footer"
        paddingX={{ base: '10px', md: 150 }}
      >
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default CustomLayout;
