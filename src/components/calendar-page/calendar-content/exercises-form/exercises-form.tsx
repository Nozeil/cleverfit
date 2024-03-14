import { PlusOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import type { TrainingExercise } from '@models/models';
import {
    addExerciseId,
    exerciseIdsSelector,
    removeExerciseId,
} from '@redux/slices/exercises-form/exercises-form';
import { addExercises } from '@redux/slices/training-modal/training-modal';
import { type FormInstance, Button, Form, Space } from 'antd';

import { Exercise } from './exercise/exercise';
import styles from './exercises-form.module.css';

type ExercisesFormProps = {
    form: FormInstance;
};

export const ExercisesForm = ({ form }: ExercisesFormProps) => {
    const exerciseIds = useAppSelector(exerciseIdsSelector);
    const dispatch = useAppDispatch();

    const onFinish = (values: {
        [x: number]: Omit<TrainingExercise, 'isImplementation'> & {
            id: number;
            isImplementation?: boolean;
        };
    }) => {
        const exercises = Object.values(values)
            .map((exercise) => {
                if (!exercise.name) {
                    dispatch(removeExerciseId(exercise.id));
                }

                return {
                    id: exercise.id,
                    name: exercise.name,
                    approaches: exercise.approaches ?? 1,
                    weight: exercise.weight ?? 0,
                    replays: exercise.replays ?? 1,
                    isImplementation: exercise.isImplementation ?? false,
                };
            })
            .filter((exercise) => exercise.name !== undefined);
        dispatch(addExercises(exercises));
    };

    return (
        <>
            <Form
                className={styles.form}
                form={form}
                name='exercise-form'
                size='small'
                autoComplete='off'
                onFinish={onFinish}
            >
                <Space direction='vertical' size='large' className={styles.exercisesWrapper}>
                    {exerciseIds.map((id) => (
                        <Exercise key={id} id={id} />
                    ))}
                </Space>
            </Form>

            <div className={styles.btnWrapper}>
                <Button
                    className={styles.btn}
                    block
                    icon={<PlusOutlined />}
                    size='middle'
                    type='link'
                    onClick={() => dispatch(addExerciseId())}
                >
                    Добавить еще
                </Button>
            </div>
        </>
    );
};
