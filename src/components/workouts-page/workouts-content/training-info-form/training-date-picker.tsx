import { DATE_FORMATS } from '@constants/index';
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

import styles from './training-info-form.module.css';

const cx = classNames.bind(styles);

export const TrainingDatePicker = () => {
    const { exercisesFormMode, trainingType } = useAppSelector(
        trainingModalAndExercisesFormSelector,
    );
    const dispatch = useAppDispatch();

    const { data } = useGetTrainingQuery();

    const form = Form.useFormInstance();

    const disabledDate: DatePickerProps['disabledDate'] = (current) =>
        exercisesFormMode === 'new' && current && current < moment().endOf('day');

    const dateRender: DatePickerProps['dateRender'] = (current) => {
        const local = current
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toISOString(true);
        const iso = moment(local).format(DATE_FORMATS.ISO);

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
        const localISO = moment(date?.toISOString(true));
        const iso = localISO.format(DATE_FORMATS.ISO);

        dispatch(
            setExerciseDate({
                iso: localISO.format(DATE_FORMATS.ISO),
                formated: localISO.format(DATE_FORMATS.DMY),
            }),
        );

        const trainingTypes = data
            ? data
                  .filter((training) => training.date === iso)
                  .map(({ name, isImplementation }) => ({ name, isImplementation }))
            : [];

        const isTrainingTypeExist = trainingTypes.some(({ name }) => trainingType.name === name);

        if (isTrainingTypeExist) {
            form.resetFields(['name']);
        }

        dispatch(setTrainingTypes(trainingTypes));
    };

    return (
        <Form.Item noStyle={true} name='date'>
            <DatePicker
                className={styles.picker}
                format={DATE_FORMATS.DMY}
                disabledDate={disabledDate}
                dateRender={dateRender}
                onChange={onChange}
            />
        </Form.Item>
    );
};
