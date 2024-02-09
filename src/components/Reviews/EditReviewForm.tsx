import { Box, Button, Container } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import CustomField from '../custom/CustomField';
import { reviewOptions } from './CreateReviewForm';

const EditReviewForm = ({
  review,
  editReview,
}: {
  editReview: Function;
  review: any;
}) => {
  // Updated component name
  return (
    <Formik
      initialValues={{ text: review.text, type: review.type }}
      onSubmit={(values, actions) => {
        editReview({
          ...review,
          ...values,
        }); // Updated function name
        actions.setSubmitting(false);
        actions.resetForm();
      }}
    >
      {(props) => (
        <Form>
          <Container p={0} maxW="100%">
            <Box color="black">
              <CustomField name="text" type="textArea" rows={15} />
              <CustomField name="type" type="select" options={reviewOptions} />

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

export default EditReviewForm; // Updated component name
