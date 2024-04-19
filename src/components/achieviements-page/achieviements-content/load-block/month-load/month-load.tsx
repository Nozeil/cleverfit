import { useMemo } from 'react';
import { Flex } from '@components/flex/flex';
import { v4 as uuidv4 } from 'uuid';

import type { WeekDaysData } from '../../achieviement-content.types';
import { LoadChart } from '../../load-chart/load-chart';

import { LoadByWeek } from './load-by-week/load-by-week';

import styles from './month-load.module.css';

type MonthLoadProps = {
    data: WeekDaysData;
};

export const MonthLoad = ({ data }: MonthLoadProps) => {
    const trainings = useMemo(() => {
        const trainingPerWeeks: WeekDaysData[] = [];
        let week: WeekDaysData = [];

        data.forEach((training) => {
            const limit = 7;

            week.push(training);

            if (week.length === limit) {
                trainingPerWeeks.push(week);
                week = [];
            }
        });

        return trainingPerWeeks;
    }, [data]);

    return (
        <Flex direction='column' gap='gap24'>
            <LoadChart />
            <Flex
                className={styles.wrapper}
                direction={{ xs: 'column', sm: 'column', md: 'row' }}
                gap={{ xs: 'gap14', sm: 'gap14', md: 'gap100' }}
            >
                {trainings.map((trainingsPerWeek) => (
                    <LoadByWeek key={uuidv4()} data={trainingsPerWeek} />
                ))}
            </Flex>
        </Flex>
    );
};
