import { ModalWithResult500 } from '@components/modal-with-result-500';
import { HTTP_STATUS_CODES } from '@constants/index';
import { ROUTES } from '@constants/routes';
import { useAuth } from '@hooks/useAuth';
import { useGetFeedbacksQuery } from '@services/api';
import { useEffect, useState } from 'react';
import { ErrorResponse, useNavigate } from 'react-router-dom';

export const FeedbacksContent = () => {
    const { data, error, isError } = useGetFeedbacksQuery();
    const [isModalOpen, setModalOpen] = useState(false);
    const { signout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            const e = error as ErrorResponse;
            e.status === HTTP_STATUS_CODES.FORBIDDEN ? signout() : setModalOpen(true);
        }
    }, [error, isError, signout]);

    const content = isError ? null : <div>Feedbacks</div>;

    return (
        <>
            <ModalWithResult500 open={isModalOpen} onClick={() => navigate(ROUTES.MAIN)} />
            {content}
        </>
    );
};
