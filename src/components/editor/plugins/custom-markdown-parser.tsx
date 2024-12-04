import { useEffect } from 'react';

import {
    $getSelection,
    $isRangeSelection,
    $isRootOrShadowRoot,
    $isTextNode,
    ElementNode,
    TextNode
} from 'lexical';

import {
    ElementTransformer,
    MultilineElementTransformer,
    TextFormatTransformer,
    TextMatchTransformer
} from '@lexical/markdown';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { $isHeadingNode } from '@lexical/rich-text';
import {
    $createMarkdownNode,
    $isMarkdownNode
} from '../nodes/custom-markdown-node';
import { CUSTOM_TRANSFORMERS } from '../transformers';
import { indexBy, transformersByType } from '../utils';

export default function CustomMarkdownParser() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        const byType = transformersByType(CUSTOM_TRANSFORMERS);
        const textMatchTransformersByTrigger = indexBy(
            byType.textMatch,
            ({ trigger }) => trigger
        );
        const textFormatTransformersByTrigger = indexBy(
            byType.textFormat,
            ({ tag }) => tag[tag.length - 1]
        );

        return editor.registerUpdateListener(
            ({ tags, dirtyLeaves, editorState, prevEditorState }) => {
                const selection = editorState.read($getSelection);
                const prevSelection = prevEditorState.read($getSelection);

                if (
                    !$isRangeSelection(prevSelection) ||
                    !$isRangeSelection(selection) ||
                    !selection.isCollapsed() ||
                    selection.is(prevSelection)
                ) {
                    return;
                }

                const anchorKey = selection.anchor.key;
                const anchorOffset = selection.anchor.offset;

                const prevAnchorKey = prevSelection.anchor.key;
                const prevAnchorOffset = prevSelection.anchor.offset;

                const anchorNode = editorState._nodeMap.get(anchorKey);
                const prevAnchorNode = editorState._nodeMap.get(prevAnchorKey);

                if (
                    !$isTextNode(anchorNode) ||
                    !$isTextNode(prevAnchorNode) ||
                    !dirtyLeaves.has(anchorKey) ||
                    (anchorOffset !== 1 &&
                        anchorOffset > prevSelection.anchor.offset + 1)
                ) {
                    return;
                }

                const $transform = (
                    parentNode: ElementNode,
                    anchorNode: TextNode,
                    anchorOffset: number
                ) => {
                    if (
                        $runElementTransformers(
                            parentNode,
                            anchorNode,
                            anchorOffset,
                            byType.element
                        )
                    ) {
                        return;
                    }

                    if (
                        $runMultilineElementTransformers(
                            parentNode,
                            anchorNode,
                            anchorOffset,
                            byType.multilineElement
                        )
                    ) {
                        return;
                    }

                    if (
                        $runTextMatchTransformers(
                            anchorNode,
                            anchorOffset,
                            textMatchTransformersByTrigger
                        )
                    ) {
                        return;
                    }

                    if (
                        $runTextFormatTransformers(
                            anchorNode,
                            anchorOffset,
                            textFormatTransformersByTrigger
                        )
                    ) {
                        return;
                    }
                };

                const $syntaxHint = (
                    prevAnchorNode: TextNode,
                    prevParentNode: ElementNode,
                    anchorNode: TextNode,
                    parentNode: ElementNode
                ) => {
                    if ($isMarkdownNode(prevAnchorNode)) {
                        if (prevParentNode != null) {
                            const nextSiblings =
                                prevAnchorNode.getNextSiblings();

                            prevParentNode.clear();
                            prevParentNode.append(...nextSiblings);
                        }
                    }

                    if (
                        $isHeadingNode(anchorNode) &&
                        !$isMarkdownNode(anchorNode.getFirstChild())
                    ) {
                        const nextSiblings = anchorNode.getNextSiblings();

                        parentNode.clear();

                        const markdownNode = $createMarkdownNode('#');
                        parentNode.append(markdownNode);
                        parentNode.append(...nextSiblings);
                    }
                };

                editor.update(() => {
                    const parentNode = anchorNode.getParent();
                    const prevParentNode = prevAnchorNode.getParent();

                    if (parentNode === null || prevParentNode === null) {
                        return;
                    }

                    $transform(parentNode, anchorNode, selection.anchor.offset);

                    // $syntaxHint(
                    //     prevAnchorNode,
                    //     prevParentNode,
                    //     anchorNode,
                    //     parentNode
                    // );
                });
            }
        );
    }, [editor]);

    return null;
}

function $runElementTransformers(
    parentNode: ElementNode,
    anchorNode: TextNode,
    anchorOffset: number,
    elementTransformers: ReadonlyArray<ElementTransformer>
): boolean {
    const grandParentNode = parentNode.getParent();

    if (!$isRootOrShadowRoot(grandParentNode)) {
        return false;
    }

    const textContent = anchorNode.getTextContent();

    if (textContent[anchorOffset - 1] !== ' ') {
        return false;
    }

    for (const { regExp, replace } of elementTransformers) {
        const match = textContent.match(regExp);

        if (
            match &&
            match[0].length ===
                (match[0].endsWith(' ') ? anchorOffset : anchorOffset - 1)
        ) {
            const nextSiblings = anchorNode.getNextSiblings();
            const [leadingNode, remainderNode] =
                anchorNode.splitText(anchorOffset);
            leadingNode.remove();
            const siblings = remainderNode
                ? [remainderNode, ...nextSiblings]
                : nextSiblings;
            if (replace(parentNode, siblings, match, false) !== false) {
                return true;
            }
        }
    }

    return false;
}

function $runMultilineElementTransformers(
    parentNode: ElementNode,
    anchorNode: TextNode,
    anchorOffset: number,
    elementTransformers: ReadonlyArray<MultilineElementTransformer>
): boolean {
    return false;
}

function $runTextMatchTransformers(
    anchorNode: TextNode,
    anchorOffset: number,
    transformersByTrigger: Readonly<Record<string, Array<TextMatchTransformer>>>
): boolean {
    return false;
}

function $runTextFormatTransformers(
    anchorNode: TextNode,
    anchorOffset: number,
    textFormatTransformers: Readonly<
        Record<string, ReadonlyArray<TextFormatTransformer>>
    >
): boolean {
    return false;
}
