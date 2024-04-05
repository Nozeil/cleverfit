import { useState } from 'react';
import { Flex } from '@components/flex/flex';
import { type CheckboxProps, Checkbox, Form, FormInstance, Select } from 'antd';

import { TrainingDatePicker } from './training-date-picker';
import { TrainingNameSelect } from './training-name-select';

import styles from './training-info-form.module.css';

type TrainingInfoFormProps = {
    form: FormInstance;
};

const options = [
    {
        label: 'Через 1 день',
        value: 1,
    },
    {
        label: 'Через 2 дня',
        value: 2,
    },
    {
        label: 'Через 3 дня',
        value: 3,
    },
    {
        label: 'Через 4 дня',
        value: 4,
    },
    {
        label: 'Через 5 дней',
        value: 5,
    },
    {
        label: 'Через 6 дней',
        value: 6,
    },
    {
        label: '1 раз в неделю',
        value: 7,
    },
];

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
