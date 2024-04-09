import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { exercisesFormModeSelector } from '@redux/slices/training-modal-and-exercises-form/training-modal-and-exercises-form';
import { Checkbox, Form, Input } from 'antd';

import styles from './exercise.module.css';

type NameInputProps = {
    id: string | number;
    index: number;
    initialValue?: string;
};

export const NameInput = ({ id, initialValue, index }: NameInputProps) => {
    const formMode = useAppSelector(exercisesFormModeSelector);

    const addonAfter =
        formMode === 'new' ? null : (
            <Form.Item name={[id, 'shouldDelete']} noStyle={true} valuePropName='checked'>
                <Checkbox data-test-id={`modal-drawer-right-checkbox-exercise${index}`} />
            </Form.Item>
        );

    return (
        <Form.Item name={[id, 'name']} initialValue={initialValue} noStyle={true}>
            <Input
                className={styles.input}
                placeholder='Упражнение'
                addonAfter={addonAfter}
                data-test-id={`modal-drawer-right-input-exercise${index}`}
            />
        </Form.Item>
    );
};