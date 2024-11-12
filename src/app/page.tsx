import { AppEditor } from '@/components/app-editor';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Home() {
    return (
        <main className="flex flex-col min-h-screen justify-center items-center">
            <div className="flex flex-col flex-1 justify-center overflow-hidden border">
                <ScrollArea className="h-[80rem] bg-gray-50">
                    <div className="flex flex-col justify-center gap-2 p-4 pt-0">
                        <div className="flex justify-center w-full p-4 max-w-3xl">
                            <AppEditor />
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </main>
    );
}
