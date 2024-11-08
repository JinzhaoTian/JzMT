import { ContributionGraph } from '@/components/contribution-graph';

export default function Page() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 justify-center items-center">
            <ContributionGraph />
        </div>
    );
}
