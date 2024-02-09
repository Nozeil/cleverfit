import { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Logo } from './components/logo';
import NavMenu from './components/nav-menu';
import Trigger from './components/trigger';

import { SIDER_SIZES } from './index.constants';

import styles from './index.module.css';
import './index.css';

export const AppLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    const onTrigger = () => setCollapsed((prevCollapsed) => !prevCollapsed);

    return (
        <Layout className={styles.layout}>
            <Layout.Sider
                className={styles.sider}
                collapsed={collapsed}
                collapsedWidth={SIDER_SIZES.COLLAPSED_WIDTH}
                collapsible
                trigger={null}
                width={SIDER_SIZES.WIDTH}
                theme='light'
            >
                <Logo cropped={collapsed} />
                <Trigger collapsed={collapsed} onClick={onTrigger} />
                <NavMenu />
            </Layout.Sider>
            <Outlet />
        </Layout>
    );
};
