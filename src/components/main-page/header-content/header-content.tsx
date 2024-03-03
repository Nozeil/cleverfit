import { SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Space, Typography } from 'antd';

import styles from './header-content.module.css';

export const HeaderContent = () => (
    <>
        <Breadcrumb className={styles.breadcrumb}>
            <Breadcrumb.Item>Главная</Breadcrumb.Item>
        </Breadcrumb>
        <Space className={styles.space} align='start'>
            <Typography.Title className={styles.title}>
                {`Приветствуем тебя в\u00a0CleverFit\u00a0— приложении, 
                    которое поможет тебе добиться своей мечты!`}
            </Typography.Title>
            <Button
                className={styles.btn}
                type='text'
                icon={<SettingOutlined className={styles.btnIcon} />}
            >
                Настройки
            </Button>
        </Space>
    </>
);