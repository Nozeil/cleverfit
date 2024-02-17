import { Layout } from 'antd';
import AuthPageContent from '@components/auth-page-content/auth-page-content';

import styles from './auth.module.css';

const { Content } = Layout;

const AuthPage = () => (
    <Layout className={styles.layout}>
        <Content className={styles.content}>
            <AuthPageContent />
        </Content>
    </Layout>
);

export default AuthPage;
