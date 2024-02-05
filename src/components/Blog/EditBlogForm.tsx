import { Box, Button, Container } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import CustomField from '../custom/CustomField';

const EditBlogForm = ({
  editBlog,
  blog,
}: {
  editBlog: Function;
  blog: any;
}) => {
  // Updated component name
  return (
    <Formik
      initialValues={{ text: blog.text }}
      onSubmit={(values, actions) => {
        editBlog({
          id: blog.id,
          given_at: blog.given_at,
          deleted_at: blog.deleted_at,
          text: values.text,
        }); // Updated function name
        actions.setSubmitting(false);
        actions.resetForm();
      }}
    >
      {(props) => (
        <Form>
          <Container p={0} maxW="100%">
            <Box color="black">
              <CustomField name="text" type="textArea" rows={15}/>

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

export default EditBlogForm; // Updated component name
