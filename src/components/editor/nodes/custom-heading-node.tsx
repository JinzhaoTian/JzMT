import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { HeadingTagType } from '@lexical/rich-text';
import {
    $getSelection,
    $isRangeSelection,
    DOMExportOutput,
    EditorConfig,
    ElementNode,
    LexicalEditor,
    LexicalNode,
    NodeKey,
    SerializedElementNode,
    Spread,
    isHTMLElement
} from 'lexical';
import React, { useEffect, useState } from 'react';

interface HeadingDecoratorProps {
    nodeKey: string;
}

const HeadingDecorator: React.FC<HeadingDecoratorProps> = ({ nodeKey }) => {
    const [editor] = useLexicalComposerContext();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // 监听光标移动
        const removeListener = editor.registerUpdateListener(() => {
            editor.getEditorState().read(() => {
                const selection = $getSelection();
                if (!$isRangeSelection(selection)) return;

                if (selection && selection.anchor.key === nodeKey) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            });
        });

        return () => removeListener();
    }, [editor, nodeKey]);

    return isVisible ? <span className="heading-hash">#</span> : null;
};

export type SerializedCustomHeadingNode = Spread<
    {
        tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    },
    SerializedElementNode
>;

export class CustomHeadingNode extends ElementNode {
    /** @internal */
    __tag: HeadingTagType;

    constructor(tag: HeadingTagType, key?: NodeKey) {
        super(key);
        this.__tag = tag;
    }

    static getType(): string {
        return 'custom-heading';
    }

    getTag(): HeadingTagType {
        return this.__tag;
    }

    static clone(node: CustomHeadingNode): CustomHeadingNode {
        return new CustomHeadingNode(node.getTag(), node.__key);
    }

    createDOM(config: EditorConfig) {
        const tag = this.__tag;
        const element = document.createElement(tag);
        element.className = 'custom-heading';
        return element;
    }

    // 根据 # 的数量动态调整标签
    static adjustHeadingLevel(textContent: string): HeadingTagType | string {
        const match = textContent.match(/^#+/);
        if (match) {
            const hashCount = match[0].length; // 统计 # 的数量
            return `h${Math.min(hashCount, 6)}` as HeadingTagType; // 限制为 h1 ~ h6
        }
        return 'p'; // 默认转换为段落
    }

    updateDOM(prevNode: CustomHeadingNode, dom: HTMLElement): boolean {
        const textContent = dom.textContent || '';
        const newTag = CustomHeadingNode.adjustHeadingLevel(textContent);

        // 更新 DOM 标签
        if (prevNode.__tag !== newTag) {
            const newDom = document.createElement(newTag);
            while (dom.firstChild) {
                newDom.appendChild(dom.firstChild);
            }
            dom.replaceWith(newDom);
            return true;
        }

        return false;
    }

    exportDOM(editor: LexicalEditor): DOMExportOutput {
        const { element } = super.exportDOM(editor);

        if (element && isHTMLElement(element)) {
            if (this.isEmpty()) {
                element.append(document.createElement('br'));
            }

            const formatType = this.getFormatType();
            element.style.textAlign = formatType;

            const direction = this.getDirection();
            if (direction) {
                element.dir = direction;
            }
        }

        return {
            element
        };
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
            type: 'custom-heading',
            version: 1
        };
    }

    // 方式有待商榷
    // decorate(): JSX.Element {
    //     return <HeadingDecorator nodeKey={this.getKey()} />;
    // }
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
