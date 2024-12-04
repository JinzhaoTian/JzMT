import { ElementTransformer, Transformer } from '@lexical/markdown';
import {
    $createHeadingNode,
    $isHeadingNode,
    HeadingNode,
    HeadingTagType
} from '@lexical/rich-text';

import { $createMarkdownNode } from '../nodes/custom-markdown-node';

const ORDERED_LIST_REGEX = /^(\s*)(\d{1,})\.\s/;
const UNORDERED_LIST_REGEX = /^(\s*)[-*+]\s/;
const CHECK_LIST_REGEX = /^(\s*)(?:-\s)?\s?(\[(\s|x)?\])\s/i;
const HEADING_REGEX = /^(#{1,6})\s/;
const QUOTE_REGEX = /^>\s/;
const CODE_START_REGEX = /^[ \t]*```(\w+)?/;
const CODE_END_REGEX = /[ \t]*```$/;
const CODE_SINGLE_LINE_REGEX =
    /^[ \t]*```[^`]+(?:(?:`{1,2}|`{4,})[^`]+)*```(?:[^`]|$)/;

export const CustomHEADING: ElementTransformer = {
    dependencies: [HeadingNode],
    export: (node, exportChildren) => {
        if (!$isHeadingNode(node)) {
            return null;
        }
        const level = Number(node.getTag().slice(1));
        return '#'.repeat(level) + ' ' + exportChildren(node);
    },
    regExp: HEADING_REGEX,
    replace: (parentNode, children, match) => {
        const tag = ('h' + match[1].length) as HeadingTagType;
        const node = $createHeadingNode(tag);

        const mdtag = $createMarkdownNode('#');

        node.append(mdtag);
        node.append(...children);
        parentNode.replace(node);
        node.selectEnd();
    },
    type: 'element'
};

export const CUSTOM_TRANSFORMERS: Array<Transformer> = [CustomHEADING];
