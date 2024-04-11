import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectProfileIsSubmitDisabled, setProfileSubmit } from '@redux/slices/profile';
import { Button, Grid } from 'antd';

import styles from './submit-btn.module.css';

const { useBreakpoint } = Grid;

export const SubmitBtn = () => {
    const isSubmitDisabled = useAppSelector(selectProfileIsSubmitDisabled);
    const dispatch = useAppDispatch();

    const { xs } = useBreakpoint();

    useEffect(() => () => {
        dispatch(setProfileSubmit(true));
    }, [dispatch]);

    return (
        <Button
            className={styles.btn}
            block={xs && true}
            type='primary'
            htmlType='submit'
            disabled={isSubmitDisabled}
            data-test-id='profile-submit'
        >
            Сохранить изменения
        </Button>
    );
};
