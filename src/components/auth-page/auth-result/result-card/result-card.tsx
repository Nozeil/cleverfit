import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Space, Typography, Button } from 'antd';
import ContentLayout from '@components/auth-page/content-layout/content-layout';
import { ROUTES } from '@constants/routes';

import styles from './result-card.module.css';

interface ResultCardProps {
    icon: ReactNode;
    title: string;
    text: string;
    btnText: string;
    onClick: () => void;
}

const ResultCard = ({ icon, title, text, btnText, onClick }: ResultCardProps) => {
    const { state } = useLocation();

    if (!state?.from) {
        return <Navigate to={ROUTES.AUTH} replace />;
    }

    return (
        <ContentLayout>
            <Space className={styles.space} direction='vertical' size='large' align='center'>
                {icon}
                <div>
                    <Typography.Title className={styles.title} level={3}>
                        {title}
                    </Typography.Title>
                    <Typography.Text className={styles.text} type='secondary'>
                        {text}
                    </Typography.Text>
                </div>
                <Button className={styles.btn} block type='primary' size='large' onClick={onClick}>
                    {btnText}
                </Button>
            </Space>
        </ContentLayout>
    );
};

export default ResultCard;
