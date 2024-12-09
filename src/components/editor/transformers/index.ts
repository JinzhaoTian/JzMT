import {
    $createLineBreakNode,
    $createTextNode,
    $isTextNode,
    ElementNode,
    LexicalNode
} from 'lexical';

import { $createCodeNode, $isCodeNode, CodeNode } from '@lexical/code';
import { $createLinkNode, $isLinkNode, LinkNode } from '@lexical/link';
import {
    $createListItemNode,
    $createListNode,
    $isListItemNode,
    $isListNode,
    ListItemNode,
    ListNode,
    ListType
} from '@lexical/list';
import {
    ElementTransformer,
    MultilineElementTransformer,
    TextFormatTransformer,
    TextMatchTransformer,
    Transformer
} from '@lexical/markdown';
import {
    $createHorizontalRuleNode,
    $isHorizontalRuleNode,
    HorizontalRuleNode
} from '@lexical/react/LexicalHorizontalRuleNode';
import {
    $createHeadingNode,
    $createQuoteNode,
    $isHeadingNode,
    $isQuoteNode,
    HeadingNode,
    HeadingTagType,
    QuoteNode
} from '@lexical/rich-text';

const LIST_INDENT_SIZE = 4;

const getIndent = (whitespaces: string): number => {
    const tabs = whitespaces.match(/\t/g);
    const spaces = whitespaces.match(/ /g);

    let indent = 0;

    if (tabs) {
        indent += tabs.length;
    }

    if (spaces) {
        indent += Math.floor(spaces.length / LIST_INDENT_SIZE);
    }

    return indent;
};

const listReplace = (listType: ListType): ElementTransformer['replace'] => {
    return (parentNode, children, match) => {
        const previousNode = parentNode.getPreviousSibling();
        const nextNode = parentNode.getNextSibling();
        const listItem = $createListItemNode(
            listType === 'check' ? match[3] === 'x' : undefined
        );
        if ($isListNode(nextNode) && nextNode.getListType() === listType) {
            const firstChild = nextNode.getFirstChild();
            if (firstChild !== null) {
                firstChild.insertBefore(listItem);
            } else {
                // should never happen, but let's handle gracefully, just in case.
                nextNode.append(listItem);
            }
            parentNode.remove();
        } else if (
            $isListNode(previousNode) &&
            previousNode.getListType() === listType
        ) {
            previousNode.append(listItem);
            parentNode.remove();
        } else {
            const list = $createListNode(
                listType,
                listType === 'number' ? Number(match[2]) : undefined
            );
            list.append(listItem);
            parentNode.replace(list);
        }
        listItem.append(...children);
        listItem.select(0, 0);
        const indent = getIndent(match[1]);
        if (indent) {
            listItem.setIndent(indent);
        }
    };
};

const listExport = (
    listNode: ListNode,
    exportChildren: (node: ElementNode) => string,
    depth: number
): string => {
    const output = [];
    const children = listNode.getChildren();
    let index = 0;
    for (const listItemNode of children) {
        if ($isListItemNode(listItemNode)) {
            if (listItemNode.getChildrenSize() === 1) {
                const firstChild = listItemNode.getFirstChild();
                if ($isListNode(firstChild)) {
                    output.push(
                        listExport(firstChild, exportChildren, depth + 1)
                    );
                    continue;
                }
            }
            const indent = ' '.repeat(depth * LIST_INDENT_SIZE);
            const listType = listNode.getListType();
            const prefix =
                listType === 'number'
                    ? `${listNode.getStart() + index}. `
                    : listType === 'check'
                      ? `- [${listItemNode.getChecked() ? 'x' : ' '}] `
                      : '- ';
            output.push(indent + prefix + exportChildren(listItemNode));
            index++;
        }
    }

    return output.join('\n');
};

