import { ElementTransformer } from '@lexical/markdown';
import { HeadingTagType } from '@lexical/rich-text';
import {
    $createCustomHeadingNode,
    $isCustomHeadingNode,
    CustomHeadingNode
} from '../nodes/custom-heading-node';

export const CustomHeadingTransformer: ElementTransformer = {
    dependencies: [CustomHeadingNode],
    export: (node, exportChildren) => {
        if (!$isCustomHeadingNode(node)) {
            return null;
        }
        const level = Number(node.getTag().slice(1));
        return '#'.repeat(level) + ' ' + exportChildren(node);
    },
    regExp: /^(#{1,6})\s/,
    replace: (parentNode, children, match) => {
        const tag = ('h' + match[1].length) as HeadingTagType;
        const node = $createCustomHeadingNode(tag);
        node.append(...children);
        parentNode.replace(node);
        node.select(0, 0);
    },
    type: 'element'
};
