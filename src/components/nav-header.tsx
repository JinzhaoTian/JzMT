'use client';

import { GalleryVerticalEnd } from 'lucide-react';
import * as React from 'react';

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar';

export function NavHeader({
    teams
}: {
    teams: {
        name: string;
        logo: React.ElementType;
        plan: string;
    }[];
}) {
    return (
        <SidebarMenu className="flex flex-row h-full items-center">
            <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                    <a href="#">
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">
                                Acme Inc
                            </span>
                            <span className="truncate text-xs">Enterprise</span>
                        </div>
                    </a>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
