import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Link from '@tiptap/extension-link';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import lowlight from './lowlight';
import Image from '@tiptap/extension-image';

function useEditorSettings(content: any, editable: boolean) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Image,
      CodeBlockLowlight.configure({
        lowlight,
        languageClassPrefix: 'language-',
      }),
    ],
    editorProps: {
      attributes: {
        class: 'Editor',
      },
    },
    content: content,
    editable: editable,
  });
  return editor;
}

export default useEditorSettings;
