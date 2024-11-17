'use client';

import React from 'react';

import { CodeNode } from '@lexical/code';
import { LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { $convertToMarkdownString, TRANSFORMERS } from '@lexical/markdown';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { EditorState } from 'lexical';

import CustomTextPlugin from './plugins/custom-text-plugin';
import CustomTextTheme from './themes/custom-text-theme';

const LexicalEditor: React.FC = () => {
    const initialConfig = {
        namespace: 'JzRM',
        theme: CustomTextTheme,
        onError: (error: Error) => {
            console.error('Error:', error);
        },
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

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <CustomTextPlugin />
            <HistoryPlugin />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            <OnChangePlugin onChange={handleChange} />
        </LexicalComposer>
    );
};

export default LexicalEditor;
