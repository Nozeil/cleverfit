import { HeaderContent } from '@components/feedbacks-page/header-content';
import { PageLayout } from '@components/page-layout/page-layout';
import { HTTP_STATUS_CODES } from '@constants/index';
import { useAuth } from '@hooks/useAuth';
import type { ErrorResponse } from '@models/models';
import { useGetFeedbacksQuery } from '@services/api';
import { useEffect } from 'react';

export const FeedbacksPage = () => {
    const { data, error, isError } = useGetFeedbacksQuery();
    const { signout } = useAuth();
    let content;

    useEffect(() => {
        if (isError) {
            const e = error as ErrorResponse;
            if (e.status === HTTP_STATUS_CODES.FORBIDDEN) {
                signout();
            }
        }
    }, [error, isError, signout]);

    return <PageLayout headerContent={<HeaderContent />} />;
};
