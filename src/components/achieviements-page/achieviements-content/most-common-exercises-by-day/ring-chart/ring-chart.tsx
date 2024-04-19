import { memo, useMemo } from 'react';
import { Pie } from '@ant-design/charts';
import { Flex } from '@components/flex/flex';
import { Grid } from 'antd';

import { createConfig } from './ring-chart.config';
import type { RingChartProps } from './ring-chart.types';

const { useBreakpoint } = Grid;

export const RingChart = memo(({ data }: RingChartProps) => {
    const { lg } = useBreakpoint();

    const formatedData = useMemo(
        () =>
            data.map(({ name, percent }) => ({
                percent,
                name: lg ? name : name.split(' ').join('\n'),
            })),
        [data, lg],
    );

    const config = createConfig(lg);

    return (
        <Flex justify='justifyCenter' align='alignCenter'>
            <Pie data={formatedData} {...config} />
        </Flex>
    );
});
