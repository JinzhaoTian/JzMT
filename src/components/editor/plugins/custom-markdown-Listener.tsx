import { useEffect, useState } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isHeadingNode } from '@lexical/rich-text';
import {
    $getNodeByKey,
    $getSelection,
    $isRangeSelection,
    COMMAND_PRIORITY_LOW,
    SELECTION_CHANGE_COMMAND,
    TextNode
} from 'lexical';

export default function CustomMarkdownListener() {
    const [editor] = useLexicalComposerContext();
    const [lastLineKey, setLastLineKey] = useState<string | null>(null);

    useEffect(() => {
        // 注册命令：监听光标变化并更新Node
        const unregisterSelectionChangeCommand = editor.registerCommand(
            SELECTION_CHANGE_COMMAND,
            () => {
                editor.update(() => {
                    const selection = $getSelection();
                    if (!$isRangeSelection(selection)) return;

                    const focus = selection.focus;

                    // TODO: 当前输入行的处理

                    if (!focus || !(focus.getNode() instanceof TextNode))
                        return;

                    const focusNode = focus.getNode();
                    const parentNode = focusNode.getParent();

                    if (!parentNode) return;

                    const parentNodeKey = parentNode.getKey();

                    if (lastLineKey === parentNodeKey) return;

                    editor.update(() => $processCurrentNode(parentNodeKey));

                    editor.update(() => $processLastNode(lastLineKey));

                    setLastLineKey(parentNodeKey);
                });
                return false;
            },
            COMMAND_PRIORITY_LOW
        );

        return () => {
            unregisterSelectionChangeCommand(); // 清理注册命令
        };
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
