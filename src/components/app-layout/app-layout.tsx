import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import 'antd/dist/antd.css';
import styles from './app-layout.module.css';

const siderWidth = 208;
const { Sider } = Layout;

export const AppLayout = () => {
    return (
        <Layout className={styles.layout}>
            <Sider className={styles.sider} width={siderWidth}>
                Sider
            </Sider>
            <Outlet />
        </Layout>
    );
};
