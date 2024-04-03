import { type ReactNode, Fragment, useState } from 'react';
import { type FormInstance, Form } from 'antd';

import { ActionBtns } from './action-btns/action-btns';
import { Exercises } from './exercises/exercises';
import { useExercisesFormHandlers } from './hooks/use-exercises-form-handlers';

import styles from './exercises-form.module.css';

type ExercisesFormProps = {
    form: FormInstance;
    fields?: ReactNode[];
};

export const ExercisesForm = ({ form, fields }: ExercisesFormProps) => {
    const [isDeleteBtnDisabled, setIsDeleteBtnDisabled] = useState(true);
    const { onDelete, onFinish, valuesChangeHandler } = useExercisesFormHandlers(
        form,
        setIsDeleteBtnDisabled,
    );

    return (
        <Fragment>
            <Form
                className={styles.form}
                form={form}
                name='exercise-form'
                size='small'
                autoComplete='off'
                onFinish={onFinish}
                onValuesChange={(_, values) => valuesChangeHandler(values)}
            >
                {fields}
                <Exercises />
            </Form>

            <ActionBtns deleteDisabled={isDeleteBtnDisabled} onDelete={onDelete} />
        </Fragment>
    );
};
