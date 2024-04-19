import { useMemo } from 'react';
import { ACHIEVEMENT_ACTIVE_KEYS } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    activeKeySelector,
    trainingsPerPeriodSelector,
} from '@redux/slices/achieviements/achieviements';
import { Typography } from 'antd';

import { WeekDays } from '../week-days/week-days';

import { MonthLoad } from './month-load/month-load';
import { WeekLoad } from './week-load';

import styles from './load-block.module.css';

const { WEEK } = ACHIEVEMENT_ACTIVE_KEYS;

export const LoadBlock = () => {
    const trainingsPerPeriod = useAppSelector(trainingsPerPeriodSelector);
    const activeKey = useAppSelector(activeKeySelector);

    const trainings = useMemo(
        () =>
            trainingsPerPeriod.map(
                ({ dm, dmy, dayOfTheWeek, dayOfTheWeekReadable, averageLoad }) => ({
                    dmy,
                    dm,
                    dayOfTheWeek,
                    dayOfTheWeekReadable,
                    info: averageLoad ? `${averageLoad} кг` : averageLoad,
                }),
            ),
        [trainingsPerPeriod],
    );

    return activeKey === WEEK ? (
        <WeekLoad>
            <WeekDays
                title={
                    <Typography.Text className={styles.text}>
                        Средняя нагрузка по дням недели
                    </Typography.Text>
                }
                data={trainings}
                listClassName={styles.list}
                isReadableDays={true}
            />
        </WeekLoad>
    ) : (
        <MonthLoad data={trainings} />
    );
};
