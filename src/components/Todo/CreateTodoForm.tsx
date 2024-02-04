import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
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
];

const CreateTodoForm = ({ createTodo }: { createTodo: Function }) => {
  return (
    <Formik
      initialValues={{ title: '', type: '' }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          createTodo(values);
          actions.setSubmitting(false);
          actions.resetForm();
        }, 1000);
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
                New Todo
              </Heading>
            </Box>
            <Box p="1rem 1.5rem" color="black">
              <CustomField name="title" type="input" />
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

export default CreateTodoForm;
