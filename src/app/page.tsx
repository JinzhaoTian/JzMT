import { ContributionsGraph } from '@/components/contribution-graph';

export default function Home() {
    return (
        <main className="flex flex-col min-h-screen justify-center items-center">
            <ContributionsGraph />
        </main>
    );
}
