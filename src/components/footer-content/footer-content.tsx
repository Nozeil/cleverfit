import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { CustomModal } from '@components/custom-modal';
import { ResultButton } from '@components/result-button/result-button';
import { Button, Card, Result } from 'antd';
import { useState } from 'react';

import { FeedbacksButton } from './feedbacks-btn/feedbacks-btn';
import styles from './footer-content.module.css';

const actions = [
    <Button type='text' className={styles.cardActionBtn} icon={<AndroidFilled key='android' />}>
        Android OS
    </Button>,
    <Button type='text' className={styles.cardActionBtn} icon={<AppleFilled key='apple' />}>
        Apple iOS
    </Button>,
];

export const FooterContent = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <div className={styles.space}>
            <FeedbacksButton onAnyError={() => setModalOpen(true)} />
            <CustomModal open={isModalOpen}>
                <Result
                    status='500'
                    title='Что-то пошло не так'
                    subTitle='Произошла ошибка, &nbsp;попробуйте ещё раз.'
                    extra={
                        <ResultButton onClick={() => setModalOpen(false)} testId=''>
                            Назад
                        </ResultButton>
                    }
                />
            </CustomModal>

            <Card bordered={false} className={styles.card} actions={actions}>
                <Card.Meta
                    className={styles.cardMeta}
                    title={
                        <Button className={styles.cardBtnLink} type='link' size='large'>
                            Скачать на телефон
                        </Button>
                    }
                    description={
                        <Button className={styles.cardBtnLink} type='link' disabled>
                            Доступно в PRO-тарифе
                        </Button>
                    }
                />
            </Card>
        </div>
    );
};
