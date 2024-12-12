import React from 'react';
import { Todo, Qaa, Blog } from '../../types';
import EditQaaForm from '../Qaa/EditQaaForm';
import EditBlogForm from '../Blog/EditBlogForm';
import EditTodoForm from '../Todo/EditTodoForm';

interface EditableItemDetailsProps {
  selectedItem: any;
  saveChanges: (type: string, updatedValues?: any) => void;
}

const EditableItemDetails: React.FC<EditableItemDetailsProps> = ({
  selectedItem,
  saveChanges,
}) => {
  if (!selectedItem) return null;

  const renderTodo = (todo: Todo) => (
    <EditTodoForm
      todo={todo}
      editTodo={(updatedTodo: any) => saveChanges('todo', updatedTodo)}
    ></EditTodoForm>
  );

  const renderQaa = (qaa: Qaa) => (
    <EditQaaForm
      qaa={qaa}
      editQaa={(updatedQaa: any) => saveChanges('qaa', updatedQaa)}
    ></EditQaaForm>
  );

  const renderBlog = (blog: Blog) => (
    <EditBlogForm
      blog={blog}
      editBlog={(updatedBlog: any) => saveChanges('blog', updatedBlog)}
    ></EditBlogForm>
  );

  if (selectedItem.table_name === 'todos')
    return renderTodo(selectedItem as Todo);
  if (selectedItem.table_name === 'qaas') return renderQaa(selectedItem as Qaa);
  if (selectedItem.table_name === 'blogs')
    return renderBlog(selectedItem as Blog);

  return null;
};

export default EditableItemDetails;
