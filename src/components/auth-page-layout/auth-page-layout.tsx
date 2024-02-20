import type { ReactNode } from 'react';
import { Card, Space } from 'antd';

import styles from './auth-page-layout.module.css';

interface AuthPageLayoutProps {
    children: ReactNode;
    title: ReactNode;
}

const AuthPageContentLayout = ({ children, title }: AuthPageLayoutProps) => {
    return (
        <Space className={styles.space} size={0}>
            <Card
                className={styles.card}
                bordered={false}
                title={title}
            >
                {children}
            </Card>
        </Space>
    );
};

export default AuthPageContentLayout;
