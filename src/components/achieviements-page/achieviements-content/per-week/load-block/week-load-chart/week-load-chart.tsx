import { type ColumnConfig, Column } from '@ant-design/charts';
import { Flex } from '@components/flex/flex';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingsPerWeekSelector } from '@redux/slices/achieviements/achieviements';
import { Grid, Typography } from 'antd';

import styles from './week-load-chart.module.css';

const { useBreakpoint } = Grid;

const data = [
    { type: '29.01', value: 129 },
    { type: '30.01', value: 0 },
    { type: '31.01', value: 22 },
    { type: '01.02', value: 85 },
    { type: '02.02', value: 0 },
    { type: '03.02', value: 99 },
    { type: '04.02', value: 131 },
];

const lineDash = [2, 4];
const formatter = (value: number) => `${value} кг`;

export const WeekLoadChart = () => {
    const trainingsPerLastWeek = useAppSelector(trainingsPerWeekSelector);
    const { md } = useBreakpoint();

    const configParams = md
        ? {
              width: 518,
              height: 318,
              sizeField: 30,
              insetLeft: -18,
              marginTop: 0,
              marginBottom: 6,
          }
        : {
              width: 345,
              height: 200,
              sizeField: 20,
              insetLeft: -10,
              marginTop: 0,
              marginBottom: 0,
          };

    const axisParams = {
        tick: false,
        labelAutoRotate: false,
        labelFontFamily: 'Inter, sans-serif',
        labelFontSize: md ? undefined : 7,
    };

    const config: ColumnConfig = {
        className: styles.chart,
        data: trainingsPerLastWeek,
        xField: 'dm',
        yField: 'averageLoad',
        colorField: '#85a5ff',
        insetTop: 8,
        ...configParams,

        axis: {
            x: {
                line: true,
                lineLineDash: lineDash,
                labelSpacing: md ? 16 : 12,
                ...axisParams,
            },
            y: {
                labelFormatter: formatter,
                gridLineDash: lineDash,
                ...axisParams,
            },
        },
        tooltip: {
            name: 'Нагрузка',
            channel: 'y',
            valueFormatter: formatter,
        },
    };

    return (
        <Flex className={styles.loadChartWrapper} direction='column' align='alignCenter'>
            <Column {...config} />
            <Typography.Text className={styles.text}>Нагрузка, кг</Typography.Text>
        </Flex>
    );
};
