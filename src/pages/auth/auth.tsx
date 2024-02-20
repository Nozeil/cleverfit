import { Layout } from 'antd';
import BackdropBlur from '@components/auth-page/backdrop-blur/backdrop-blur';
import Loader from '@components/loader/loader';

import styles from './auth.module.css';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const AuthPage = () => {
    const isLoading = false;
    const loader = isLoading ? <Loader /> : <BackdropBlur />;

    return (
        <Layout className={styles.layout}>
            {loader}
            <Content className={styles.content}>
                <Outlet />
            </Content>
        </Layout>
    );
};

export default AuthPage;
