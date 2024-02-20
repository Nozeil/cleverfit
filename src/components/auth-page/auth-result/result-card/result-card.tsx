import ContentLayout from '@components/auth-page/content-layout/content-layout';
import { Space, Typography, Button } from 'antd';
import { type ReactNode } from 'react';

import styles from './result-card.module.css';

interface ResultCardProps {
    icon: ReactNode;
    title: string;
    text: string;
    btnText: string;
    onClick: () => void;
}

const ResultCard = ({ icon, title, text, btnText, onClick }: ResultCardProps) => (
    <ContentLayout>
        <Space className={styles.space} direction='vertical' size='large' align='center'>
            {icon}
            <div>
                <Typography.Title className={styles.title} level={3}>
                    {title}
                </Typography.Title>
                <Typography.Text className={styles.text} type='secondary'>{text}</Typography.Text>
            </div>
            <Button className={styles.btn} block type='primary' size='large' onClick={onClick}>
                {btnText}
            </Button>
        </Space>
    </ContentLayout>
);

export default ResultCard;
