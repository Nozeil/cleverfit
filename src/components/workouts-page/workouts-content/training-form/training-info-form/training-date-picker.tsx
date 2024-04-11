import { DATE_FORMATS, EXERCISES_FORM_MODES } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    setExerciseDate,
    setTrainingTypes,
    trainingModalAndExercisesFormSelector,
} from '@redux/slices/training-modal-and-exercises-form/training-modal-and-exercises-form';
import { useGetTrainingQuery } from '@services/endpoints/training';
import { type DatePickerProps, DatePicker, Form } from 'antd';
import classNames from 'classnames/bind';
import moment from 'moment';

import { formatExerciseDate } from '../../workouts-content.utils';

import styles from './training-info-form.module.css';

const cx = classNames.bind(styles);
const { NEW, EDIT } = EXERCISES_FORM_MODES;

export const TrainingDatePicker = () => {
    const { exercisesFormMode, trainingType } = useAppSelector(
        trainingModalAndExercisesFormSelector,
    );
    const dispatch = useAppDispatch();

    const { data } = useGetTrainingQuery();

    const form = Form.useFormInstance();

    const disabledDate: DatePickerProps['disabledDate'] = (current) =>
        exercisesFormMode !== EDIT && current && current < moment().endOf('day');

    const dateRender: DatePickerProps['dateRender'] = (current) => {
        const { iso } = formatExerciseDate(current);

        const isExercises = data?.some(({ date }) => date === iso);

        return (
            <div
                className={cx('ant-picker-cell-inner', { [styles.cellWithExercises]: isExercises })}
            >
                {current.date()}
            </div>
        );
    };

    const onChange: DatePickerProps['onChange'] = (date) => {
        if (date) {
            const exerciseDate = formatExerciseDate(date);

            dispatch(setExerciseDate(exerciseDate));

            if (exercisesFormMode !== NEW) {
                const trainingTypes = data
                    ? data
                          .filter((training) => training.date === exerciseDate.iso)
                          .map(({ name, isImplementation }) => ({ name, isImplementation }))
                    : [];

                const isTrainingTypeExist = trainingTypes.some(
                    ({ name }) => trainingType.name === name,
                );

                if (isTrainingTypeExist) {
                    form.resetFields(['name']);
                }

                dispatch(setTrainingTypes(trainingTypes));
            }

            if (exercisesFormMode === EDIT || exercisesFormMode === NEW) {
                const trainingTypes = data
                    ? data
                          .filter((training) => training.date === exerciseDate.iso)
                          .map(({ name, isImplementation }) => ({ name, isImplementation }))
                    : [];

                const isTrainingTypeExist = trainingTypes.some(
                    ({ name }) => trainingType.name === name,
                );

                if (isTrainingTypeExist) {
                    form.resetFields(['name']);
                }

                dispatch(setTrainingTypes(trainingTypes));
            }
        }
    };

    return (
        <Form.Item noStyle={true} name='date'>
            <DatePicker
                className={styles.picker}
                format={DATE_FORMATS.DMY}
                disabledDate={disabledDate}
                dateRender={dateRender}
                onChange={onChange}
                data-test-id='modal-drawer-right-date-picker'
            />
        </Form.Item>
    );
};
