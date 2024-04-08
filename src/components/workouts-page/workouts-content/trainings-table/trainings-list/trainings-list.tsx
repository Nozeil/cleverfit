import { useMemo } from 'react';
import { DownOutlined, EditOutlined } from '@ant-design/icons';
import { Flex } from '@components/flex/flex';
import { TRAINING_COLORS } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { openSidePanel } from '@redux/slices/side-panel';
import {
    resetExercises,
    resetFormExercises,
    setExerciseDate,
    setExerciseFormMode,
    setFormExercises,
    setIsPastFalse,
    setIsPastTrue,
    setReceivedExercises,
    setTrainingType,
} from '@redux/slices/training-modal-and-exercises-form/training-modal-and-exercises-form';
import { trainingsTableSelector } from '@redux/slices/trainings-table/trainings-table';
import { Badge, Button, Typography } from 'antd';
import moment from 'moment';

import { formatExerciseDate } from '../../workouts-content.utils';
import { PERIODS } from '../workouts-content.constants';

import styles from './trainings-list.module.css';

export const TrainingsList = () => {
    const { sortedTrainings, paginationPage, paginationPageSize } =
        useAppSelector(trainingsTableSelector);
    const dispatch = useAppDispatch();

    const paginatedTrainings = useMemo(() => {
        const sliceStart = (paginationPage - 1) * paginationPageSize;
        const sliceEnd = sliceStart + paginationPageSize;

        return sortedTrainings.slice(sliceStart, sliceEnd);
    }, [paginationPage, paginationPageSize, sortedTrainings]);

    return (
        <Flex className={styles.list} as='ul' direction='column' gap='gap5'>
            {paginatedTrainings?.map(
                ({ _id, name, date, parameters, exercises, isImplementation }) => (
                    <Flex
                        as='li'
                        className={styles.listItem}
                        key={_id}
                        align='alignCenter'
                        gap='gap12'
                    >
                        <Flex className={styles.training} align='alignCenter' gap='gap12'>
                            <Flex className={styles.badgeWrapper} align='alignCenter'>
                                <Badge color={TRAINING_COLORS[name]} />
                            </Flex>
                            <Flex
                                className={styles.trainingName}
                                align='alignCenter'
                                justify='justifyBetween'
                            >
                                <Typography.Text>{name}</Typography.Text>
                                <Button
                                    className={styles.btn}
                                    type='text'
                                    icon={<DownOutlined style={{ fontSize: 12 }} />}
                                />
                            </Flex>
                        </Flex>

                        <Flex
                            className={styles.period}
                            justify='justifyBetween'
                            align='alignCenter'
                            gap='gap12'
                        >
                            <Flex className={styles.periodTextWrapper} align='alignCenter'>
                                <Typography.Text className={styles.periodText}>
                                    {parameters.period && PERIODS[parameters.period - 1]}
                                </Typography.Text>
                            </Flex>

                            <Button
                                className={styles.editBtn}
                                type='text'
                                icon={<EditOutlined style={{ fontSize: 28 }} />}
                                disabled={isImplementation}
                                onClick={() => {
                                    const exerciseDate = formatExerciseDate(date);
                                    const setIsPastAction = moment(date).isBefore()
                                        ? setIsPastTrue
                                        : setIsPastFalse;

                                    dispatch(resetFormExercises());
                                    dispatch(resetExercises());

                                    dispatch(setExerciseFormMode('edit'));
                                    dispatch(setReceivedExercises(exercises));
                                    dispatch(setFormExercises());
                                    dispatch(setExerciseDate(exerciseDate));
                                    dispatch(setTrainingType({ name, id: _id }));
                                    dispatch(setIsPastAction());

                                    dispatch(openSidePanel());
                                }}
                            />
                        </Flex>
                    </Flex>
                ),
            )}
        </Flex>
    );
};
