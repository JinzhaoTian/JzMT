'use client';

import { AppEditor } from '@/components/app-editor';

export default function Page() {
    return (
        <main className="flex flex-col flex-1 justify-center overflow-hidden">
            <div className="flex justify-center w-full p-4 overflow-y-auto">
                <div className="max-w-3xl">
                    <AppEditor />
                </div>
            </div>
        </main>
    );
}
