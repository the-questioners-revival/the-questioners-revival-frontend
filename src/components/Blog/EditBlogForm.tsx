import { Box, Button, Container, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import CustomField from '../custom/CustomField';
import HtmlEditor from '../HtmlEditor/HtmlEditor';
import { useEffect, useState } from 'react';
import TodosProvider from '../../providers/TodosProvider';
import { useCategoryContext } from '../Category/CategoriesContext';
import useEditorSettings from '../HtmlEditor/settings';

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
  const editor = useEditorSettings(blog.text, true);

  useEffect(() => {
    if (editor) {
      if (blog?.text) {
        editor.commands.setContent(blog.text);
      }
    }
  }, [blog, editor]);

  return (
    <Formik
      enableReinitialize
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
              <Box background="white">
                <HtmlEditor editor={editor} />
              </Box>
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
