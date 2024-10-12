import { Box, Button, Container, Heading, useColorModeValue } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import CustomField from '../custom/CustomField';

export const todoTypeOptions = [
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
    name: 'Watch later',
    value: 'watch later',
  },
];

export const todoPriorityOptions = [
  {
    name: 'High',
    value: 'high',
  },
  {
    name: 'Medium',
    value: 'medium',
  },
  {
    name: 'Low',
    value: 'low',
  },
];

const CreateTodoForm = ({ createTodo }: { createTodo: Function }) => {
  const bgColor = useColorModeValue("green.400", "black");

  return (
    <Formik
      initialValues={{ title: '', type: '', priority: '' }}
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
              bg={bgColor}
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

export default CreateTodoForm;
