'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export function AppEditor() {
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Hello World! 🌎️</p>',
        autofocus: true,
        editorProps: {
            attributes: {
                class: 'focus:outline-none overflow'
            }
        }
    });
    return <EditorContent editor={editor} />;
}
