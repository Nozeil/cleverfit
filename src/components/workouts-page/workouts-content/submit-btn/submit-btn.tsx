import { FORM_NAMES } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectIsTrainingFormSubmitDisabled } from '@redux/slices/training-form';
import { exercisesFormModeSelector } from '@redux/slices/training-modal-and-exercises-form/training-modal-and-exercises-form';
import { Button } from 'antd';

import styles from './submit-btn.module.css';

export const SubmitBtn = () => {
    const isSubmitDisabled = useAppSelector(selectIsTrainingFormSubmitDisabled);
    const formMode = useAppSelector(exercisesFormModeSelector);

    const text = formMode === 'joint' ? 'Отправить приглашение' : 'Сохранить';

    return (
        <Button
            className={styles.btn}
            type='primary'
            size='large'
            block={true}
            htmlType='submit'
            form={FORM_NAMES.EXERCISES_FORM}
            disabled={isSubmitDisabled}
        >
            {text}
        </Button>
    );
};
