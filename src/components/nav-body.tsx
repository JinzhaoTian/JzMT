'use client';

import { type LucideIcon } from 'lucide-react';
import * as React from 'react';

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from '@/components/ui/sidebar';

export function NavBody({
    items,
    onClick
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
    onClick: (item: { title: string; url: string }) => void;
}) {
    const [activeItem, setActiveItem] = React.useState(items[0]);
    const { setOpen } = useSidebar();

    return (
        <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                tooltip={{
                                    children: item.title,
                                    hidden: false
                                }}
                                onClick={() => {
                                    setActiveItem(item);
                                    onClick({
                                        title: item.title,
                                        url: item.url
                                    });
                                    setOpen(true);
                                }}
                                isActive={activeItem.title === item.title}
                                className="px-2.5 md:px-2"
                            >
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
