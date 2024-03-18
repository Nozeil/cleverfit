import { type FormInstance, Form } from 'antd';
import { useState } from 'react';

import { ActionBtns } from './action-btns/action-btns';
import { Exercises } from './exercises/exercises';
import styles from './exercises-form.module.css';
import { useExercisesFormHandlers } from './hooks/use-exercises-form-handlers';

type ExercisesFormProps = {
    form: FormInstance;
};

export const ExercisesForm = ({ form }: ExercisesFormProps) => {
    const [isDeleteBtnDisabled, setIsDeleteBtnDisabled] = useState(true);
    const { onDelete, onFinish, valuesChangeHandler } = useExercisesFormHandlers(form, setIsDeleteBtnDisabled);

    return (
        <>
            <Form
                className={styles.form}
                form={form}
                name='exercise-form'
                size='small'
                autoComplete='off'
                onFinish={onFinish}
                onValuesChange={(_, values) => valuesChangeHandler(values)}
            >
                <Exercises />
            </Form>

            <ActionBtns deleteDisabled={isDeleteBtnDisabled} onDelete={onDelete} />
        </>
    );
};
