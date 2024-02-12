import { Button, Card } from 'antd';

import { AndroidFilled, AppleFilled } from '@ant-design/icons';

import styles from './footer-content.module.css';

const actions = [
    <Button className={styles.cardActionBtn} icon={<AndroidFilled key='android' />}>
        Android OS
    </Button>,
    <Button className={styles.cardActionBtn} icon={<AppleFilled key='apple' />}>
        Apple iOS
    </Button>,
];

const FooterContent = () => (
    <div className={styles.space}>
        <Button className={styles.btnLink} type='link' size='large'>
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

export default FooterContent;
