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
      initialValues={{
        text: 'Morning Gratitude\n\n\nAffirmations\n\n\nWhat I did during the day\n\n\nHow did I feel today\n\n\nGoals for tomorrow\n',
      }}
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

export default CreateBlogForm; // Updated component name
