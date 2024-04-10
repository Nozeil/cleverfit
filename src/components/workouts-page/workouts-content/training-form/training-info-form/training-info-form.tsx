import { useEffect, useMemo, useState } from 'react';
import { Flex } from '@components/flex/flex';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingModalAndExercisesFormSelector } from '@redux/slices/training-modal-and-exercises-form/training-modal-and-exercises-form';
import { useGetTrainingQuery } from '@services/endpoints/training';
import { type CheckboxProps, Checkbox, Form, FormInstance, Select } from 'antd';
import moment from 'moment';

import { TrainingInfoFormValues } from '../../workouts-content.types';

import { TrainingDatePicker } from './training-date-picker';
import { createPeriodSelectOptions } from './training-info-form.utils';
import { TrainingNameSelect } from './training-name-select';

import styles from './training-info-form.module.css';

type TrainingInfoFormProps = {
    form: FormInstance<TrainingInfoFormValues>;
};

const options = createPeriodSelectOptions();

export const TrainingInfoForm = ({ form }: TrainingInfoFormProps) => {
    const { date, exercisesFormMode, trainingType } = useAppSelector(
        trainingModalAndExercisesFormSelector,
    );
    const { data: trainings } = useGetTrainingQuery();

    const [isPeriod, setIsPeriod] = useState(false);

    const pickedTraining = useMemo(
        () => trainings?.find((training) => training._id === trainingType.id),
        [trainingType.id, trainings],
    );

    useEffect(() => {
        if (exercisesFormMode === 'edit' && pickedTraining) {
            const { repeat, period } = pickedTraining.parameters;

            form.setFieldsValue({
                name: trainingType.name,
                date: moment(date.iso),
                repeat,
                period: period || undefined,
            });

            setIsPeriod(repeat);
        }
    }, [date.iso, exercisesFormMode, form, pickedTraining, trainingType.name]);

    const onChange: CheckboxProps['onChange'] = (e) => setIsPeriod(e.target.checked);

    return (
        <Form className={styles.form} form={form} autoComplete='off' name='training-info-form'>
            <Flex direction='column' gap={{ xs: 'gap16', sm: 'gap24' }}>
                {exercisesFormMode !== 'joint' && <TrainingNameSelect />}

                <Flex gap={{ xs: 'gap24', sm: 'gap32' }}>
                    <Flex className={styles.column} direction='column' gap='gap8'>
                        <TrainingDatePicker />
                        {isPeriod && (
                            <Form.Item noStyle={true} name='period'>
                                <Select
                                    className={styles.periodSelect}
                                    placeholder='Периодичность'
                                    options={options}
                                />
                            </Form.Item>
                        )}
                    </Flex>

                    <Flex className={styles.column} direction='column'>
                        <Form.Item noStyle={true} name='repeat' valuePropName='checked'>
                            <Checkbox className={styles.checkbox} onChange={onChange}>
                                С периодичностью
                            </Checkbox>
                        </Form.Item>
                    </Flex>
                </Flex>
            </Flex>
        </Form>
    );
};
