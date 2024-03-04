import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { ROUTES } from '@constants/routes';
import { Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    const onClick = () => navigate(ROUTES.FEEDBACKS);

    return (
        <div className={styles.space}>
            <Button
                className={styles.btn}
                onClick={onClick}
                type='link'
                size='large'
                data-test-id='see-reviews'
            >
                Смотреть отзывы
            </Button>

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
