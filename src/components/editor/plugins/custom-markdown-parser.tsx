import { useEffect } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { COMMAND_PRIORITY_LOW, KEY_DOWN_COMMAND } from 'lexical';

export default function CustomMarkdownParser() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        const unregisterCommand = editor.registerCommand(
            KEY_DOWN_COMMAND,
            () => {
                editor.update(() => {});
                return false;
            },
            COMMAND_PRIORITY_LOW
        );

        return () => {
            unregisterCommand();
        };
    }, [editor]);

    return null;
}
