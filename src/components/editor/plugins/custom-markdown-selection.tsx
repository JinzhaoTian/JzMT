import { useEffect, useState } from 'react';

import {
    $getNodeByKey,
    $getSelection,
    $isRangeSelection,
    COMMAND_PRIORITY_LOW,
    SELECTION_CHANGE_COMMAND,
    TextNode
} from 'lexical';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isHeadingNode } from '@lexical/rich-text';
import { $isMarkdownNode } from '../nodes/custom-markdown-node';

export default function CustomMarkdownSelection() {
    const [editor] = useLexicalComposerContext();
    const [lastLineKey, setLastLineKey] = useState<string | null>(null);

    useEffect(() => {
        return editor.registerCommand(
            SELECTION_CHANGE_COMMAND,
            (payload: string) => {
                const selection = editor.getEditorState().read($getSelection);

                if (!$isRangeSelection(selection) || !selection.isCollapsed())
                    return false;

                const anchorKey = selection.anchor.key;
                const anchorOffset = selection.anchor.offset;

                editor.update(() => {
                    const anchorNode = $getNodeByKey(anchorKey);
                    const parentNode = anchorNode?.getParent();

                    if (!parentNode) return;

                    const parentNodeKey = parentNode.getKey();

                    if (lastLineKey === parentNodeKey) return;

                    if ($isHeadingNode(parentNode)) {
                        const markdownNode = parentNode.getFirstChild();

                        if ($isMarkdownNode(markdownNode)) {
                            // TODO show
                        }
                    }

                    const lastNode = $getNodeByKey(lastLineKey!);
                    if ($isHeadingNode(lastNode)) {
                        const markdownNode = lastNode.getFirstChild();

                        if ($isMarkdownNode(markdownNode)) {
                            // TODO hide
                        }
                    }

                    setLastLineKey(parentNodeKey);
                });

                return false;
            },
            COMMAND_PRIORITY_LOW
        );
    }, [editor, lastLineKey]);

    return null;
}

const $processLastNode = (lastNodeKey: string | null) => {
    if (!lastNodeKey) return;

    const lastLineNode = $getNodeByKey(lastNodeKey);
    if (lastLineNode && $isHeadingNode(lastLineNode)) {
        const textNode = lastLineNode.getFirstChild();
        if (textNode instanceof TextNode) {
            const newText = textNode.getTextContent().replace(/^#\s*/, '');
            textNode.setTextContent(newText);
        }
    }
};

const $processCurrentNode = (currentNodeKey: string | null) => {
    if (!currentNodeKey) return;

    const currentLineNode = $getNodeByKey(currentNodeKey);
    if (currentLineNode && $isHeadingNode(currentLineNode)) {
        const textNode = currentLineNode.getFirstChild();
        if (textNode instanceof TextNode) {
            const newText = '# ' + textNode.getTextContent();
            textNode.setTextContent(newText);
            textNode.select();
        }
    }
};
