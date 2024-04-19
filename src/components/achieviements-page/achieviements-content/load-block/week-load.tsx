import { type ReactNode } from 'react';

import { ChartBlock } from '../chart-block/chart-block';
import { LoadChart } from '../load-chart/load-chart';

type WeekLoadProps = {
    children: ReactNode;
};

export const WeekLoad = ({ children }: WeekLoadProps) => (
    <ChartBlock>
        <LoadChart />
        {children}
    </ChartBlock>
);
