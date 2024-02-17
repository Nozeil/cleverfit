import { Card, Space, Image, Tabs } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Logo from '/svg/logo.svg';

import styles from './auth-page-content.module.css';

const items = [
    {
        label: (
            <Link className={styles.link} to='.'>
                Вход
            </Link>
        ),
        key: '/auth',
        children: <Outlet />,
    },
    {
        label: (
            <Link className={styles.link} to='registration'>
                Регистрация
            </Link>
        ),
        key: '/auth/registration',
        children: <Outlet />,
    },
];

const AuthPageContent = () => {
    const location = useLocation();
    const defaultActiveKey = location.pathname;

    return (
        <Space className={styles.space} size={0}>
            <Card
                className={styles.card}
                bordered={false}
                title={<Image className={styles.logo} src={Logo} preview={false} alt='logo' />}
            >
                <Tabs
                    className={styles.tabs}
                    defaultActiveKey={defaultActiveKey}
                    destroyInactiveTabPane
                    centered
                    items={items}
                    size='large'
                    color='red'
                />
            </Card>
        </Space>
    );
};

export default AuthPageContent;
