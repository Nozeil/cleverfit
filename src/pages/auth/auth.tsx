import { BackdropBlur } from '@components/auth-page/backdrop-blur/backdrop-blur';
import { Loader } from '@components/loader/loader';
import { useIsLoading } from '@hooks/useIsLoading';
import { Layout } from 'antd';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './auth.module.css';

const { Content } = Layout;

export const AuthPage = () => {
    const isLoading = useIsLoading();

    const loaderOrBlur = isLoading ? <Loader /> : <BackdropBlur />;

    return (
        <Suspense fallback={<Loader />}>
            <Layout className={styles.layout}>
                {loaderOrBlur}
                <Content className={styles.content}>
                    <Outlet />
                </Content>
            </Layout>
        </Suspense>
    );
};
