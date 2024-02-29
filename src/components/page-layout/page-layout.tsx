import { Loader } from '@components/loader/loader';
import { Layout } from 'antd';
import { type ReactNode, Suspense } from 'react';

import styles from './page-layout.module.css';

interface PageLayoutProps {
    headerContent?: ReactNode;
    mainContent?: ReactNode;
    footerContent?: ReactNode;
}

const { Header, Content, Footer } = Layout;

export const PageLayout = ({ headerContent, mainContent, footerContent }: PageLayoutProps) => (
    <Suspense fallback={<Loader />}>
        <Layout className={styles.layout}>
            <Header className={styles.header}>{headerContent}</Header>
            <Content className={styles.content}>{mainContent}</Content>
            <Footer className={styles.footer}>{footerContent}</Footer>
        </Layout>
    </Suspense>
);
