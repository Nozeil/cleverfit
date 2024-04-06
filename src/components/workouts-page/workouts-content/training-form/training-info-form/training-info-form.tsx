import { useState } from 'react';
import { Flex } from '@components/flex/flex';
import { type CheckboxProps, Checkbox, Form, FormInstance, Select } from 'antd';

import { TrainingDatePicker } from './training-date-picker';
import { createPeriodSelectOptions } from './training-info-form.utils';
import { TrainingNameSelect } from './training-name-select';

import styles from './training-info-form.module.css';

type TrainingInfoFormProps = {
    form: FormInstance;
};

const options = createPeriodSelectOptions();

export const TrainingInfoForm = ({ form }: TrainingInfoFormProps) => {
    const [isPeriod, setIsPeriod] = useState(false);

    const onChange: CheckboxProps['onChange'] = (e) => setIsPeriod(e.target.checked);

    return (
        <Form className={styles.form} form={form} autoComplete='off' name='training-info-form'>
            <TrainingNameSelect />

            <Flex gap='gap32'>
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
                    <Checkbox className={styles.checkbox} onChange={onChange}>
                        С периодичностью
                    </Checkbox>
                </Flex>
            </Flex>
        </Form>
    );
};
