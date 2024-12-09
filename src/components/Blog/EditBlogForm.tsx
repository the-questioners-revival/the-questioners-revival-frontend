import { Box, Button, Container, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import CustomField from '../custom/CustomField';
import HtmlEditor from '../HtmlEditor/HtmlEditor';
import StarterKit from '@tiptap/starter-kit';
import { useEditor } from '@tiptap/react';
import Link from '@tiptap/extension-link';
import { useState } from 'react';
import TodosProvider from '../../providers/TodosProvider';
import { useCategoryContext } from '../Category/CategoriesContext';

const EditBlogForm = ({
  editBlog,
  blog,
}: {
  editBlog: Function;
  blog: any;
}) => {
  const { categoriesOptions } = useCategoryContext();
  const [assignTodo, setAssignTodo] = useState(false);
  const { todoOptions } = TodosProvider();

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
      initialValues={{
        text: blog.text,
        todo_id: blog.todo_id,
        category_id: blog.category_id,
      }}
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
              {assignTodo ? (
                <CustomField
                  name="todo_id"
                  type="searchableSelect"
                  options={todoOptions}
                  required={false}
                />
              ) : (
                <Text fontSize="xs" onClick={() => setAssignTodo(!assignTodo)}>
                  assign todo
                </Text>
              )}
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
            </Box>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default EditBlogForm; // Updated component name
