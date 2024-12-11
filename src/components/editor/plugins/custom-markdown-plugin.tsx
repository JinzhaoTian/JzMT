import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';

import { TRANSFORMERS } from '@lexical/markdown';

export default function CustomMarkdownPlugin(): JSX.Element {
    return <MarkdownShortcutPlugin transformers={TRANSFORMERS} />;
}
