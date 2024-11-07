'use client';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export function AppSidebarHeader() {
    return (
        <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">
                {/* {activeItem.title} */}
                Inbox
            </div>
            <Label className="flex items-center gap-2 text-sm">
                <span>Unreads</span>
                <Switch className="shadow-none" />
            </Label>
        </div>
    );
}
