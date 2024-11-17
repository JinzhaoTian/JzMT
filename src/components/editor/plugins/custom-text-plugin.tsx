import { ScrollArea } from '@/components/ui/scroll-area';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

export default function CustomTextPlugin() {
    const [editor] = useLexicalComposerContext();

    return (
        <ScrollArea
            className="h-full w-full"
            onClick={(e) => {
                e.stopPropagation(); // 阻止事件冒泡
                editor.focus();
            }}
        >
            <div className="flex justify-center p-20 pt-2">
                <div className="relative w-[60rem]">
                    <RichTextPlugin
                        contentEditable={
                            <ContentEditable className="max-w-[60rem] outline-none font-editor" />
                        }
                        placeholder={
                            <div className="absolute top-0 left-0 font-editor pointer-events-none text-gray-400">
                                Start typing...
                            </div>
                        }
                        ErrorBoundary={({ children }) => <>{children}</>}
                    />
                </div>
            </div>
        </ScrollArea>
    );
}
