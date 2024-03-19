import { Box, Button, Container } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import CustomField from '../custom/CustomField';
import { qaaTypeOptions } from './CreateQaaForm';
import HtmlEditor from '../HtmlEditor/HtmlEditor';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';

const EditQaaForm = ({ editQaa, qaa }: { editQaa: Function; qaa: any }) => {
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
    content: qaa.answer,
  });
  // Updated component name
  return (
    <Formik
      initialValues={{
        question: qaa.question,
        answer: qaa.answer,
        link: qaa.link,
        type: qaa.type,
      }}
      onSubmit={(values, actions) => {
        editQaa({ ...qaa, ...values, answer: editor?.getHTML() }); // Updated function name
        actions.setSubmitting(false);
        actions.resetForm();
      }}
    >
      {(props) => (
        <Form>
          <Container p={0} maxW="100%">
            <Box color="black">
              <CustomField name="question" type="input" />
              <Box background="white">
                <HtmlEditor editor={editor} />
              </Box>
              <CustomField name="link" type="input" required={false} />
              <CustomField name="type" type="select" options={qaaTypeOptions} />

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

export default EditQaaForm; // Updated component name
