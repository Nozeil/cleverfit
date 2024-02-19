import { Card, Space, Image, Tabs } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '@constants/routes';
import { AUTH_URLS } from './auth-page.constants';
import Logo from '/svg/logo.svg';

import styles from './auth-page-content.module.css';

const items = [
    {
        label: (
            <Link className={styles.link} to='.'>
                Вход
            </Link>
        ),
        key: AUTH_URLS.AUTH,
        children: <Outlet />,
    },
    {
        label: (
            <Link className={styles.link} to={ROUTES.REGISTRATION}>
                Регистрация
            </Link>
        ),
        key: AUTH_URLS.REGISTRATION,
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
