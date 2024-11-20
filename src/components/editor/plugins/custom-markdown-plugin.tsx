import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';

import { CUSTOM_TRANSFORMERS } from '../transformers';

export default function CustomMarkdownPlugin(): JSX.Element {
    return <MarkdownShortcutPlugin transformers={CUSTOM_TRANSFORMERS} />;
}
