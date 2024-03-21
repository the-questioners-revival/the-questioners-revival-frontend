import { Box, Button, Container, FormLabel } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import CustomField from '../custom/CustomField';
import { reviewOptions } from './CreateReviewForm';
import HtmlEditor from '../HtmlEditor/HtmlEditor';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';

const EditReviewForm = ({
  review,
  editReview,
}: {
  editReview: Function;
  review: any;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
    ],
    editorProps: {
      attributes: {
        class: 'Editor',
      },
    },
    content: review?.text,
  });
  // Updated component name
  return (
    <Formik
      initialValues={{ text: review.text, type: review.type }}
      onSubmit={(values, actions) => {
        editReview({
          ...review,
          ...values,
          text: editor?.getHTML(),
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

export default EditReviewForm; // Updated component name
