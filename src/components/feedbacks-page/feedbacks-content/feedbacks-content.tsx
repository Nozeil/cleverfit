import { ModalWithResult500 } from '@components/modal-with-result-500';
import { HTTP_STATUS_CODES } from '@constants/index';
import { ROUTES } from '@constants/routes';
import { useAuth } from '@hooks/useAuth';
import { useGetFeedbacksQuery } from '@services/api';
import { List } from 'antd';
import { useEffect, useState } from 'react';
import { ErrorResponse, useNavigate } from 'react-router-dom';

import src from '/png/error-image.png';

import { EmptyFeedbacks } from '../empty-feedbacks/empty-feedbacks';
import { Feedback } from '../feedback/feedback';
import styles from './feedback-content.module.css';
import { ListFooter } from './list-footer';

const mockData = [
    {
        id: 0,
        fullName: 'Вероника Киверова',
        imageSrc: null,
        message:
            'Я очень довольна этим приложением! Оно помогает мне следить за своим здоровьем и физической формой, предлагая разнообразные упражнения и питание. Я люблю, что приложение адаптируется к моему уровню и целям, и дает мне полезные советы и обратную связь. Я рекомендую это приложение всем, кто хочет улучшить свою жизнь!',
        rating: 5,
        createdAt: '2023-10-17T05:16:45.575Z',
    },
    {
        id: 1,
        fullName: 'Иван Петров',
        imageSrc: src,
        message:
            'Это приложение - отличный помощник для тех, кто занимается спортом. Оно показывает мне, как правильно выполнять упражнения, сколько калорий я сжигаю, и какой прогресс я достиг. Оно также мотивирует меня не сдаваться и достигать новых рекордов. Я уверен, что это приложение поможет мне достичь своей мечты - стать чемпионом!',
        rating: 5,
        createdAt: '2023-10-25T05:16:45.575Z',
    },
    {
        id: 2,
        fullName: 'Елена Ковалева',
        imageSrc: src,
        message:
            'Я не могу представить свою жизнь без этого приложения! Оно стало моим лучшим другом и наставником в области фитнеса. Оно учит меня, как заботиться о своем теле и душе, предоставляя мне интересные и эффективные упражнения, здоровое меню и релаксацию. Я чувствую себя счастливой и красивой благодаря этому приложению!',
        rating: 3,
        createdAt: '2023-12-05T05:16:45.575Z',
    },
    {
        id: 3,
        fullName: 'Елена Ковалева',
        imageSrc: src,
        message: 'Классное приложение!',
        rating: 4,
        createdAt: '2024-01-17T05:16:45.575Z',
    },
];

export const FeedbacksContent = () => {
    const { data, error, isError } = useGetFeedbacksQuery();
    const [isModalOpen, setModalOpen] = useState(false);
    const { signout } = useAuth();
    const navigate = useNavigate();
    let content;

    useEffect(() => {
        if (isError) {
            const e = error as ErrorResponse;
            e.status === HTTP_STATUS_CODES.FORBIDDEN ? signout() : setModalOpen(true);
        }
    }, [error, isError, signout]);

    if (isError) {
        content = null;
    } else {
        content = data?.length ? (
            <List
                footer={<ListFooter />}
                className={styles.list}
                grid={{ column: 1 }}
                split={false}
                dataSource={mockData}
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
