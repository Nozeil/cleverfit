import { CheckCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { Flex } from '@components/flex/flex';
import { Typography } from 'antd';

import type { Content, TrainingStatusProps } from './training-status-box.types';

import styles from './training-status-box.module.css';

const iconSize = 16;

export const TrainingStatusBox = ({ status }: TrainingStatusProps) => {
    let content: Content = { text: null, icon: null };

    if (status === 'accepted') {
        content = {
            text: 'тренировка одобрена',
            icon: (
                <CheckCircleFilled
                    style={{ fontSize: iconSize, color: 'var(--character-light-success)' }}
                />
            ),
        };
    } else if (status === 'rejected') {
        content = {
            text: 'тренировка отклонена',
            icon: (
                <ExclamationCircleOutlined
                    style={{ fontSize: iconSize, color: 'var(--character-light-secondary-45)' }}
                />
            ),
        };
    } else if (status === 'pending') {
        content = { text: 'ожидает подтверждения', icon: null };
    }

    const { text, icon } = content;

    return (
        <Flex justify='justifyCenter' align='alignCenter' gap='gap8'>
            {text && <Typography.Text className={styles.status}>{text}</Typography.Text>}
            {icon}
        </Flex>
    );
};
