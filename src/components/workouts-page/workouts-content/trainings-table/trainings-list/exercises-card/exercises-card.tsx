import { ArrowLeftOutlined } from '@ant-design/icons';
import { ExercisesContent } from '@components/exercises-content';
import { Flex } from '@components/flex/flex';
import { TRAINING_COLORS } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { openSidePanel } from '@redux/slices/side-panel';
import { trainingModalAndExercisesFormSelector } from '@redux/slices/training-modal-and-exercises-form/training-modal-and-exercises-form';
import { setIsExerciseCard } from '@redux/slices/trainings-table/trainings-table';
import { Button, Card, Typography } from 'antd';

import styles from './exercises-card.module.css';

export const ExercisesCard = () => {
    const { trainingType, exercises } = useAppSelector(trainingModalAndExercisesFormSelector);
    const dispatch = useAppDispatch();

    const onAddExercise = () => dispatch(openSidePanel());
    const onBack = () => dispatch(dispatch(setIsExerciseCard(false)));

    return (
        <Card
            className={styles.card}
            bordered={false}
            title={
                <Flex className={styles.titleWrapper} gap='gap12'>
                    <Button
                        className={styles.btn}
                        type='text'
                        icon={<ArrowLeftOutlined style={{ fontSize: 16 }} />}
                        onClick={onBack}
                    />
                    <Typography.Text className={styles.title}>{trainingType.name}</Typography.Text>
                </Flex>
            }
            headStyle={{ borderWidth: 2, borderColor: TRAINING_COLORS[trainingType.name] }}
            actions={[
                <Button className={styles.addExerciseBtn} block={true} onClick={onAddExercise}>
                    Добавить упражнения
                </Button>,
            ]}
        >
            <ExercisesContent
                content={
                    <Flex className={styles.exercisesWrapper} direction='column' gap='gap8'>
                        {exercises.map(({ _id, name }) => (
                            <Typography.Text key={_id} className={styles.exercise}>
                                {name}
                            </Typography.Text>
                        ))}
                    </Flex>
                }
            />
        </Card>
    );
};
