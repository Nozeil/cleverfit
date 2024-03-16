import {
    ArrowLeftOutlined,
    EditOutlined,
} from '@ant-design/icons';
import EmptyIcon from '@assets/icons/empty.svg?react';
import { Flex } from '@components/flex/flex';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { openCalendarSidePanel } from '@redux/slices/calendar-side-panel';
import {
    clearExercises,
    resetFormExercises,
    setExerciseFormMode,
    setFormExercises,
    setReceivedExercises,
    setTrainingType,
    trainingModalSelector,
    unlockExerciseBtn,
} from '@redux/slices/training-modal/training-modal';
import { useGetTrainingListQuery } from '@services/endpoints/catalogs';
import { Button, Card, Empty, Row, Select, Typography } from 'antd';
import { type ReactNode, useEffect, useMemo } from 'react';

import styles from './training-modal.module.css';

type ExercisesCardProps = {
    saveButton: ReactNode;
    resetForm: () => void;
    onArrowLeftClick: () => void;
};

export const ExercisesCard = ({ saveButton, resetForm, onArrowLeftClick }: ExercisesCardProps) => {
    const { data } = useGetTrainingListQuery();
    const {
        isPast,
        exercises,
        trainingTypes,
        trainingType,
        trainings,
        formExercises,
        isExerciseBtnLocked,
    } = useAppSelector(trainingModalSelector);

    const dispatch = useAppDispatch();
    const onAddExerciseClick = () => {
        if (!formExercises.length) {
            dispatch(resetFormExercises());
        }

        dispatch(openCalendarSidePanel());
    };

    const content = exercises.length ? (
        <Flex className={styles.exercisesWrapper} direction='column' gap='gap12'>
            {exercises.map((exercise, index) => (
                <Row key={exercise._id} justify='space-between'>
                    <Typography.Text className={styles.exercise}>{exercise.name}</Typography.Text>
                    <EditOutlined
                        style={{ color: 'var(--primary-light-6)' }}
                        data-test-id={`modal-update-training-edit-button${index}`}
                        onClick={onAddExerciseClick}
                    />
                </Row>
            ))}
        </Flex>
    ) : (
        <Empty description='' image={<EmptyIcon />} imageStyle={{ height: 91, marginBottom: 0 }} />
    );
    const options = useMemo(() => {
        let options;

        if (!isPast) {
            options = data?.filter(({ name }) => !trainingTypes.some((type) => type.name === name));
        }

        return options?.map(({ name }) => ({
            value: name,
            label: name,
        }));
    }, [data, isPast, trainingTypes]);

    useEffect(() => {
        if (trainingType.name) {
            dispatch(unlockExerciseBtn());
        }
    }, [dispatch, trainingType]);

    return (
        <Card
            className={styles.card}
            bordered={false}
            title={
                <Flex className={styles.cardTitleWrapper}>
                    <ArrowLeftOutlined
                        onClick={onArrowLeftClick}
                        data-test-id='modal-exercise-training-button-close'
                    />
                    <Select
                        data-test-id='modal-create-exercise-select'
                        className={styles.select}
                        size='middle'
                        defaultValue={
                            trainingType.name ? trainingType.name : 'Выбор типа тренировки'
                        }
                        options={options}
                        onSelect={(value) => {
                            const training = trainings.find((training) => training.name === value);

                            resetForm();

                            dispatch(resetFormExercises());
                            dispatch(clearExercises());
                            dispatch(setTrainingType({ name: value, id: training?._id }));

                            if (training) {
                                dispatch(setExerciseFormMode('edit'));
                                dispatch(setReceivedExercises(training.exercises));
                                dispatch(setFormExercises());
                            } else {
                                dispatch(setExerciseFormMode('new'));
                            }
                        }}
                    />
                </Flex>
            }
            actions={[
                <Flex direction='column' gap='gap8'>
                    <Button
                        block
                        type='default'
                        onClick={onAddExerciseClick}
                        disabled={isExerciseBtnLocked}
                    >
                        Добавить упражнения
                    </Button>
                    {saveButton}
                </Flex>,
            ]}
            data-test-id='modal-create-exercise'
        >
            {content}
        </Card>
    );
};
