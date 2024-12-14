import { Box, Button, Container, FormLabel } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import CustomField from '../custom/CustomField';
import moment from 'moment';
import HtmlEditor from '../HtmlEditor/HtmlEditor';
import useEditorSettings from '../HtmlEditor/settings';

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
  const editor = useEditorSettings(
    `
    <p><br><br><br></p>`,
    true,
  );

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
          text: editor?.getHTML(),
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
              <FormLabel>Text</FormLabel>
              <Box background="white">
                <HtmlEditor editor={editor} />
              </Box>
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
