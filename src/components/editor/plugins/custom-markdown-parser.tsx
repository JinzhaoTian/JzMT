import { useEffect } from 'react';

import {
    $getNodeByKey,
    $getSelection,
    $isRangeSelection,
    $isRootOrShadowRoot,
    $isTextNode
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
        return editor.registerUpdateListener(
            ({ tags, dirtyLeaves, editorState, prevEditorState }) => {
                const selection = editorState.read($getSelection);
                const prevSelection = prevEditorState.read($getSelection);

                if (!$isRangeSelection(selection) || !selection.isCollapsed())
                    return;

                const anchorKey = selection.anchor.key;
                const anchorOffset = selection.anchor.offset;

                editor.update(() => {
                    const anchorNode = $getNodeByKey(anchorKey);

                    if (!$isTextNode(anchorNode)) {
                        return;
                    }

                    const parentNode = anchorNode.getParent();

                    if (parentNode === null) {
                        return;
                    }

                    const grandParentNode = parentNode.getParent();

                    if (
                        !$isRootOrShadowRoot(grandParentNode) ||
                        parentNode.getFirstChild() !== anchorNode
                    ) {
                        return;
                    }

                    const textContent = anchorNode.getTextContent();

                    if (
                        textContent.startsWith('# ') &&
                        !$isHeadingNode(parentNode)
                    ) {
                        const nextSiblings = anchorNode.getNextSiblings();
                        const newText = anchorNode
                            .getTextContent()
                            .replace(/^#\s*/, ' ');
                        anchorNode.setTextContent(newText);

                        const siblings = [anchorNode, ...nextSiblings];

                        const tag = 'h1' as HeadingTagType;
                        const node = $createHeadingNode(tag);

                        /**
                         * TODO
                         * 1. 创建一个Markdown Tag节点，这个节点要有一定的样式（因此需要了解TextNode本身是否携带颜色等样式）
                         * 2. 将TextNode插入到HeadingNode节点中
                         * 3. 处理各种操作
                         * 4. 处理输入法的问题
                         */

                        const mdtag = $createMarkdownNode('#');

                        node.append(mdtag);
                        node.append(...siblings);

                        parentNode.replace(node);
                        node.select(); // TODO: 光标调整
                    }
                });
            }
        );
    }, [editor]);

    return null;
}
