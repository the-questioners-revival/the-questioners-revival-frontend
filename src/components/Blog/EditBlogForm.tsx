import { Box, Button, Container } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import CustomField from '../custom/CustomField';
import HtmlEditor from '../HtmlEditor/HtmlEditor';
import StarterKit from '@tiptap/starter-kit';
import { useEditor } from '@tiptap/react';
import Link from '@tiptap/extension-link';

const EditBlogForm = ({
  editBlog,
  blog,
}: {
  editBlog: Function;
  blog: any;
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
    content: blog.text,
  });
  // Updated component name
  return (
    <Formik
      initialValues={{ text: blog.text }}
      onSubmit={(values, actions) => {
        editBlog({
          ...blog,
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
              <HtmlEditor editor={editor} />

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
