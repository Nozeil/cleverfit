import { Layout } from 'antd';
import AuthPageContent from '@components/auth-page-content/auth-page-content';
import BackdropBlur from '@components/backdrop-blur/backdrop-blur';
import Loader from '@components/loader/loader';

import styles from './auth.module.css';

const { Content } = Layout;

const AuthPage = () => {
    const isLoading = false;
    const loader = isLoading ? <Loader /> : <BackdropBlur />;

    return (
        <Layout className={styles.layout}>
            {loader}
            <Content className={styles.content}>
                <AuthPageContent />
            </Content>
        </Layout>
    );
};

export default AuthPage;
