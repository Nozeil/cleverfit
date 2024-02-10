import { Breadcrumb, Button, Space, Typography } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import styles from './index.module.css';
import './index.css';

const HeaderContent = () => {
    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item>Главная</Breadcrumb.Item>
            </Breadcrumb>
            <Space className={styles.space} align='start'>
                <Typography.Title className={styles.title}>
                    {`Приветствуем тебя в\u00a0CleverFit\u00a0— приложении, 
                    которое поможет тебе добиться своей мечты!`}
                </Typography.Title>
                <Button icon={<SettingOutlined style={{ color: 'black' }} />}>Настройки</Button>
            </Space>
        </>
    );
};

export default HeaderContent;
