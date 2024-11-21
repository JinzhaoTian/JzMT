import { HeadingNode, HeadingTagType } from '@lexical/rich-text';
import {
    EditorConfig,
    LexicalNode,
    SerializedElementNode,
    Spread
} from 'lexical';

export type SerializedCustomHeadingNode = Spread<
    {
        tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    },
    SerializedElementNode
>;

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
        serializedNode: SerializedCustomHeadingNode
    ): CustomHeadingNode {
        const node = new CustomHeadingNode(serializedNode.tag);
        return node;
    }

    exportJSON(): SerializedCustomHeadingNode {
        return {
            ...super.exportJSON(),
            tag: this.getTag(),
            type: 'customHeading',
            version: 1
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
