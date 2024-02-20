import { type ReactNode } from 'react';
import { Card, Space } from 'antd';
import classNames from 'classnames/bind';

import styles from './content-layout.module.css';

interface AuthPageLayoutProps {
    children: ReactNode;
    className?: string;
    title?: ReactNode;
}

const cx = classNames.bind(styles);

const ContentLayout = ({ className, children, title }: AuthPageLayoutProps) => (
    <Space className={cx(styles.space, className)} size={0}>
        <Card className={styles.card} bordered={false} title={title}>
            {children}
        </Card>
    </Space>
);

export default ContentLayout;
