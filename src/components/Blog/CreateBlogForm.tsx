import { Box, Button, Container } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import CustomField from '../custom/CustomField';

const CreateBlogForm = ({
  createBlog,
  date,
}: {
  createBlog: Function;
  date: any;
}) => {
  // Updated component name
  return (
    <Formik
      initialValues={{ text: '' }}
      onSubmit={(values, actions) => {
        createBlog({ text: values.text, given_at: date }); // Updated function name
        actions.setSubmitting(false);
        actions.resetForm();
      }}
    >
      {(props) => (
        <Form>
          <Container p={0} maxW="100%">
            <Box color="black">
              <CustomField name="text" type="textArea" />

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

export default CreateBlogForm; // Updated component name
