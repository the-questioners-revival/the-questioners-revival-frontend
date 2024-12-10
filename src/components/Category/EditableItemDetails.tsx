import React from 'react';
import { Todo, Qaa, Blog } from '../../types';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import EditQaaForm from '../Qaa/EditQaaForm';
import EditBlogForm from '../Blog/EditBlogForm';
import EditTodoForm from '../Todo/EditTodoForm';

interface EditableItemDetailsProps {
  selectedItem: any;
  editedItem: any;
  setEditedItem: (item: any) => void;
  saveChanges: (type: string, updatedValues?: any) => void;
  handleCancelClick: () => void;
}

const EditableItemDetails: React.FC<EditableItemDetailsProps> = ({
  selectedItem,
  editedItem,
  setEditedItem,
  saveChanges,
  handleCancelClick,
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

  if ('title' in selectedItem) return renderTodo(selectedItem as Todo);
  if ('question' in selectedItem) return renderQaa(selectedItem as Qaa);
  if ('text' in selectedItem) return renderBlog(selectedItem as Blog);

  return null;
};

export default EditableItemDetails;
