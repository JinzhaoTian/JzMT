'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import Document from '@tiptap/extension-document';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const text = `This is a radically reduced version of Tiptap. It has support for a document, with paragraphs and text. That’s it. It’s probably too much for real minimalists though.

The paragraph extension is not really required, but you need at least one node. Sure, that node can be something different.`;

export function AppEditor() {
    const editor = useEditor({
        extensions: [Document, StarterKit],
        content: text,
        editorProps: {
            attributes: {
                class: 'max-w-[60rem] focus:outline-none'
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
