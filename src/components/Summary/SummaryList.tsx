import { Box, Heading } from '@chakra-ui/react';
import moment from 'moment';

const SummaryList = ({ data }: { data: any }) => {
  console.log('data: ', data);
  return (
    <Box>
      <Heading as="h1" fontSize="2xl" marginBottom="20px">
        Summary List
      </Heading>
      <Box>
        {data?.map((dataByDate: any) => (
          <Box marginBottom="15px" border="2px solid white" borderRadius="10" padding='10px'>
            <Heading as="h2" fontSize="xl">
              {moment(dataByDate?.date).format('DD.MM.YYYY')}
            </Heading>
            {dataByDate?.todos?.length > 0 ? (
              <Heading as="h3" fontSize="lg" marginTop="10px">
                Todos:
              </Heading>
            ) : null}
            {dataByDate?.todos?.map((todo: any) => (
              <Box>{todo?.title}</Box>
            ))}
            {dataByDate?.qaas?.length > 0 ? (
              <Heading as="h3" fontSize="lg" marginTop="10px">
                QaAs:
              </Heading>
            ) : null}

            {dataByDate?.qaas?.map((qaa: any) => (
              <Box>{qaa?.question}</Box>
            ))}
            {dataByDate?.blogs?.length > 0 ? (
              <Heading as="h3" fontSize="lg" marginTop="10px">
                Blogs:
              </Heading>
            ) : null}

            {dataByDate?.blogs?.map((blog: any) => (
              <Box>{blog?.text}</Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SummaryList;
