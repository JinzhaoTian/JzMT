'use client';

import { AppEditor } from '@/components/app-editor';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Page() {
    return (
        <main className="flex flex-col flex-1 justify-center overflow-hidden">
            <ScrollArea className="h-[80rem]">
                <div className="flex flex-col justify-center gap-2 p-4 pt-0">
                    <div className="flex justify-center w-full p-4 max-w-3xl">
                        <AppEditor />
                    </div>
                </div>
            </ScrollArea>
        </main>
    );
}
