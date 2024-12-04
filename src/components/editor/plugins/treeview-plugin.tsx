import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { TreeView } from '@lexical/react/LexicalTreeView';

export default function TreeViewPlugin(): JSX.Element {
    const [editor] = useLexicalComposerContext();

    return <TreeView editor={editor} viewClassName="editor-tree-view-output" />;
}
