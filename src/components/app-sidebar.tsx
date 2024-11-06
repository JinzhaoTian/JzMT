'use client';

import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal
} from 'lucide-react';
import * as React from 'react';

import { AppSidebarBody } from '@/components/app-sidebar-body';
import { AppSidebarHeader } from '@/components/app-siderbar-header';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarInset,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger
} from '@/components/ui/sidebar';

// This is sample data.
const data = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg'
    },
    teams: [
        {
            name: 'Acme Inc',
            logo: GalleryVerticalEnd,
            plan: 'Enterprise'
        },
        {
            name: 'Acme Corp.',
            logo: AudioWaveform,
            plan: 'Startup'
        },
        {
            name: 'Evil Corp.',
            logo: Command,
            plan: 'Free'
        }
    ],
    navMain: [
        {
            title: 'Playground',
            url: '#',
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: 'History',
                    url: '#'
                },
                {
                    title: 'Starred',
                    url: '#'
                },
                {
                    title: 'Settings',
                    url: '#'
                }
            ]
        },
        {
            title: 'Models',
            url: '#',
            icon: Bot,
            items: [
                {
                    title: 'Genesis',
                    url: '#'
                },
                {
                    title: 'Explorer',
                    url: '#'
                },
                {
                    title: 'Quantum',
                    url: '#'
                }
            ]
        },
        {
            title: 'Documentation',
            url: '#',
            icon: BookOpen,
            items: [
                {
                    title: 'Introduction',
                    url: '#'
                },
                {
                    title: 'Get Started',
                    url: '#'
                },
                {
                    title: 'Tutorials',
                    url: '#'
                },
                {
                    title: 'Changelog',
                    url: '#'
                }
            ]
        },
        {
            title: 'Settings',
            url: '#',
            icon: Settings2,
            items: [
                {
                    title: 'General',
                    url: '#'
                },
                {
                    title: 'Team',
                    url: '#'
                },
                {
                    title: 'Billing',
                    url: '#'
                },
                {
                    title: 'Limits',
                    url: '#'
                }
            ]
        }
    ],
    projects: [
        {
            name: 'Design Engineering',
            url: '#',
            icon: Frame
        },
        {
            name: 'Sales & Marketing',
            url: '#',
            icon: PieChart
        },
        {
            name: 'Travel',
            url: '#',
            icon: Map
        }
    ]
};

export function AppSidebar({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = React.useState(false);

    // Only render after first client-side mount
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null; // or a loading skeleton
    }

    return (
        <SidebarProvider>
            <Sidebar
                collapsible="icon"
                className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
            >
                <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground !w-[calc(var(--sidebar-width-icon)_+_1px)] border-r">
                    <SidebarHeader>
                        <TeamSwitcher teams={data.teams} />
                    </SidebarHeader>
                    <SidebarContent>
                        <NavMain items={data.navMain} />
                    </SidebarContent>
                    <SidebarFooter>
                        <NavUser user={data.user} />
                    </SidebarFooter>
                    <SidebarRail />
                </div>
                <div className="h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground hidden flex-1 md:flex">
                    <SidebarHeader>
                        <AppSidebarHeader teams={data.teams} />
                    </SidebarHeader>
                    <SidebarContent>
                        <AppSidebarBody items={data.navMain} />
                    </SidebarContent>
                </div>
            </Sidebar>
            <SidebarInset>
                <header className="flex h-12 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Building Your Application
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        Data Fetching
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="flex items-center gap-2 px-4">
                        <ThemeToggle />
                    </div>
                </header>
                <Separator orientation="horizontal" className="mb-2" />
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}
