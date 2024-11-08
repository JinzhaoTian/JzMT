import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from '@/components/ui/tooltip';

const getContributionsForGraph = () => {
    const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        day: 'numeric'
    };

    const today = new Date();
    const todayDateStr = today.toISOString().split('T')[0];

    const todayDayOfWeek = today.getDay();

    const totalCells = 7 * 53;
    const requiredDataCount = totalCells - (7 - todayDayOfWeek - 1);

    const contributionsForGraph: { date: string; contributions: number }[] = [];
    const currentDate = new Date(todayDateStr);

    for (let i = 0; i < requiredDataCount; i++) {
        const day = currentDate.getDate();

        const contribution = {
            date: `${currentDate.toLocaleString('en-US', options)}${
                day % 10 === 1 && day !== 11
                    ? 'st'
                    : day % 10 === 2 && day !== 12
                      ? 'nd'
                      : day % 10 === 3 && day !== 13
                        ? 'rd'
                        : 'th'
            }`,
            contributions: Math.floor(Math.random() * 21)
        };
        contributionsForGraph.push(contribution);
        currentDate.setDate(currentDate.getDate() - 1);
    }

    return contributionsForGraph.reverse(); // 返回正序的数据
};

export const ContributionGraph = () => {
    const contributionsData = getContributionsForGraph();

    return (
        <div className="flex flex-col flex-wrap gap-1 h-[108px] w-[844px]">
            {contributionsData.map((data, index) => {
                const contributions = data.contributions;
                const color =
                    contributions === 0
                        ? 'bg-gray-200'
                        : contributions >= 10
                          ? 'bg-green-800'
                          : contributions >= 6
                            ? 'bg-green-700'
                            : contributions >= 4
                              ? 'bg-green-600'
                              : contributions >= 3
                                ? 'bg-green-500'
                                : contributions >= 2
                                  ? 'bg-green-400'
                                  : 'bg-green-300';

                const borderColor =
                    contributions === 0
                        ? 'border-gray-300'
                        : contributions >= 10
                          ? 'border-green-900'
                          : contributions >= 6
                            ? 'border-green-800'
                            : contributions >= 4
                              ? 'border-green-700'
                              : contributions >= 3
                                ? 'border-green-600'
                                : contributions >= 2
                                  ? 'border-green-500'
                                  : 'border-green-400';

                return (
                    <Tooltip key={index}>
                        <TooltipTrigger>
                            <div
                                className={`w-[12px] h-[12px] rounded-xm ${color} border ${borderColor}`}
                            />
                        </TooltipTrigger>
                        <TooltipContent side="top">
                            <p>{`${contributions} contributions on ${data.date}.`}</p>
                        </TooltipContent>
                    </Tooltip>
                );
            })}
        </div>
    );
};
