import { Box, Button, Container, Heading, useColorModeValue } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import CustomField from '../custom/CustomField';

export const habitTypeOptions = [
  {
    name: 'Good',
    value: 'good',
  },
  {
    name: 'Bad',
    value: 'bad',
  },
];

export const habitRepeatOptions = [
  {
    name: 'Daily',
    value: 'daily',
  },
];

const CreateHabitForm = ({ createHabit }: { createHabit: Function }) => {
  const bgColor = useColorModeValue("greenLight", "black");

  // Updated component name
  return (
    <Formik
      initialValues={{ title: '', type: '' }}
      onSubmit={(values, actions) => {
        createHabit(values); // Updated function name
        actions.setSubmitting(false);
        actions.resetForm();
      }}
    >
      {(props) => (
        <Form>
          <Container bg="#F1F0EA" p={0} maxW="100%">
            <Box
              bg={bgColor}
              display={'flex'}
              p="0 1.5rem"
              h="50px"
              alignItems="center"
            >
              <Heading as="h2" size="lg">
                New Habit {/* Updated text */}
              </Heading>
            </Box>
            <Box p="1rem 1.5rem" color="black">
              <CustomField name="title" type="input" />
              <CustomField
                name="type"
                type="select"
                options={habitTypeOptions}
              />
              <CustomField
                name="repeat"
                type="select"
                options={habitRepeatOptions}
                required={false}
              />

              <Button
                mt={4}
                display="flex"
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Box>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default CreateHabitForm; // Updated component name
