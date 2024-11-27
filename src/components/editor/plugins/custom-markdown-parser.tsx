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

export default function CustomMarkdownParser() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerCommand(
            KEY_DOWN_COMMAND,
            (payload: string) => {
                const selection = editor.getEditorState().read($getSelection);

                if (!$isRangeSelection(selection) || !selection.isCollapsed())
                    return false;

                console.log('selection', selection);

                const anchorKey = selection.anchor.key;
                const anchorOffset = selection.anchor.offset;

                const anchorNode = $getNodeByKey(anchorKey);

                console.log('anchorNode', anchorNode);

                if (!$isTextNode(anchorNode)) {
                    return false;
                }

                const parentNode = anchorNode.getParent();

                if (parentNode === null) {
                    return false;
                }

                console.log('parentNode', parentNode);

                const grandParentNode = parentNode.getParent();

                if (
                    !$isRootOrShadowRoot(grandParentNode) ||
                    parentNode.getFirstChild() !== anchorNode
                ) {
                    return false;
                }

                console.log('grandParentNode', grandParentNode);

                const textContent = anchorNode.getTextContent();

                console.log('textContent', textContent);

                return false;
            },
            COMMAND_PRIORITY_LOW
        );
    }, [editor]);

    return null;
}
