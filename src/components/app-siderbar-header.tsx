'use client';

import * as React from 'react';

import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarTrigger
} from '@/components/ui/sidebar';

export function AppSidebarHeader({
    teams
}: {
    teams: {
        name: string;
        logo: React.ElementType;
        plan: string;
    }[];
}) {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <div className="flex size-8 items-center justify-center rounded-lg ">
                    <SidebarTrigger />
                </div>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
