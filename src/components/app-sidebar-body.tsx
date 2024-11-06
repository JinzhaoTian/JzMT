'use client';

import { type LucideIcon } from 'lucide-react';

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu
} from '@/components/ui/sidebar';

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
        <SidebarMenu>
            <SidebarGroup>
                {items.map((item) => (
                    <SidebarGroupContent key={item.title}>
                        <div>{item.title}</div>
                    </SidebarGroupContent>
                ))}
            </SidebarGroup>
        </SidebarMenu>
    );
}
