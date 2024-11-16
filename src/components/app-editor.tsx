'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { exampleText } from '@/contexts/example-text';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export function AppEditor() {
    const editor = useEditor({
        extensions: [StarterKit],
        content: exampleText,
        editorProps: {
            attributes: {
                class: 'max-w-[60rem] focus:outline-none font-editor'
            }
        }
    });

    return (
        <ScrollArea className="h-full w-full">
            <EditorContent
                editor={editor}
                className="flex justify-center p-16 pt-2"
            />
        </ScrollArea>
    );
}
