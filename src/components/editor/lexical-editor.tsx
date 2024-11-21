'use client';

import { CodeNode } from '@lexical/code';
import { LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';

import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';

import CustomEditorTheme from './themes/custom-editor-theme';

import { CustomHeadingNode } from './nodes/custom-heading-node';
import CustomMarkdownPlugin from './plugins/custom-markdown-plugin';
import CustomOnChangePlugin from './plugins/custom-onChange-plugin';
import CustomTextPlugin from './plugins/custom-text-plugin';

const initialConfig = {
    namespace: 'JzRM',
    theme: CustomEditorTheme,
    onError: (error: Error) => {
        console.error('Error:', error);
    },
    nodes: [
        CustomHeadingNode,
        {
            replace: HeadingNode,
            with: (node: HeadingNode) => {
                return new CustomHeadingNode(node.getTag());
            },
            withKlass: CustomHeadingNode
        },
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
            <CustomMarkdownPlugin />
            <CustomOnChangePlugin />
            <TabIndentationPlugin />
            <AutoFocusPlugin />
            <HistoryPlugin />
        </LexicalComposer>
    );
}
