import { useEffect } from 'react';

import {
    $getNodeByKey,
    $getSelection,
    $isRangeSelection,
    $isRootOrShadowRoot,
    $isTextNode,
    COMMAND_PRIORITY_LOW,
    KEY_DOWN_COMMAND
} from 'lexical';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
    $createHeadingNode,
    $isHeadingNode,
    HeadingTagType
} from '@lexical/rich-text';
import { $createMarkdownNode } from '../nodes/custom-markdown-node';

export default function CustomMarkdownParser() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerCommand(
            KEY_DOWN_COMMAND,
            (payload: string) => {
                const selection = editor.getEditorState().read($getSelection);

                if (!$isRangeSelection(selection) || !selection.isCollapsed())
                    return false;

                const anchorKey = selection.anchor.key;
                const anchorOffset = selection.anchor.offset;

                const anchorNode = $getNodeByKey(anchorKey);

                if (!$isTextNode(anchorNode)) {
                    return false;
                }

                const parentNode = anchorNode.getParent();

                if (parentNode === null) {
                    return false;
                }

                const grandParentNode = parentNode.getParent();

                if (
                    !$isRootOrShadowRoot(grandParentNode) ||
                    parentNode.getFirstChild() !== anchorNode
                ) {
                    return false;
                }

                const textContent = anchorNode.getTextContent();

                if (
                    textContent.startsWith('# ') &&
                    !$isHeadingNode(parentNode)
                ) {
                    const nextSiblings = anchorNode.getNextSiblings();
                    const [leadingNode, remainderNode] =
                        anchorNode.splitText(anchorOffset);
                    leadingNode.remove();
                    const siblings = remainderNode
                        ? [remainderNode, ...nextSiblings]
                        : nextSiblings;

                    const tag = 'h1' as HeadingTagType;
                    const node = $createHeadingNode(tag);

                    /**
                     * TODO
                     * 1. 创建一个Markdown Tag节点，这个节点要有一定的样式（因此需要了解TextNode本身是否携带颜色等样式）
                     * 2. 将TextNode插入到HeadingNode节点中
                     * 3. 处理各种操作
                     * 4. 处理输入法的问题
                     */

                    const mdtag = $createMarkdownNode('# ');

                    node.append(mdtag);
                    node.append(...siblings);

                    parentNode.replace(node);
                    node.select();
                }

                return false;
            },
            COMMAND_PRIORITY_LOW
        );
    }, [editor]);

    return null;
}
