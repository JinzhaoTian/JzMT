import { EditorConfig, LexicalNode } from 'lexical';

import {
    HeadingNode,
    HeadingTagType,
    SerializedHeadingNode
} from '@lexical/rich-text';

export class CustomHeadingNode extends HeadingNode {
    static getType(): string {
        return 'customHeading';
    }

    static clone(node: CustomHeadingNode): CustomHeadingNode {
        return new CustomHeadingNode(node.getTag(), node.__key);
    }

    createDOM(config: EditorConfig) {
        const dom = super.createDOM(config);
        return dom;
    }

    static importJSON(
        serializedNode: SerializedHeadingNode
    ): CustomHeadingNode {
        const node = new CustomHeadingNode(serializedNode.tag);
        return node;
    }

    exportJSON(): SerializedHeadingNode {
        return {
            ...super.exportJSON()
        };
    }
}

export function $createCustomHeadingNode(
    tag: HeadingTagType,
    key?: string
): CustomHeadingNode {
    return new CustomHeadingNode(tag, key);
}

export function $isCustomHeadingNode(
    node: LexicalNode | null | undefined
): node is CustomHeadingNode {
    return node instanceof CustomHeadingNode;
}
