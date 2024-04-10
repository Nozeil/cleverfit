import { CheckCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { Flex } from '@components/flex/flex';
import { Tooltip, Typography } from 'antd';

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
                <Tooltip
                    arrowPointAtCenter={true}
                    title='повторный запрос будет доступнен через 2 недели'
                    color='var(--neutral-gray-13)'
                    overlayClassName={styles.tooltipOverlay}
                    overlayStyle={{ maxWidth: 147 }}
                    placement='topRight'
                >
                    <ExclamationCircleOutlined
                        style={{ fontSize: iconSize, color: 'var(--character-light-secondary-45)' }}
                    />
                </Tooltip>
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
