import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { TreeView } from '@lexical/react/LexicalTreeView';

export default function TreeViewPlugin(): JSX.Element {
    const [editor] = useLexicalComposerContext();

    return (
        <div className="w-[420px] min-w-[420px] max-w-[420px]">
            <TreeView editor={editor} viewClassName="editor-tree-view-output" />
        </div>
    );
}
