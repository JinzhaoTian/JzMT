'use client';

import {
    ArchiveX,
    AudioWaveform,
    Command,
    File,
    GalleryVerticalEnd,
    Inbox,
    Send,
    Trash2
} from 'lucide-react';
import * as React from 'react';

import { AppSidebarBody } from '@/components/app-sidebar-body';
import { AppSidebarHeader } from '@/components/app-siderbar-header';
import { NavBody } from '@/components/nav-body';
import { NavHeader } from '@/components/nav-header';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarInset,
    SidebarProvider
} from '@/components/ui/sidebar';

// This is sample data
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
            title: 'Inbox',
            url: '#',
            icon: Inbox,
            isActive: true
        },
        {
            title: 'Drafts',
            url: '#',
            icon: File,
            isActive: false
        },
        {
            title: 'Sent',
            url: '#',
            icon: Send,
            isActive: false
        },
        {
            title: 'Junk',
            url: '#',
            icon: ArchiveX,
            isActive: false
        },
        {
            title: 'Trash',
            url: '#',
            icon: Trash2,
            isActive: false
        }
    ],
    mails: [
        {
            name: 'William Smith',
            email: 'williamsmith@example.com',
            subject: 'Meeting Tomorrow',
            date: '09:34 AM',
            teaser: 'Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.'
        },
        {
            name: 'Alice Smith',
            email: 'alicesmith@example.com',
            subject: 'Re: Project Update',
            date: 'Yesterday',
            teaser: "Thanks for the update. The progress looks great so far.\nLet's schedule a call to discuss the next steps."
        },
        {
            name: 'Bob Johnson',
            email: 'bobjohnson@example.com',
            subject: 'Weekend Plans',
            date: '2 days ago',
            teaser: "Hey everyone! I'm thinking of organizing a team outing this weekend.\nWould you be interested in a hiking trip or a beach day?"
        },
        {
            name: 'Emily Davis',
            email: 'emilydavis@example.com',
            subject: 'Re: Question about Budget',
            date: '2 days ago',
            teaser: "I've reviewed the budget numbers you sent over.\nCan we set up a quick call to discuss some potential adjustments?"
        },
        {
            name: 'Michael Wilson',
            email: 'michaelwilson@example.com',
            subject: 'Important Announcement',
            date: '1 week ago',
            teaser: "Please join us for an all-hands meeting this Friday at 3 PM.\nWe have some exciting news to share about the company's future."
        },
        {
            name: 'Sarah Brown',
            email: 'sarahbrown@example.com',
            subject: 'Re: Feedback on Proposal',
            date: '1 week ago',
            teaser: "Thank you for sending over the proposal. I've reviewed it and have some thoughts.\nCould we schedule a meeting to discuss my feedback in detail?"
        },
        {
            name: 'David Lee',
            email: 'davidlee@example.com',
            subject: 'New Project Idea',
            date: '1 week ago',
            teaser: "I've been brainstorming and came up with an interesting project concept.\nDo you have time this week to discuss its potential impact and feasibility?"
        },
        {
            name: 'Olivia Wilson',
            email: 'oliviawilson@example.com',
            subject: 'Vacation Plans',
            date: '1 week ago',
            teaser: "Just a heads up that I'll be taking a two-week vacation next month.\nI'll make sure all my projects are up to date before I leave."
        },
        {
            name: 'James Martin',
            email: 'jamesmartin@example.com',
            subject: 'Re: Conference Registration',
            date: '1 week ago',
            teaser: "I've completed the registration for the upcoming tech conference.\nLet me know if you need any additional information from my end."
        },
        {
            name: 'Sophia White',
            email: 'sophiawhite@example.com',
            subject: 'Team Dinner',
            date: '1 week ago',
            teaser: "To celebrate our recent project success, I'd like to organize a team dinner.\nAre you available next Friday evening? Please let me know your preferences."
        }
    ]
};

export function AppSidebar({ children }: { children: React.ReactNode }) {
    // Note: I'm using state to show active item.
    // IRL you should use the url/router.
    const [mails, setMails] = React.useState(data.mails);

    const onNavMainClick = () => {
        const mail = data.mails.sort(() => Math.random() - 0.5);
        setMails(
            mail.slice(0, Math.max(5, Math.floor(Math.random() * 10) + 1))
        );
    };

    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width': '24rem',
                    '--sidebar-width-mobile': '24rem'
                } as React.CSSProperties
            }
        >
            <Sidebar
                collapsible="icon"
                className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
            >
                {/* This is the first sidebar */}
                {/* We disable collapsible and adjust width to icon. */}
                {/* This will make the sidebar appear as icons. */}
                <Sidebar
                    collapsible="none"
                    className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
                >
                    <SidebarHeader className="h-16">
                        <NavHeader teams={data.teams} />
                    </SidebarHeader>
                    <SidebarContent>
                        <NavBody
                            items={data.navMain}
                            onClick={onNavMainClick}
                        />
                    </SidebarContent>
                    <SidebarFooter>
                        <NavUser user={data.user} />
                    </SidebarFooter>
                </Sidebar>

                {/* This is the second sidebar */}
                {/* We disable collapsible and let it fill remaining space */}
                <Sidebar collapsible="none" className="hidden flex-1 md:flex">
                    <SidebarHeader className="h-16 gap-3.5 border-b p-4">
                        <AppSidebarHeader />
                    </SidebarHeader>
                    <SidebarContent>
                        <AppSidebarBody items={mails} />
                    </SidebarContent>
                </Sidebar>
            </Sidebar>
            <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
    );
}
