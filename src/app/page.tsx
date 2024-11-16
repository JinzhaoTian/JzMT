import LexicalEditor from '@/components/editor/lexical-editor';

export default function Home() {
    return (
        <main className="flex flex-col items-center h-full w-full">
            <div className="sticky top-0 flex justify-between items-center h-16 w-full border border-green-200 bg-gray-200 p-4" />
            <div className="h-[calc(100vh-6rem)] w-full overflow-hidden border border-red-200">
                <LexicalEditor />
            </div>
            <div className="h-8 w-full border border-green-200 bg-gray-100" />
        </main>
    );
}
