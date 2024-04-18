import { memo, useMemo } from 'react';
import { Pie, PieConfig } from '@ant-design/charts';
import { Flex } from '@components/flex/flex';
import { Grid } from 'antd';

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

    const configParams = lg
        ? {
              width: 520,
              height: 334,
              inset: 72,
          }
        : { width: 328, height: 211, inset: 12 };

    const config: PieConfig = {
        data: formatedData,
        ...configParams,
        innerRadius: 0.7,
        angleField: 'percent',
        colorField: 'name',
        label: {
            text: 'name',
            position: 'outside',
            connector: false,
            hyphens: 'auto',
            style: {
                fontFamily: 'Inter, sans-serif',
                fontSize: lg ? 14 : 12,
                fill: '#262626',
                fillOpacity: 1,
            },
        },
        legend: false,
        tooltip: false,
        style: {
            stroke: '#ffffff',
        },
    };

    return (
        <Flex justify='justifyCenter' align='alignCenter'>
            <Pie {...config} />
        </Flex>
    );
});
