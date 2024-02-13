import { Layout } from 'antd';
import HeaderContent from '@components/header-content/header-content';
import MainPageContent from '@components/main-page-content/main-page-content';
import FooterContent from '@components/footer-content/footer-content';

import styles from './main-page.module.css';

const { Header, Content, Footer } = Layout;

export const MainPage = () => (
    <Layout className={styles.layout}>
        <Header className={styles.header}>
            <HeaderContent />
        </Header>
        <Content className={styles.content}>
            <MainPageContent />
        </Content>
        <Footer className={styles.footer}>
            <FooterContent />
        </Footer>
    </Layout>
);
