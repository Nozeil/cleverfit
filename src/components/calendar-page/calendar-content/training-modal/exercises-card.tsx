import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import EmptyIcon from '@assets/icons/empty.svg?react';
import { Flex } from '@components/flex/flex';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingModalSelector } from '@redux/slices/training-modal/training-modal';
import { useGetTrainingListQuery } from '@services/endpoints/catalogs';
import { Button, Card, Empty, Row, Select, Typography } from 'antd';
import { type ReactNode, useMemo } from 'react';

import styles from './training-modal.module.css';

type ExercisesCardProps = {
    saveButton: ReactNode;
    onArrowLeftClick: () => void;
    onSelect: (value: string) => void;
    onAddExerciseBtnClick: () => void;
};

export const ExercisesCard = ({
    saveButton,
    onArrowLeftClick,
    onSelect,
    onAddExerciseBtnClick,
}: ExercisesCardProps) => {
    const { data } = useGetTrainingListQuery();
    const { exercises, trainingTypes } = useAppSelector(trainingModalSelector);

    const content = exercises.length ? (
        <Flex className={styles.exercisesWrapper} direction='column' gap='gap12'>
            {exercises.map((exercise) => (
                <Row key={exercise.id} justify='space-between'>
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
                        defaultValue='Выбор типа тренировки'
                        options={options}
                        onSelect={onSelect}
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
