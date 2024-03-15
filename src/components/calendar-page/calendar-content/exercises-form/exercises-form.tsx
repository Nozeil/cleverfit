import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex } from '@components/flex/flex';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    addEmptyFormExercise,
    removeFormExerciseById,
    removeFormExercisesByIds,
    setExercises,
    trainingModalSelector,
} from '@redux/slices/training-modal/training-modal';
import { type FormInstance, Button, Form, Space } from 'antd';
import { useState } from 'react';

import { Exercise } from './exercise/exercise';
import styles from './exercises-form.module.css';
import { FormValues } from './exercises-form.types';

type ExercisesFormProps = {
    form: FormInstance;
};

export const ExercisesForm = ({ form }: ExercisesFormProps) => {
    const [isDeleteBtnDisabled, setIsDeleteBtnDisabled] = useState(true);

    const { formExercises, exercisesFormMode } = useAppSelector(trainingModalSelector);
    const dispatch = useAppDispatch();

    let btns = null;
    let btnsWrapperClassName = '';

    if (exercisesFormMode === 'new') {
        btnsWrapperClassName = styles.btnsWrapper;
        btns = (
            <Button
                className={styles.btn}
                block
                icon={<PlusOutlined />}
                size='large'
                type='link'
                onClick={() => dispatch(addEmptyFormExercise())}
            >
                Добавить еще
            </Button>
        );
    } else if (exercisesFormMode === 'edit') {
        btnsWrapperClassName = styles.btnsWrapperEditMode;
        btns = (
            <>
                <Button
                    className={styles.btn}
                    icon={<PlusOutlined />}
                    size='large'
                    type='link'
                    onClick={() => dispatch(addEmptyFormExercise())}
                >
                    Добавить еще
                </Button>
                <Button
                    className={styles.btn}
                    icon={<MinusOutlined />}
                    size='large'
                    type='text'
                    disabled={isDeleteBtnDisabled}
                    onClick={() => {
                        const formValues: FormValues = form.getFieldsValue();
                        const fields = Object.values(formValues);
                        const ids = fields
                            .filter((field) => field.shouldDelete)
                            .map((field) => field.id);

                        if (fields.length === ids.length) {
                            setIsDeleteBtnDisabled(true);
                        }

                        dispatch(removeFormExercisesByIds(ids));
                    }}
                >
                    Удалить
                </Button>
            </>
        );
    }

    const onFinish = (values: FormValues) => {
        const formExercises = Object.values(values)
            .map((exercise) => {
                if (!exercise.name) {
                    dispatch(removeFormExerciseById(exercise.id));
                }

                return {
                    _id: exercise.id,
                    name: exercise.name,
                    approaches: exercise.approaches ?? 1,
                    weight: exercise.weight ?? 0,
                    replays: exercise.replays ?? 1,
                    isImplementation: exercise.isImplementation ?? false,
                };
            })
            .filter((exercise) => exercise.name)
            .sort((exercise1, exercise2) => `${exercise2._id}`.length - `${exercise1._id}`.length);

        dispatch(setExercises(formExercises));
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
                onValuesChange={(_, values) => {
                    const isDisabled = !Object.values(values).some((field) => field?.shouldDelete);
                    setIsDeleteBtnDisabled(isDisabled);
                }}
            >
                <Space direction='vertical' size='large' className={styles.exercisesWrapper}>
                    {formExercises.map(({ _id, name, approaches, replays, weight }) => (
                        <Exercise
                            key={_id}
                            id={_id}
                            name={name}
                            approaches={approaches}
                            replays={replays}
                            weight={weight}
                        />
                    ))}
                </Space>
            </Form>

            <Flex className={btnsWrapperClassName} justify='justifyBetween'>
                {btns}
            </Flex>
        </>
    );
};
