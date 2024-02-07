import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Logo } from './components';

import styles from './app-layout.module.css';

const siderWidth = 208;
const { Sider } = Layout;

export const AppLayout = () => {
    return (
        <Layout className={styles.layout}>
            <Sider className={styles.sider} width={siderWidth} theme='light'>
                <Logo />
                Sider
            </Sider>
            <Outlet />
        </Layout>
    );
};
