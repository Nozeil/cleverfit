import { useMemo } from 'react';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingsPerPeriodSelector } from '@redux/slices/achieviements/achieviements';
import { Typography } from 'antd';

import { ChartBlock } from '../chart-block/chart-block';
import { LoadChart } from '../load-chart/load-chart';
import { WeekDays } from '../week-days/week-days';

import styles from './load-block.module.css';

export const LoadBlock = () => {
    const trainingsPerPeriod = useAppSelector(trainingsPerPeriodSelector);

    const trainings = useMemo(
        () =>
            trainingsPerPeriod.map(({ date, dayOfTheWeek, dayOfTheWeekReadable, averageLoad }) => ({
                date,
                dayOfTheWeek,
                dayOfTheWeekReadable,
                info: averageLoad ? `${averageLoad} кг` : averageLoad,
            })),
        [trainingsPerPeriod],
    );

    return (
        <ChartBlock>
            <LoadChart />
            <WeekDays
                title={
                    <Typography.Text className={styles.text}>
                        Средняя нагрузка по дням недели
                    </Typography.Text>
                }
                data={trainings}
            />
        </ChartBlock>
    );
};
