import { HTTP_STATUS_CODES } from '@constants/index';
import { ROUTES } from '@constants/routes';
import { useAuth } from '@hooks/useAuth';
import type { ErrorResponse } from '@models/models';
import { useGetFeedbacksQuery } from '@services/api';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './feedbacks-btn.module.css';

export const FeedbacksButton = () => {
    const [skip, setSkip] = useState(true);
    const { error } = useGetFeedbacksQuery(undefined, { skip });
    const navigate = useNavigate();
    const { signout } = useAuth();

    const onClick = () => setSkip(false);

    useEffect(() => {
        if (error) {
            const e = error as ErrorResponse;
            if (e.status === HTTP_STATUS_CODES.FORBIDDEN) {
                signout(() => navigate(ROUTES.AUTH));
            }
        }
    }, [skip, error, signout, navigate]);

    return (
        <Button className={styles.btn} onClick={onClick} type='link' size='large'>
            Смотреть отзывы
        </Button>
    );
};
