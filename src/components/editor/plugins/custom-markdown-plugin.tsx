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

export default function CustomMarkdownPlugin() {
    const [editor] = useLexicalComposerContext();
    const [lastLineKey, setLastLineKey] = useState<string | null>(null);

    // useEffect(() => {
    //     const unregisterCommand = editor.registerCommand(
    //         KEY_DOWN_COMMAND,
    //         (event) => {
    //             if (event.key === ' ') {
    //                 editor.update(() => {
    //                     const selection = $getSelection();
    //                     if (!$isRangeSelection(selection)) return false;

    //                     const anchorNode = selection.anchor.getNode();

    //                     // 检查是否输入了 "#" 并转换为标题
    //                     if (
    //                         anchorNode instanceof TextNode &&
    //                         anchorNode.getTextContent() === '#'
    //                     ) {
    //                         event.preventDefault();

    //                         // 创建 H1 标题节点
    //                         const headingNode = $createHeadingNode('h1');
    //                         const textNode = $createTextNode(''); // 创建一个空的文本节点

    //                         // 将 `#` 插入文本节点，并添加到标题节点中
    //                         textNode.setTextContent('# ');
    //                         headingNode.append(textNode);

    //                         // 用标题节点替换原有的文本节点
    //                         anchorNode.replace(headingNode);

    //                         // 将光标移动到新文本节点的末尾
    //                         textNode.select();
    //                     }
    //                 });
    //             }
    //             return false;
    //         },
    //         COMMAND_PRIORITY_LOW
    //     );

    //     return () => {
    //         unregisterCommand(); // 清理注册命令
    //     };
    // }, [editor]);

    useEffect(() => {
        // 注册命令：监听光标变化并更新标题
        const unregisterSelectionChangeCommand = editor.registerCommand(
            SELECTION_CHANGE_COMMAND,
            () => {
                editor.update(() => {
                    const selection = $getSelection();
                    if (!$isRangeSelection(selection)) return false;

                    const focus = selection.focus;

                    if (focus && focus.getNode() instanceof TextNode) {
                        const focusNode = focus.getNode();
                        const parentNode = focusNode.getParent(); // 获取焦点节点的父节点，即所在的行

                        if (parentNode) {
                            const parentNodeKey = parentNode.getKey();

                            // 如果光标在同一行，则不进行操作
                            if (lastLineKey === parentNodeKey) {
                                return;
                            }

                            // 如果前一行是标题，去除#
                            if (lastLineKey) {
                                editor.update(() => {
                                    const lastLineNode =
                                        $getNodeByKey(lastLineKey);
                                    if (
                                        lastLineNode &&
                                        $isHeadingNode(lastLineNode)
                                    ) {
                                        const textNode =
                                            parentNode.getFirstChild();
                                        if (textNode instanceof TextNode) {
                                            // 创建一个新的 HeadingNode，去除#符号
                                            const newText = textNode
                                                .getTextContent()
                                                .replace(/^#\s*/, '');
                                            textNode.setTextContent(newText);
                                        }
                                    }
                                });
                            }

                            // 如果当前行是标题，添加#
                            if ($isHeadingNode(parentNode)) {
                                editor.update(() => {
                                    const textNode = parentNode.getFirstChild();
                                    if (textNode instanceof TextNode) {
                                        textNode.setTextContent(
                                            `# ${textNode.getTextContent()}`
                                        );
                                    }
                                });
                            }

                            // 如果光标跨行，触发相关操作
                            setLastLineKey(parentNodeKey);
                            console.log(
                                'Cursor moved to a new line',
                                parentNodeKey
                            );

                            // 在这里添加你希望在光标跨行时触发的操作
                        }
                    }
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
