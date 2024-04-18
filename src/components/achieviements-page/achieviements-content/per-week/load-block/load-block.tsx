import { useMemo } from 'react';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingsPerWeekSelector } from '@redux/slices/achieviements/achieviements';
import { Typography } from 'antd';

import { ChartBlock } from '../../chart-block/chart-block';
import { WeekDays } from '../../week-days/week-days';

import { WeekLoadChart } from './week-load-chart/week-load-chart';

import styles from './load-block.module.css';

export const LoadBlock = () => {
    const trainingsPerWeek = useAppSelector(trainingsPerWeekSelector);

    const trainings = useMemo(
        () =>
            trainingsPerWeek.map(({ date, dayOfTheWeek, dayOfTheWeekReadable, averageLoad }) => ({
                date,
                dayOfTheWeek,
                dayOfTheWeekReadable,
                info: averageLoad ? `${averageLoad} кг` : averageLoad,
            })),
        [trainingsPerWeek],
    );

    return (
        <ChartBlock>
            <WeekLoadChart />
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
