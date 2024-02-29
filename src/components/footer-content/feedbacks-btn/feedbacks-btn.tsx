import { HTTP_STATUS_CODES } from '@constants/index';
import { ROUTES } from '@constants/routes';
import { useAuth } from '@hooks/useAuth';
import type { ErrorResponse } from '@models/models';
import { useGetFeedbacksQuery } from '@services/api';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './feedbacks-btn.module.css';

interface FeedbacksButtonProps {
    onAnyError: () => void;
}

export const FeedbacksButton = ({ onAnyError }: FeedbacksButtonProps) => {
    const [skip, setSkip] = useState(true);
    const { error, isError, isSuccess } = useGetFeedbacksQuery(undefined, { skip });
    const navigate = useNavigate();
    const { signout } = useAuth();

    const onClick = () => setSkip(false);

    useEffect(() => {
        if (isSuccess) {
            navigate(ROUTES.FEEDBACKS);
        }

        if (isError) {
            const e = error as ErrorResponse;
            e.status === HTTP_STATUS_CODES.FORBIDDEN ? signout() : onAnyError();
        }
    }, [skip, error, signout, navigate, onAnyError, isSuccess, isError]);

    return (
        <Button className={styles.btn} onClick={onClick} type='link' size='large'>
            Смотреть отзывы
        </Button>
    );
};
