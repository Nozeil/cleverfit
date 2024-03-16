import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import EmptyIcon from '@assets/icons/empty.svg?react';
import { Flex } from '@components/flex/flex';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
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
    onAddExerciseBtnClick: () => void;
};

export const ExercisesCard = ({
    saveButton,
    resetForm,
    onArrowLeftClick,
    onAddExerciseBtnClick,
}: ExercisesCardProps) => {
    const { data } = useGetTrainingListQuery();
    const { exercises, trainingTypes, trainingType, trainings } =
        useAppSelector(trainingModalSelector);

    const dispatch = useAppDispatch();

    const content = exercises.length ? (
        <Flex className={styles.exercisesWrapper} direction='column' gap='gap12'>
            {exercises.map((exercise) => (
                <Row key={exercise._id} justify='space-between'>
                    <Typography.Text className={styles.exercise}>{exercise.name}</Typography.Text>
                    <EditOutlined
                        style={{ color: 'var(--primary-light-6)' }}
                        onClick={onAddExerciseBtnClick}
                    />
                </Row>
            ))}
        </Flex>
    ) : (
        <Empty description='' image={<EmptyIcon />} imageStyle={{ height: 91, marginBottom: 0 }} />
    );
    const options = useMemo(
        () =>
            data
                ?.filter(({ name }) => !trainingTypes.includes(name))
                .map(({ name }) => ({
                    value: name,
                    label: name,
                })),
        [data, trainingTypes],
    );

    useEffect(() => {
        if (trainingType) {
            dispatch(unlockExerciseBtn());
        }
    }, [dispatch, trainingType]);

    return (
        <Card
            className={styles.card}
            bordered={false}
            title={
                <Flex className={styles.cardTitleWrapper}>
                    <ArrowLeftOutlined onClick={onArrowLeftClick} />
                    <Select
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
                    <Button block type='default' onClick={onAddExerciseBtnClick}>
                        Добавить упражнения
                    </Button>
                    {saveButton}
                </Flex>,
            ]}
        >
            {content}
        </Card>
    );
};
