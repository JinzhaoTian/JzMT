import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip';

interface ContributionData {
    date: string;
    contributions: number;
}

function getContributionsForGraph(): ContributionData[] {
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
            // date: `${currentDate.toLocaleString('en-US', options)}${
            //     day % 10 === 1 && day !== 11
            //         ? 'st'
            //         : day % 10 === 2 && day !== 12
            //           ? 'nd'
            //           : day % 10 === 3 && day !== 13
            //             ? 'rd'
            //             : 'th'
            // }`,
            date: `${currentDate.toISOString().split('T')[0]}$`,
            contributions: Math.floor(Math.random() * 21)
        };
        contributionsForGraph.push(contribution);
        currentDate.setDate(currentDate.getDate() - 1);
    }

    return contributionsForGraph.reverse(); // 返回正序的数据
}

export const ContributionsGraph = () => {
    const contributions = getContributionsForGraph();

    return (
        <TooltipProvider delayDuration={0} skipDelayDuration={0}>
            <div className="grid grid-flow-col grid-rows-[auto, repeat(8,_10px)] grid-cols-[auto, repeat(54,_10px)] gap-1">
                <div className="grid grid-rows-[repeat(8,_10px)] grid-cols-[repeat(1,_20px)] gap-1 col-span-1 row-span-8">
                    <span className="text-[10px] h-[10px] text-left row-start-1 mr-1 flex justify-start items-center"></span>
                    <span className="text-[10px] h-[10px] text-left row-start-2 mr-1 flex justify-start items-center"></span>
                    <span className="text-[10px] h-[10px] text-left row-start-3 mr-1 flex justify-start items-center">
                        Mon
                    </span>
                    <span className="text-[10px] h-[10px] text-left row-start-4 mr-1 flex justify-start items-center"></span>
                    <span className="text-[10px] h-[10px] text-left row-start-5 mr-1 flex justify-start items-center">
                        Wed
                    </span>
                    <span className="text-[10px] h-[10px] text-left row-start-6 mr-1 flex justify-start items-center"></span>
                    <span className="text-[10px] h-[10px] text-left row-start-7 mr-1 flex justify-start items-center">
                        Fri
                    </span>
                    <span className="text-[10px] h-[10px] text-left row-start-8 mr-1 flex justify-start items-center"></span>
                </div>

                <div className="grid grid-cols-[repeat(53, _10px)] grid-rows-[repeat(1,_10px)] gap-1 col-span-53 row-span-1">
                    {contributions.map((data, index) => {
                        const date = new Date(data.date);
                        const dayOfWeek = date.getDay();
                        const col = Math.floor(index / 7) + 2;

                        // Add month label only on the first Sunday of each month
                        if (
                            dayOfWeek === 0 &&
                            (index === 0 ||
                                (index >= 7 &&
                                    new Date(
                                        contributions[index - 7].date
                                    ).getMonth() !== date.getMonth()))
                        ) {
                            return (
                                <span
                                    key={`month-${index}`}
                                    className={`text-[10px] text-left col-start-${col} row-start-1 pb-2`}
                                >
                                    {date.toLocaleString('en-US', {
                                        month: 'short'
                                    })}
                                </span>
                            );
                        }
                        return null;
                    })}
                </div>

                <div className="grid grid-flow-col grid-cols-[repeat(53,_10px)] grid-rows-[repeat(7,_10px)] gap-1 col-span-53 row-span-7">
                    {contributions.map((data, index) => {
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
                                        className={`w-[10px] h-[10px] rounded-xm ${color} border ${borderColor}`}
                                    />
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                    <p>{`${contributions} contributions on ${data.date}.`}</p>
                                </TooltipContent>
                            </Tooltip>
                        );
                    })}
                </div>
            </div>
        </TooltipProvider>
    );
};
