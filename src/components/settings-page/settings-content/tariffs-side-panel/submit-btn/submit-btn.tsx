import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectIsSubmitDisabledTariffsSidePanel } from '@redux/slices/tariffs-side-panel';
import { Button } from 'antd';

import { FORM_NAME } from '../tariffs-side-panel.constants';
import styles from './submit-btn.module.css';

export const SubmitBtn = () => {
    const isSubmitDisabled = useAppSelector(selectIsSubmitDisabledTariffsSidePanel);

    return (
        <Button
            className={styles.btn}
            disabled={isSubmitDisabled}
            type='primary'
            size='large'
            block
            htmlType='submit'
            form={FORM_NAME}
        >
            Выбрать и оплатить
        </Button>
    );
};
