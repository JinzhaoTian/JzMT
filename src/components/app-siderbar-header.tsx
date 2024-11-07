'use client';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { SidebarTrigger } from './ui/sidebar';

export function AppSidebarHeader() {
    return (
        <div className="flex w-full h-full items-center justify-between">
            <SidebarTrigger />
            <Label className="flex items-center gap-2 text-sm">
                <span>Unreads</span>
                <Switch className="shadow-none" />
            </Label>
        </div>
    );
}
