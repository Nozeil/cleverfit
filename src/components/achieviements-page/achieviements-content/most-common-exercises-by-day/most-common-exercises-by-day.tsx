import { useMemo } from 'react';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingsPerPeriodSelector } from '@redux/slices/achieviements/achieviements';
import { capitalizeFirstLetter } from '@utils/utils';
import { Typography } from 'antd';

import { findMostFrequentWord, findWordsOccurrenceCount } from '../achieviements-content.utils';
import { ChartBlock } from '../chart-block/chart-block';
import { WeekDays } from '../week-days/week-days';

import { RingChart } from './ring-chart/ring-chart';
import type { ExercisesMap } from './most-common-exercises-by-day.types';

import styles from './most-common-exercises-by-day.module.css';

export const MostCommonExercisesByDay = () => {
    const trainingsPerPeriod = useAppSelector(trainingsPerPeriodSelector);

    const exercises = useMemo(() => {
        const exercisesMap = trainingsPerPeriod.reduce<ExercisesMap>((acc, curr) => {
            const key = curr.dayOfTheWeek;
            const day = acc.get(key);

            if (acc.has(key) && day) {
                acc.set(key, {
                    ...curr,
                    exerciseNames: [...day.exerciseNames, ...curr.exerciseNames],
                });
            } else {
                acc.set(key, curr);
            }

            return acc;
        }, new Map());

        const mostFrequentWeekExercises = Array.from(exercisesMap.values()).map((exercise) => ({
            ...exercise,
            info: findMostFrequentWord(exercise.exerciseNames),
        }));

        return mostFrequentWeekExercises;
    }, [trainingsPerPeriod]);

    const exercisePercents = useMemo(() => {
        const exerciseNames = exercises
            .filter((exercise) => exercise.info)
            .map((exercise) => exercise.info);
        const exerciseOccurrenceCount = Array.from(
            findWordsOccurrenceCount(exerciseNames).values(),
        );
        const maxPercents = 100;
        const percentK =
            exerciseOccurrenceCount.reduce((acc, curr) => acc + curr.count, 0) / maxPercents;
        const percents = exerciseOccurrenceCount.map(({ count, name }) => ({
            name: name ? capitalizeFirstLetter(name) : name,
            percent: Math.round(count / percentK),
        }));

        return percents;
    }, [exercises]);

    return (
        <ChartBlock>
            <RingChart data={exercisePercents} />
            <WeekDays
                title={
                    <Typography.Text className={styles.text}>
                        Самые частые упражнения по дням недели
                    </Typography.Text>
                }
                data={exercises}
                isBadgeDefaultColor={true}
                isReadableDays={true}
            />
        </ChartBlock>
    );
};
