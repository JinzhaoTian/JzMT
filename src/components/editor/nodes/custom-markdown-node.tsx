import {
    EditorConfig,
    LexicalEditor,
    LexicalNode,
    NodeKey,
    SerializedTextNode,
    TextNode
} from 'lexical';

export default class MarkdownNode extends TextNode {
    __visible: boolean;

    constructor(text: string, key?: NodeKey) {
        super(text, key);
        this.__visible = true;
    }

    static getType() {
        return 'markdown';
    }

    static clone(node: MarkdownNode): MarkdownNode {
        return new MarkdownNode(node.__text, node.__key);
    }

    setVisible(visible: boolean) {
        this.__visible = visible;
    }

    createDOM(config: EditorConfig, editor?: LexicalEditor): HTMLElement {
        const element = super.createDOM(config, editor);
        element.className = 'editor-markdown';
        element.style.display = 'block';
        return element;
    }

    updateDOM(
        prevNode: TextNode,
        dom: HTMLElement,
        config: EditorConfig
    ): boolean {
        const updated = super.updateDOM(prevNode, dom, config);
        if (prevNode !== this) {
            dom.style.fontSize = 'inherit';
        }
        dom.style.display = this.__visible ? 'block' : 'none';
        return updated;
    }

    static importJSON(serializedNode: SerializedTextNode): TextNode {
        return super.importJSON(serializedNode);
    }

    exportJSON(): SerializedTextNode {
        return {
            ...super.exportJSON(),
            type: 'markdown'
        };
    }
}

export function $createMarkdownNode(text: string, key?: string): MarkdownNode {
    return new MarkdownNode(text, key);
}

export function $isMarkdownNode(
    node: LexicalNode | null | undefined
): node is MarkdownNode {
    return node instanceof MarkdownNode;
}
