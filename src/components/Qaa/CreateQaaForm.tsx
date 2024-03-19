import { Box, Button, Container, Flex, FormLabel, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import CustomField from '../custom/CustomField';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import HtmlEditor from '../HtmlEditor/HtmlEditor';

export const qaaTypeOptions = [
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
    name: 'Coding',
    value: 'coding',
  },
  {
    name: 'Other',
    value: 'other',
  },
];

const CreateQaaForm = ({ createQaa }: { createQaa: Function }) => {
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
    content: '<p><br><br><br></p>',
  });
  // Updated component name
  return (
    <Formik
      initialValues={{ question: '', answer: '', link: '', type: '' }}
      onSubmit={(values, actions) => {
        createQaa({ ...values, answer: editor?.getHTML() }); // Updated function name
        actions.setSubmitting(false);
        actions.resetForm();
        editor?.commands.setContent('');
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
                New Qaa {/* Updated text */}
              </Heading>
            </Box>
            <Box p="1rem 1.5rem" color="black">
              <CustomField name="question" type="input" />
              <FormLabel>Answer</FormLabel>
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

export default CreateQaaForm; // Updated component name