const REGEX_HEADING = /^(#{1,6})\s/;
const REGEX_QUOTE = /^>\s/;
const REGEX_LIST_ORDERED = /^(\s*)(\d{1,})\.\s/;
const REGEX_LIST_UNORDERED = /^(\s*)[-*+]\s/;
const REGEX_LIST_CHECK = /^(\s*)(?:-\s)?\s?(\[(\s|x)?\])\s/i;
const REGEX_CODE_START = /^[ \t]*```(\w+)?/;
const REGEX_CODE_END = /[ \t]*```$/;

/**
 * Element Tranformer:
 *      convert current text node to special element node.
 */

export const CustomHEADING: ElementTransformer = {
    dependencies: [HeadingNode],
    export: (node, exportChildren) => {
        if (!$isHeadingNode(node)) {
            return null;
        }
        const level = Number(node.getTag().slice(1));
        return '#'.repeat(level) + ' ' + exportChildren(node);
    },
    regExp: REGEX_HEADING,
    replace: (parentNode, children, match) => {
        const tag = ('h' + match[1].length) as HeadingTagType;
        const node = $createHeadingNode(tag);
        node.append(...children);
        parentNode.replace(node);
    },
    type: 'element'
};

export const CustomQUOTE: ElementTransformer = {
    dependencies: [QuoteNode],
    export: (node, exportChildren) => {
        if (!$isQuoteNode(node)) {
            return null;
        }

        const lines = exportChildren(node).split('\n');
        const output = [];
        for (const line of lines) {
            output.push('> ' + line);
        }
        return output.join('\n');
    },
    regExp: REGEX_QUOTE,
    replace: (parentNode, children, _match, isImport) => {
        if (isImport) {
            const previousNode = parentNode.getPreviousSibling();
            if ($isQuoteNode(previousNode)) {
                previousNode.splice(previousNode.getChildrenSize(), 0, [
                    $createLineBreakNode(),
                    ...children
                ]);
                previousNode.select(0, 0);
                parentNode.remove();
                return;
            }
        }

        const node = $createQuoteNode();
        node.append(...children);
        parentNode.replace(node);
        node.select(0, 0);
    },
    type: 'element'
};

export const CustomLIST_UNORDERED: ElementTransformer = {
    dependencies: [ListNode, ListItemNode],
    export: (node, exportChildren) => {
        return $isListNode(node) ? listExport(node, exportChildren, 0) : null;
    },
    regExp: REGEX_LIST_UNORDERED,
    replace: listReplace('bullet'),
    type: 'element'
};

export const CustomLIST_ORDERED: ElementTransformer = {
    dependencies: [ListNode, ListItemNode],
    export: (node, exportChildren) => {
        return $isListNode(node) ? listExport(node, exportChildren, 0) : null;
    },
    regExp: REGEX_LIST_ORDERED,
    replace: listReplace('number'),
    type: 'element'
};

export const CustomLIST_CHECK: ElementTransformer = {
    dependencies: [ListNode, ListItemNode],
    export: (node, exportChildren) => {
        return $isListNode(node) ? listExport(node, exportChildren, 0) : null;
    },
    regExp: REGEX_LIST_CHECK,
    replace: listReplace('check'),
    type: 'element'
};

export const CustomHR: ElementTransformer = {
    dependencies: [HorizontalRuleNode],
    export: (node: LexicalNode) => {
        return $isHorizontalRuleNode(node) ? '***' : null;
    },
    regExp: /^(---|\*\*\*|___)\s?$/,
    replace: (parentNode, _1, _2, isImport) => {
        const line = $createHorizontalRuleNode();

        // TODO: Get rid of isImport flag
        if (isImport || parentNode.getNextSibling() != null) {
            parentNode.replace(line);
        } else {
            parentNode.insertBefore(line);
        }

        line.selectNext();
    },
    type: 'element'
};

/**
 * Multiline Element Transformer:
 *      convert text node to special multiline element node.
 */

export const CustomCODE: MultilineElementTransformer = {
    dependencies: [CodeNode],
    export: (node: LexicalNode) => {
        if (!$isCodeNode(node)) {
            return null;
        }
        const textContent = node.getTextContent();
        return (
            '```' +
            (node.getLanguage() || '') +
            (textContent ? '\n' + textContent : '') +
            '\n' +
            '```'
        );
    },
    regExpEnd: {
        optional: true,
        regExp: REGEX_CODE_END
    },
    regExpStart: REGEX_CODE_START,
    replace: (
        rootNode,
        children,
        startMatch,
        endMatch,
        linesInBetween,
        isImport
    ) => {
        let codeBlockNode: CodeNode;
        let code: string;

        if (!children && linesInBetween) {
            if (linesInBetween.length === 1) {
                // Single-line code blocks
                if (endMatch) {
                    // End match on same line. Example: ```markdown hello```. markdown should not be considered the language here.
                    codeBlockNode = $createCodeNode();
                    code = startMatch[1] + linesInBetween[0];
                } else {
                    // No end match. We should assume the language is next to the backticks and that code will be typed on the next line in the future
                    codeBlockNode = $createCodeNode(startMatch[1]);
                    code = linesInBetween[0].startsWith(' ')
                        ? linesInBetween[0].slice(1)
                        : linesInBetween[0];
                }
            } else {
                // Treat multi-line code blocks as if they always have an end match
                codeBlockNode = $createCodeNode(startMatch[1]);

                if (linesInBetween[0].trim().length === 0) {
                    // Filter out all start and end lines that are length 0 until we find the first line with content
                    while (
                        linesInBetween.length > 0 &&
                        !linesInBetween[0].length
                    ) {
                        linesInBetween.shift();
                    }
                } else {
                    // The first line already has content => Remove the first space of the line if it exists
                    linesInBetween[0] = linesInBetween[0].startsWith(' ')
                        ? linesInBetween[0].slice(1)
                        : linesInBetween[0];
                }

                // Filter out all end lines that are length 0 until we find the last line with content
                while (
                    linesInBetween.length > 0 &&
                    !linesInBetween[linesInBetween.length - 1].length
                ) {
                    linesInBetween.pop();
                }

                code = linesInBetween.join('\n');
            }
            const textNode = $createTextNode(code);
            codeBlockNode.append(textNode);
            rootNode.append(codeBlockNode);
        } else if (children) {
            const node = $createCodeNode(
                startMatch ? startMatch[1] : undefined
            );
            node.append(...children);
            rootNode.replace(node);
            node.select(0, 0);
        }
    },
    type: 'multiline-element'
};

/**
 * Text Format Transformer:
 *      only add format to text node.
 */

export const CustomCODE_INLINE: TextFormatTransformer = {
    format: ['code'],
    tag: '`',
    type: 'text-format'
};

export const CustomBOLD_ITALIC_STAR: TextFormatTransformer = {
    format: ['bold', 'italic'],
    tag: '***',
    type: 'text-format'
};

export const CustomBOLD_ITALIC_UNDERSCORE: TextFormatTransformer = {
    format: ['bold', 'italic'],
    intraword: false,
    tag: '___',
    type: 'text-format'
};

export const CustomBOLD_STAR: TextFormatTransformer = {
    format: ['bold'],
    tag: '**',
    type: 'text-format'
};

export const CustomBOLD_UNDERSCORE: TextFormatTransformer = {
    format: ['bold'],
    intraword: false,
    tag: '__',
    type: 'text-format'
};

export const CustomITALIC_STAR: TextFormatTransformer = {
    format: ['italic'],
    tag: '*',
    type: 'text-format'
};

export const CustomITALIC_UNDERSCORE: TextFormatTransformer = {
    format: ['italic'],
    intraword: false,
    tag: '_',
    type: 'text-format'
};

export const CustomHIGHLIGHT: TextFormatTransformer = {
    format: ['highlight'],
    tag: '==',
    type: 'text-format'
};

export const CustomSTRIKETHROUGH: TextFormatTransformer = {
    format: ['strikethrough'],
    tag: '~~',
    type: 'text-format'
};

/**
 * Text Match Transformer:
 */

export const CustomLINK: TextMatchTransformer = {
    dependencies: [LinkNode],
    export: (node, exportChildren, exportFormat) => {
        if (!$isLinkNode(node)) {
            return null;
        }
        const title = node.getTitle();
        const linkContent = title
            ? `[${node.getTextContent()}](${node.getURL()} "${title}")`
            : `[${node.getTextContent()}](${node.getURL()})`;
        const firstChild = node.getFirstChild();
        // Add text styles only if link has single text node inside. If it's more
        // then one we ignore it as markdown does not support nested styles for links
        if (node.getChildrenSize() === 1 && $isTextNode(firstChild)) {
            return exportFormat(firstChild, linkContent);
        } else {
            return linkContent;
        }
    },
    importRegExp:
        /(?:\[([^[]+)\])(?:\((?:([^()\s]+)(?:\s"((?:[^"]*\\")*[^"]*)"\s*)?)\))/,
    regExp: /(?:\[([^[]+)\])(?:\((?:([^()\s]+)(?:\s"((?:[^"]*\\")*[^"]*)"\s*)?)\))$/,
    replace: (textNode, match) => {
        const [, linkText, linkUrl, linkTitle] = match;
        const linkNode = $createLinkNode(linkUrl, { title: linkTitle });
        const linkTextNode = $createTextNode(linkText);
        linkTextNode.setFormat(textNode.getFormat());
        linkNode.append(linkTextNode);
        textNode.replace(linkNode);
    },
    trigger: ')',
    type: 'text-match'
};

export const CUSTOM_TRANSFORMERS: Array<Transformer> = [
    CustomHEADING,
    CustomQUOTE,
    CustomLIST_ORDERED,
    CustomLIST_UNORDERED,
    CustomLIST_CHECK,
    CustomHR,
    CustomCODE,
    CustomCODE_INLINE,
    CustomBOLD_STAR,
    CustomBOLD_ITALIC_STAR,
    CustomBOLD_ITALIC_UNDERSCORE,
    CustomBOLD_UNDERSCORE,
    CustomITALIC_STAR,
    CustomITALIC_UNDERSCORE,
    CustomHIGHLIGHT,
    CustomSTRIKETHROUGH,
    CustomLINK
];
