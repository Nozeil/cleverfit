import { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Logo } from './components/logo';
import NavMenu from './components/nav-menu';
import Trigger from './components/trigger';
import Sider from './components/sider';

import styles from './index.module.css';
import './index.css';

export const AppLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isBreakpoint, setIsBreakpoint] = useState(false);

    const onTrigger = () => setCollapsed((prevCollapsed) => !prevCollapsed);

    return (
        <Layout className={styles.layout}>
            <Sider collapsed={collapsed} isBreakpoint={isBreakpoint} onBreakpoint={setIsBreakpoint}>
                <Logo cropped={collapsed} isBreakpoint={isBreakpoint} />
                <Trigger collapsed={collapsed} onClick={onTrigger} />
                <NavMenu />
            </Sider>
            <Outlet />
        </Layout>
    );
};
