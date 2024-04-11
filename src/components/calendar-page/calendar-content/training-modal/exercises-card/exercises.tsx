import { EditOutlined } from '@ant-design/icons';
import { Flex } from '@components/flex/flex';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingModalAndExercisesFormSelector } from '@redux/slices/training-modal-and-exercises-form/training-modal-and-exercises-form';
import { Row, Typography } from 'antd';

import styles from '../training-modal.module.css';

type ExercisesProps = {
    onAdd: () => void;
};

export const Exercises = ({ onAdd }: ExercisesProps) => {
    const { exercises } = useAppSelector(trainingModalAndExercisesFormSelector);

    return (
        <Flex className={styles.exercisesWrapper} direction='column' gap='gap12'>
            {exercises.map((exercise, index) => (
                <Row key={exercise._id} justify='space-between'>
                    <Typography.Text className={styles.exercise}>{exercise.name}</Typography.Text>
                    <EditOutlined
                        style={{ color: 'var(--primary-light-6)' }}
                        data-test-id={`modal-update-training-edit-button${index}`}
                        onClick={onAdd}
                    />
                </Row>
            ))}
        </Flex>
    );
};
