import { Box, Button, Container } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import CustomField from '../custom/CustomField';
import HtmlEditor from '../HtmlEditor/HtmlEditor';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { useEditor } from '@tiptap/react';
import { useCategoryContext } from '../Category/CategoriesContext';

const CreateBlogForm = ({
  createBlog,
  date,
}: {
  createBlog: Function;
  date: any;
}) => {
  const { categoriesOptions } = useCategoryContext();

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
    content: `
    <h3>Morning Gratitude</h3>
    <p></p>

    <h3>What I did during the day</h3>
    <p></p>
    <h3>I feel...</h3>
    <p></p>
    <h3>I ate...</h3>
    <p></p>
    <h3>Goals for tomorrow</h3>
    <p></p>
    `,
  });

  // Updated component name
  return (
    <Formik
      initialValues={{
        text: 'Morning Gratitude\n\n\nHow I feel today\n\n\nWhat I did during the day\n\n\nGoals for tomorrow\n',
        category_id: null,
      }}
      onSubmit={(values, actions) => {
        createBlog({ text: editor?.getHTML(), category_id: values.category_id, given_at: date }); // Updated function name
        actions.setSubmitting(false);
        actions.resetForm();
      }}
    >
      {(props) => (
        <Form>
          <Container p={0} maxW="100%">
            <Box color="black">
              <HtmlEditor editor={editor} />
            </Box>
            <CustomField
              required={false}
              name="category_id"
              type="select"
              options={categoriesOptions}
            />

            <Button
              mt={4}
              display="flex"
              colorScheme="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default CreateBlogForm; // Updated component name
