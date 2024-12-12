import LexicalEditor from '@/components/editor/lexical-editor';

export default function Home() {
    return (
        <main className="flex flex-col items-center h-full w-full">
            <div className="bg-background sticky top-0 h-14 w-full border-b" />
            <div className="h-[calc(100vh-6rem)] w-full overflow-hidden">
                <LexicalEditor />
            </div>
            <div className="bg-background sticky bottom-0 h-10 w-full border-t" />
        </main>
    );
}
