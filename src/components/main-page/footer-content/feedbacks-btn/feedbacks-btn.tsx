import { HTTP_STATUS_CODES } from '@constants/index';
import { ROUTES } from '@constants/routes';
import { useAuth } from '@hooks/useAuth';
import type { ErrorResponse } from '@models/models';
import { useLazyGetFeedbacksQuery } from '@services/api';
import { Button } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './feedbacks-btn.module.css';

type FeedbacksButtonProps = {
    onAnyError: () => void;
};

export const FeedbacksButton = ({ onAnyError }: FeedbacksButtonProps) => {
    const [trigger, { isSuccess, isError, error }] = useLazyGetFeedbacksQuery();
    const navigate = useNavigate();
    const { signout } = useAuth();

    const onClick = () => trigger(undefined, true);

    useEffect(() => {
        if (isSuccess) {
            navigate(ROUTES.FEEDBACKS);
        }

        if (isError) {
            const e = error as ErrorResponse;
            e.status === HTTP_STATUS_CODES.FORBIDDEN ? signout() : onAnyError();
        }
    }, [error, signout, navigate, onAnyError, isSuccess, isError]);

    return (
        <Button
            className={styles.btn}
            onClick={onClick}
            type='link'
            size='large'
            data-test-id='see-reviews'
        >
            Смотреть отзывы
        </Button>
    );
};
