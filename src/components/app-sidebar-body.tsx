'use client';

import { SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar';

export function AppSidebarBody({
    items
}: {
    items: {
        name: string;
        email: string;
        subject: string;
        date: string;
        teaser: string;
    }[];
}) {
    return (
        <SidebarGroup className="px-0">
            <SidebarGroupContent>
                {items.map((item) => (
                    <a
                        href="#"
                        key={item.email}
                        className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                        <div className="flex w-full items-center gap-2">
                            <span>{item.name}</span>{' '}
                            <span className="ml-auto text-xs">{item.date}</span>
                        </div>
                        <span className="font-medium">{item.subject}</span>
                        <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
                            {item.teaser}
                        </span>
                    </a>
                ))}
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
