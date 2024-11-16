import { AppSidebar } from '@/components/app-sidebar';
import { TipTapEditor } from '@/components/editor/tiptap-editor';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { DotsVerticalIcon } from '@radix-ui/react-icons';

export default function Home() {
    return (
        <AppSidebar>
            <main className="flex flex-col items-center h-full w-full">
                <div className="sticky top-0 flex justify-between items-center h-16 w-full border-b bg-background p-4">
                    <SidebarTrigger />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    Repository
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Document</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <DotsVerticalIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="h-[calc(100vh-6rem)] w-full overflow-hidden">
                    <TipTapEditor />
                </div>
                <div className="h-8 w-full" />
            </main>
        </AppSidebar>
    );
}
