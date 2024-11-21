import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { EditorState } from 'lexical';

export default function CustomOnChangePlugin() {
    const handleChange = (editorState: EditorState) => {
        editorState.read(() => {
            console.log('state: ', editorState);

            const node = editorState.toJSON();
            console.log('node:', node);
        });
    };

    return <OnChangePlugin onChange={handleChange} />;
}
