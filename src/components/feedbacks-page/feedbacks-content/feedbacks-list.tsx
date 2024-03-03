import { HTTP_STATUS_CODES } from '@constants/index';
import { ROUTES } from '@constants/routes';
import { useAuth } from '@hooks/useAuth';
import { useGetFeedbacksQuery } from '@services/api';
import { List } from 'antd';
import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { ErrorResponse, useNavigate } from 'react-router-dom';

import { EmptyFeedbacks } from './empty-feedbacks/empty-feedbacks';
import { Feedback } from './feedback/feedback';
import styles from './feedback-content.module.css';
import { ListContainer } from './list-container';
import { ModalWithResult500 } from './modal-with-result-500';

type FeedbacksListProps = {
    empty: ReactNode;
    footer: ReactNode;
    showAll: boolean;
};

export const FeedbacksList = ({ showAll, footer, empty }: FeedbacksListProps) => {
    const { data, error, isError } = useGetFeedbacksQuery();
    const { signout } = useAuth();
    const navigate = useNavigate();

    const [isError500ModalOpen, setError500ModalOpen] = useState(false);

    let content;

    const feedbacks = useMemo(() => {
        const dataCopy = data?.slice();

        const sortedFeedbacks = dataCopy?.sort((feedback1, feedback2) =>
            feedback2.createdAt.localeCompare(feedback1.createdAt),
        );

        return showAll ? sortedFeedbacks : sortedFeedbacks?.slice(0, 4);
    }, [data, showAll]);

    useEffect(() => {
        if (isError) {
            const e = error as ErrorResponse;
            e.status === HTTP_STATUS_CODES.FORBIDDEN ? signout() : setError500ModalOpen(true);
        }
    }, [error, isError, signout]);

    if (isError) {
        content = null;
    } else {
        content = data?.length ? (
            <ListContainer showAll={showAll}>
                <List
                    className={styles.list}
                    footer={footer}
                    grid={{ column: 1 }}
                    split={false}
                    dataSource={feedbacks}
                    renderItem={({ id, rating, message, fullName, imageSrc, createdAt }) => (
                        <Feedback
                            key={id}
                            rating={rating}
                            message={message}
                            fullName={fullName}
                            imageSrc={imageSrc}
                            createdAt={createdAt}
                        />
                    )}
                />
            </ListContainer>
        ) : (
            <EmptyFeedbacks>{empty}</EmptyFeedbacks>
        );
    }

    return (
        <>
            <ModalWithResult500 open={isError500ModalOpen} onClick={() => navigate(ROUTES.MAIN)} />
            {content}
        </>
    );
};
