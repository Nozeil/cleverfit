import { Divider, Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Logo } from './components/logo';
import NavMenu from './components/nav-menu';
import ExitButton from './components/exit-button';

import { SIDER_WIDTH } from './index.constants';

import styles from './index.module.css';
import './index.css';


const { Sider } = Layout;

export const AppLayout = () => {
    return (
        <Layout className={styles.layout}>
            <Sider className={styles.sider} width={SIDER_WIDTH} theme='light'>
                <Logo />
                <NavMenu />
                <Divider />
                <ExitButton />
            </Sider>
            <Outlet />
        </Layout>
    );
};
