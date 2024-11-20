import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
    HeadingNode,
    HeadingTagType,
    SerializedHeadingNode
} from '@lexical/rich-text';
import {
    $getSelection,
    $isRangeSelection,
    EditorConfig,
    LexicalNode
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

interface SerializedCustomHeadingNode extends SerializedHeadingNode {
    type: 'custom-heading'; // Ensure a unique type for your custom node
}

export class CustomHeadingNode extends HeadingNode {
    static getType() {
        return 'custom-heading';
    }

    static clone(node: CustomHeadingNode): CustomHeadingNode {
        return new CustomHeadingNode(node.getTag(), node.__key);
    }

    createDOM(config: EditorConfig) {
        const dom = super.createDOM(config);
        dom.classList.add('custom-heading');
        return dom;
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

    static importJSON(
        serializedNode: SerializedCustomHeadingNode
    ): CustomHeadingNode {
        const node = new CustomHeadingNode(serializedNode.tag);
        return node;
    }

    exportJSON(): SerializedCustomHeadingNode {
        return {
            ...super.exportJSON(),
            type: 'custom-heading'
        };
    }

    decorate(): JSX.Element {
        return <HeadingDecorator nodeKey={this.getKey()} />;
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
