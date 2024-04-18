import { useMemo } from 'react';
import { Flex } from '@components/flex/flex';
import { ACTIVE_FILTER_ALL } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    activeFilterSelector,
    trainingsPerPeriodSelector,
} from '@redux/slices/achieviements/achieviements';
import { Typography } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import { findMostFrequentWord } from '../achieviements-content.utils';

import styles from './frequent-training-and-exercise.module.css';

export const FrequentTrainingAndExercise = () => {
    const trainingsPerPeriod = useAppSelector(trainingsPerPeriodSelector);
    const activeFilter = useAppSelector(activeFilterSelector);

    const mostFrequentTrainingAndExercise = useMemo(() => {
        const trainings =
            activeFilter.key === ACTIVE_FILTER_ALL.KEY
                ? trainingsPerPeriod.flatMap(({ trainingNames }) => trainingNames)
                : null;
        const exercises = trainingsPerPeriod.flatMap(({ exerciseNames }) => exerciseNames);

        const exercise = {
            label: `Самое частое
упражнение`,
            value: findMostFrequentWord(exercises).toLowerCase(),
        };

        return trainings
            ? [
                  {
                      label: `Самая частая
тренировка`,
                      value: findMostFrequentWord(trainings).toLowerCase(),
                  },
                  exercise,
              ]
            : [exercise];
    }, [activeFilter.key, trainingsPerPeriod]);

    return (
        <Flex className={styles.list} as='ul' direction='column' gap='gap16'>
            {mostFrequentTrainingAndExercise.map(({ label, value }) => (
                <Flex key={uuidv4()} as='li' align='alignCenter' gap='gap16'>
                    <Typography.Text className={styles.label}>{label}</Typography.Text>
                    <Typography.Text className={styles.mostFrequentValue}>{value}</Typography.Text>
                </Flex>
            ))}
        </Flex>
    );
};
