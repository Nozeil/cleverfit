import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { ModalWithResult500 } from '@components/modal-with-result-500';
import { Button, Card } from 'antd';
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
            <ModalWithResult500 open={isModalOpen} onClick={() => setModalOpen(false)} />

            <FeedbacksButton onAnyError={() => setModalOpen(true)} />

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
