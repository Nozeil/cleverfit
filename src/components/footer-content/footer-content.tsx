import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { Button, Card } from 'antd';

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

export const FooterContent = () => (
    <div className={styles.space}>
        <FeedbacksButton />

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
