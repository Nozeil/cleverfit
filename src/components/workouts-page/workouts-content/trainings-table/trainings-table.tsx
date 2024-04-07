import { useEffect, useMemo } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Flex } from '@components/flex/flex';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    setSortedTrainings,
    trainingsTableSortedBySelector,
} from '@redux/slices/trainings-table/trainings-table';
import { useGetTrainingQuery } from '@services/endpoints/training';

import { NewTrainingBtn } from '../new-training-btn/new-training-btn';

import { Heading } from './heading/heading';
import { TrainingsList } from './trainings-list/trainings-list';
import { TrainingsPagination } from './trainings-pagination';
import { trainingsSorter } from './trainings-table.utils';

import styles from './trainings-table.module.css';

export const TrainingsTable = () => {
    const sortedBy = useAppSelector(trainingsTableSortedBySelector);
    const dispatch = useAppDispatch();

    const { data } = useGetTrainingQuery();

    const sortedTrainings = useMemo(() => {
        const trainings = data?.slice();

        if (sortedBy === 'asc') {
            return trainings?.sort((a, b) => trainingsSorter(a, b, 'asc'));
        }

        if (sortedBy === 'dsc') {
            return trainings?.sort((a, b) => trainingsSorter(a, b, 'dsc'));
        }

        return trainings;
    }, [data, sortedBy]);

    useEffect(() => {
        if (sortedTrainings) {
            dispatch(setSortedTrainings(sortedTrainings));
        }
    }, [dispatch, sortedTrainings]);

    return (
        <Flex className={styles.wrapper} direction='column' gap={{ xs: 'gap20', sm: 'gap24' }}>
            <Flex className={styles.table} direction='column' gap={{ xs: 'gap12', sm: 'gap24' }}>
                <Heading />
                <TrainingsList />
                <TrainingsPagination />
            </Flex>
            <NewTrainingBtn icon={<PlusOutlined />}>Новая тренировка</NewTrainingBtn>
        </Flex>
    );
};
