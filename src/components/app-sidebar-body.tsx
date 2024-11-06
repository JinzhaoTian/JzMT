'use client';

import { type LucideIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';

export function AppSidebarBody({
    items
}: {
    items: {
        title: string;
        url: string;
        icon?: LucideIcon;
        isActive?: boolean;
        items?: {
            title: string;
            url: string;
        }[];
    }[];
}) {
    return (
        <div className="flex h-full justify-start size-12">
            <SidebarMenu className="w-[--sidebar-width]">
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <div className="flex size-8 items-center justify-center rounded-lg p-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                            >
                                {item.icon && <item.icon />}
                            </Button>
                        </div>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
            <Separator orientation="vertical" className="h-full" />
            <SidebarMenu></SidebarMenu>
        </div>
    );
}
