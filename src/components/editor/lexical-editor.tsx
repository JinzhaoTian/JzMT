'use client';

import React from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';

import { CodeNode } from '@lexical/code';
import { LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { $convertToMarkdownString, TRANSFORMERS } from '@lexical/markdown';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { EditorState } from 'lexical';

const LexicalEditor: React.FC = () => {
    const initialConfig = {
        namespace: 'MarkdownEditor',
        onError: (error: Error) => console.error('Lexical Error:', error),
        nodes: [
            HeadingNode,
            QuoteNode,
            ListItemNode,
            ListNode,
            CodeNode,
            LinkNode
        ]
    };

    const handleChange = (editorState: EditorState) => {
        editorState.read(() => {
            const node = editorState.toJSON();
            console.log('node:', node);

            const markdown = $convertToMarkdownString(TRANSFORMERS);
            console.log('Markdown Content:', markdown);
        });
    };

    // 焦点逻辑插件
    const FocusPlugin = () => {
        const [editor] = useLexicalComposerContext();

        const handleClick = () => {
            editor.focus(); // 聚焦到编辑器
        };

        return (
            <ScrollArea
                className="h-full w-full"
                onClick={(e) => {
                    e.stopPropagation(); // 阻止事件冒泡
                    handleClick();
                }}
            >
                <div className="flex justify-center border p-16 pt-2 bg-orange-100">
                    <div className="relative">
                        <RichTextPlugin
                            contentEditable={
                                <ContentEditable className="w-[60rem] outline-none font-editor border border-s-sky-700" />
                            }
                            placeholder={
                                <div className="absolute w-full text-gray-400">
                                    Start typing...
                                </div>
                            }
                            ErrorBoundary={({ children }) => <>{children}</>}
                        />
                    </div>
                </div>
            </ScrollArea>
        );
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <FocusPlugin />
            <HistoryPlugin />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            <OnChangePlugin onChange={handleChange} />
        </LexicalComposer>
    );
};

export default LexicalEditor;
