import { Box, Button, Container, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import CustomField from '../custom/CustomField';

const LoginForm = ({ login }: { login: Function }) => {
  // Updated component name
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={(values, actions) => {
        login(values); // Updated function name
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
                Login
              </Heading>
            </Box>
            <Box p="1rem 1.5rem" color="black">
              <CustomField name="username" type="input" />
              <CustomField name="password" type="input" />

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

export default LoginForm;
