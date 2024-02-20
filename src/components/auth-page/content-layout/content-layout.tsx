import type { ReactNode } from 'react';
import { Card, Space } from 'antd';

import styles from './content-layout.module.css';

interface AuthPageLayoutProps {
    children: ReactNode;
    title: ReactNode;
}

const ContentLayout = ({ children, title }: AuthPageLayoutProps) => (
    <Space className={styles.space} size={0}>
        <Card className={styles.card} bordered={false} title={title}>
            {children}
        </Card>
    </Space>
);

export default ContentLayout;
