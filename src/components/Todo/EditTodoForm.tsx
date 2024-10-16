import { Box, Button, Container } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import CustomField from '../custom/CustomField';
import { todoPriorityOptions, todoTypeOptions } from './CreateTodoForm';

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
      initialValues={{
        title: todo.title,
        type: todo.type,
        priority: todo.priority,
      }}
      onSubmit={(values, actions) => {
        editTodo({ ...todo, ...values });
        actions.setSubmitting(false);
        actions.resetForm();
      }}
    >
      {(props) => (
        <Form>
          <Container p={0} maxW="100%">
            <Box color="black">
              <CustomField name="title" type="input" />
              <CustomField
                name="type"
                type="select"
                options={todoTypeOptions}
              />
              <CustomField
                name="priority"
                type="select"
                required={false}
                options={todoPriorityOptions}
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

export default EditTodoForm;
