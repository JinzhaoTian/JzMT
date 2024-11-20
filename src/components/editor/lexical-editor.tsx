'use client';

import React from 'react';

import { EditorState } from 'lexical';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';

import CustomTextPlugin from './plugins/custom-text-plugin';
import CustomTextTheme from './themes/custom-text-theme';

const LexicalEditor: React.FC = () => {
    const initialConfig = {
        namespace: 'JzRM',
        theme: CustomTextTheme,
        onError: (error: Error) => {
            console.error('Error:', error);
        },
        nodes: []
    };

    const handleChange = (editorState: EditorState) => {
        editorState.read(() => {
            console.log('state: ', editorState);

            const node = editorState.toJSON();
            console.log('node:', node);
        });
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <CustomTextPlugin />
            <TabIndentationPlugin />
            <AutoFocusPlugin />
            <HistoryPlugin />
            <OnChangePlugin onChange={handleChange} />
        </LexicalComposer>
    );
};

export default LexicalEditor;
