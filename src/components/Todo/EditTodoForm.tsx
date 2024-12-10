import { Box, Button, Container } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import CustomField from '../custom/CustomField';
import { todoPriorityOptions, todoTypeOptions } from './CreateTodoForm';
import { useCategoryContext } from '../Category/CategoriesContext';

const EditTodoForm = ({
  editTodo,
  todo,
}: {
  editTodo: Function;
  todo: any;
}) => {
  const { categoriesOptions } = useCategoryContext();

  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: todo.title,
        type: todo.type,
        priority: todo.priority,
        category_id: todo.category_id,
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
              <CustomField
                required={false}
                name="category_id"
                type="select"
                options={categoriesOptions}
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
