import { Box, Button, Container } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import CustomField from '../custom/CustomField';
import moment from 'moment';

export const reviewOptions = [
  {
    name: 'Weekly',
    value: 'weekly',
  },
  {
    name: 'Monthly',
    value: 'monthly',
  },
  {
    name: 'Yearly',
    value: 'yearly',
  },
];

const CreateReviewForm = ({
  createReview,
  date,
}: {
  createReview: Function;
  date: any;
}) => {
  // Updated component name
  return (
    <Formik
      initialValues={{
        text: '',
        type: '',
      }}
      onSubmit={(values, actions) => {
        const startOf = values.type.slice(0, -2) as any;
        const startDate = moment(date).startOf(startOf).toISOString();
        createReview({
          text: values.text,
          type: values.type,
          given_at: startDate,
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

export default CreateReviewForm; // Updated component name
