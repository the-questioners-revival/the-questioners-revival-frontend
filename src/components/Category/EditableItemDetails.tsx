import React, { useEffect, useState } from 'react';
import { Input, Text, Button, Box, Textarea } from '@chakra-ui/react';
import { Todo, Qaa, Blog } from '../../types';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import HtmlEditor from '../HtmlEditor/HtmlEditor';

interface EditableItemDetailsProps {
  selectedItem: any;
  editedItem: any;
  setEditedItem: (item: any) => void;
  saveChanges: () => void;
  handleCancelClick: () => void;
}

const EditableItemDetails: React.FC<EditableItemDetailsProps> = ({
  selectedItem,
  editedItem,
  setEditedItem,
  saveChanges,
  handleCancelClick,
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
    content: '',
  });

  useEffect(() => {
    if (editor) {
      if (editedItem?.answer) {
        editor.commands.setContent(editedItem.answer);
      }
      if (editedItem?.text) {
        editor.commands.setContent(editedItem.text);
      }
    }
  }, [editedItem, editor]);
  console.log('selectedItem: ', selectedItem);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
  ) => {
    if (editedItem) {
      setEditedItem({ ...editedItem, [field]: e.target.value });
    }
  };

  if (!selectedItem) return null;

  const renderTodo = (todo: Todo) => (
    <Box backgroundColor='white' color='black' borderRadius="5px" padding="15px">
      <Text>
        <strong>Title:</strong>
      </Text>
      <Input
        value={editedItem?.title}
        onChange={(e) => handleChange(e, 'title')}
      />
      <Text>
        <strong>Priority:</strong>
      </Text>
      <Input
        value={editedItem?.priority}
        onChange={(e) => handleChange(e, 'priority')}
      />
      <Text>
        <strong>Status:</strong>
      </Text>
      <Input
        value={editedItem?.status}
        onChange={(e) => handleChange(e, 'status')}
      />
      <Button onClick={saveChanges}>Save</Button>
      <Button onClick={handleCancelClick} ml={2}>
        Cancel
      </Button>
    </Box>
  );

  const renderQaa = (qaa: Qaa) => (
    <Box backgroundColor='white' color='black' borderRadius="5px" padding="15px">
      <Text>
        <strong>Question:</strong>
      </Text>
      <Input
        value={editedItem?.question}
        onChange={(e) => handleChange(e, 'question')}
      />
      <Text>
        <strong>Answer:</strong>
      </Text>
      <HtmlEditor editor={editor} />
      <Button onClick={saveChanges}>Save</Button>
      <Button onClick={handleCancelClick} ml={2}>
        Cancel
      </Button>
    </Box>
  );

  const renderBlog = (blog: Blog) => (
    <Box backgroundColor='white' color='black' borderRadius="5px" padding="15px">
      <Text>
        <strong>Text:</strong>
      </Text>
      <HtmlEditor editor={editor} />

      <Button onClick={saveChanges}>Save</Button>
      <Button onClick={handleCancelClick} ml={2}>
        Cancel
      </Button>
    </Box>
  );

  if ('title' in selectedItem) return renderTodo(selectedItem as Todo);
  if ('question' in selectedItem) return renderQaa(selectedItem as Qaa);
  if ('text' in selectedItem) return renderBlog(selectedItem as Blog);

  return null;
};

export default EditableItemDetails;
