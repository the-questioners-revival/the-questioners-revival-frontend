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

const EditTodoForm = ({
  editTodo,
  todo,
}: {
  editTodo: Function;
  todo: any;
}) => {
  return (
    <Formik
      initialValues={{ title: todo.title, type: todo.type }}
      onSubmit={(values, actions) => {
        console.log('values: ', values);
        editTodo({ id: todo.id, status: todo.status, ...values });
        actions.setSubmitting(false);
        actions.resetForm();
      }}
    >
      {(props) => (
        <Form>
          <Container p={0} maxW="100%">
            <Box color="black">
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

export default EditTodoForm;
