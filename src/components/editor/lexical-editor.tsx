'use client';

import { CodeNode } from '@lexical/code';
import { LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { LexicalComposer } from '@lexical/react/LexicalComposer';

import { HeadingNode, QuoteNode } from '@lexical/rich-text';

import CustomEditorTheme from './themes/custom-editor-theme';

import MarkdownNode from './nodes/custom-markdown-node';
import CustomMarkdownParser from './plugins/custom-markdown-parser';
import CustomMarkdownSelection from './plugins/custom-markdown-selection';
import CustomTextPlugin from './plugins/custom-text-plugin';

const initialConfig = {
    namespace: 'JzMT',
    theme: CustomEditorTheme,
    onError: (error: Error) => {
        console.error('Error:', error);
    },
    nodes: [
        HeadingNode,
        MarkdownNode,
        QuoteNode,
        ListNode,
        ListItemNode,
        CodeNode,
        LinkNode
    ]
};

export default function LexicalEditor() {
    return (
        <LexicalComposer initialConfig={initialConfig}>
            <CustomTextPlugin />
            <CustomMarkdownParser />
            <CustomMarkdownSelection />
        </LexicalComposer>
    );
}
