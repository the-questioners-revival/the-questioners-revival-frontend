import { Box, Button, Container, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import CustomField from '../custom/CustomField';

const options = [
  {
    name: 'Personal',
    value: 'personal',
  },
  {
    name: 'Work',
    value: 'work',
  },
  {
    name: 'Project',
    value: 'project',
  },
  {
    name: 'Learn',
    value: 'learn',
  },
  {
    name: 'Coding',
    value: 'coding',
  },
  {
    name: 'Other',
    value: 'other',
  },
];

const CreateQaaForm = ({ createQaa }: { createQaa: Function }) => {
  // Updated component name
  return (
    <Formik
      initialValues={{ question: '', answer: '', link: '', type: '' }}
      onSubmit={(values, actions) => {
        createQaa(values); // Updated function name
        actions.setSubmitting(false);
        actions.resetForm();
      }}
    >
      {(props) => (
        <Form>
          <Container bg="#F1F0EA" p={0} maxW="100%">
            <Box
              bg="#4CAF4F"
              display={'flex'}
              p="0 1.5rem"
              h="50px"
              alignItems="center"
            >
              <Heading as="h2" size="lg">
                New Qaa {/* Updated text */}
              </Heading>
            </Box>
            <Box p="1rem 1.5rem" color="black">
              <CustomField name="question" type="input" />
              <CustomField name="answer" type="textArea" />
              <CustomField name="link" type="input" required={false} />
              <CustomField name="type" type="select" options={options} />

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

export default CreateQaaForm; // Updated component name
