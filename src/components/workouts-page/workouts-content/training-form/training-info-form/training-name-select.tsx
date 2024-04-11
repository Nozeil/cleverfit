import { useMemo } from 'react';
import { EXERCISES_FORM_MODES } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    setTrainingType,
    trainingModalAndExercisesFormSelector,
} from '@redux/slices/training-modal-and-exercises-form/training-modal-and-exercises-form';
import { useGetTrainingListQuery } from '@services/endpoints/catalogs';
import { Form, Select, SelectProps } from 'antd';

import styles from './training-info-form.module.css';

const { NEW } = EXERCISES_FORM_MODES;

export const TrainingNameSelect = () => {
    const { trainingTypes, exercisesFormMode } = useAppSelector(
        trainingModalAndExercisesFormSelector,
    );
    const dispatch = useAppDispatch();
    const { data: trainingList } = useGetTrainingListQuery();

    const selectOptions = useMemo(
        () =>
            trainingList
                ?.filter((option) => !trainingTypes.some((type) => option.name === type.name))
                .map(({ name }) => ({ value: name, label: name })),
        [trainingList, trainingTypes],
    );

    const onSelect: SelectProps['onSelect'] = (value) => {
        dispatch(setTrainingType({ name: value }));
    };

    return (
        <Form.Item className={styles.selectFormItem} name='name' noStyle={true}>
            <Select
                placeholder='Выбор типа тренировки'
                options={selectOptions}
                disabled={exercisesFormMode !== NEW}
                onSelect={onSelect}
                data-test-id='modal-create-exercise-select'
            />
        </Form.Item>
    );
};
