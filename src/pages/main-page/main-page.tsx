import { FooterContent } from '@components/footer-content/footer-content';
import { HeaderContent } from '@components/header-content/header-content';
import { Loader } from '@components/loader/loader';
import { MainPageContent } from '@components/main-page-content/main-page-content';
import { Layout } from 'antd';
import { Suspense } from 'react';

import styles from './main-page.module.css';

const { Header, Content, Footer } = Layout;

export const MainPage = () => (
    <Suspense fallback={<Loader />}>
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
    </Suspense>
);
