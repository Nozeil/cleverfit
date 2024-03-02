import { ModalWithResult500 } from '@components/modal-with-result-500';
import { HTTP_STATUS_CODES } from '@constants/index';
import { ROUTES } from '@constants/routes';
import { useAuth } from '@hooks/useAuth';
import { useGetFeedbacksQuery } from '@services/api';
import { List } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { ErrorResponse, useNavigate } from 'react-router-dom';

import { EmptyFeedbacks } from '../empty-feedbacks/empty-feedbacks';
import { Feedback } from '../feedback/feedback';
import styles from './feedback-content.module.css';
import { ListContainer } from './list-container';
import { ListFooter } from './list-footer';

export const FeedbacksContent = () => {
    const { data, error, isError } = useGetFeedbacksQuery();
    const [isModalOpen, setModalOpen] = useState(false);
    const [showAll, toggleShowAll] = useState(false);
    const { signout } = useAuth();
    const navigate = useNavigate();

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
            e.status === HTTP_STATUS_CODES.FORBIDDEN ? signout() : setModalOpen(true);
        }
    }, [error, isError, signout]);

    const expendBtnText = showAll ? 'Свернуть все отзывы' : 'Развернуть все отзывы';

    if (isError) {
        content = null;
    } else {
        content = data?.length ? (
            <ListContainer showAll={showAll}>
                <List
                    className={styles.list}
                    footer={
                        <ListFooter
                            expendBtnText={expendBtnText}
                            expendOnClick={() => toggleShowAll((prevShowAll) => !prevShowAll)}
                        />
                    }
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
            <EmptyFeedbacks />
        );
    }

    return (
        <>
            <ModalWithResult500 open={isModalOpen} onClick={() => navigate(ROUTES.MAIN)} />
            {content}
        </>
    );
};
