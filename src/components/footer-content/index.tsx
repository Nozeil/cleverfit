import { Button, Card, Space } from 'antd';

import { AndroidFilled, AppleFilled } from '@ant-design/icons';

import styles from './index.module.css';
import './index.css';

const actions = [
    <Button icon={<AndroidFilled key='android' />}>Android OS</Button>,
    <Button icon={<AppleFilled key='apple' />}>Apple iOS</Button>,
];

const FooterContent = () => {
    return (
        <Space className={styles.space} align='end'>
            <Button block type='link' size='large'>
                Смотреть отзывы
            </Button>
            <Card bordered={false} className={styles.card} actions={actions}>
                <Card.Meta
                    title={
                        <Button type='link' size='large'>
                            Скачать на телефон
                        </Button>
                    }
                    description={
                        <Button type='link' disabled>
                            Доступно в PRO-тарифе
                        </Button>
                    }
                />
            </Card>
        </Space>
    );
};

export default FooterContent;
