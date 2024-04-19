import { type ColumnConfig, Column } from '@ant-design/charts';
import { ACHIEVEMENT_ACTIVE_KEYS } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    activeKeySelector,
    trainingsPerPeriodSelector,
} from '@redux/slices/achieviements/achieviements';
import { Grid, Typography } from 'antd';
import classNames from 'classnames/bind';

import styles from './load-chart.module.css';

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
const { WEEK } = ACHIEVEMENT_ACTIVE_KEYS;

const cx = classNames.bind(styles);

export const LoadChart = () => {
    const trainingsPerPeriod = useAppSelector(trainingsPerPeriodSelector);
    const activeKey = useAppSelector(activeKeySelector);
    const isWeek = activeKey === WEEK;

    const { md } = useBreakpoint();

    const configParams = md
        ? {
              width: isWeek ? 518 : undefined,
              height: 318,
              sizeField: 30,
              insetLeft: -18,
              marginTop: 0,
              marginBottom: 6,
          }
        : {
              width: isWeek ? 328 : undefined,
              height: 200,
              sizeField: 20,
              insetLeft: -10,
              marginTop: 0,
              marginBottom: 0,
              marginLeft: 8,
          };

    const axisParams = {
        tick: false,
        labelAutoRotate: false,
        labelFontFamily: 'Inter, sans-serif',
        labelFontSize: md ? undefined : 7,
    };

    const config: ColumnConfig = {
        className: cx(styles.chart, { [styles.chartWeek]: isWeek }),
        data: trainingsPerPeriod,
        xField: 'dm',
        yField: 'averageLoad',
        colorField: '#85a5ff',
        insetTop: 8,
        scrollbar: isWeek
            ? undefined
            : {
                  x: {
                      ratio: 0.54,
                  },
              },
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
        <div className={styles.loadChartWrapper}>
            <Column {...config} />
            <Typography.Paragraph className={styles.text}>Нагрузка, кг</Typography.Paragraph>
        </div>
    );
};
