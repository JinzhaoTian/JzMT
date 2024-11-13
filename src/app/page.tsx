import { AppEditor } from '@/components/app-editor';

export default function Home() {
    return (
        <main className="flex flex-col justify-center items-center h-full w-full">
            <div className="h-16 w-full bg-gray-300 border border-red-300" />
            <div className="h-[calc(100vh-6rem)] w-full overflow-hidden">
                <AppEditor />
            </div>
            <div className="h-8 w-full bg-gray-300 border border-red-300" />
        </main>
    );
}
