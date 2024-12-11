import { useEffect } from 'react';

import { TextNode } from 'lexical';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode, HeadingTagType } from '@lexical/rich-text';

export default function CustomMarkdownTransformer() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerNodeTransform(TextNode, (node: TextNode) => {
            if (!node.isSimpleText() || node.hasFormat('code')) {
                return;
            }

            const text = node.getTextContent();
            if (text.startsWith('#')) {
                const parentNode = node.getParent();
                if (parentNode === null) {
                    return;
                }

                const tag = 'h1' as HeadingTagType;
                const headingNode = $createHeadingNode(tag);

                headingNode.append(node);

                parentNode.replace(headingNode); // wrong
            }
        });
    }, [editor]);

    return null;
}
