import { CheckCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { Flex } from '@components/flex/flex';
import { INVITES_STATUS } from '@constants/index';
import { Tooltip, Typography } from 'antd';

import type { Content, TrainingStatusProps } from './training-status-box.types';

import styles from './training-status-box.module.css';

const iconSize = 16;

const { ACCEPTED, REJECTED, PENDING } = INVITES_STATUS;

export const TrainingStatusBox = ({ status }: TrainingStatusProps) => {
    let content: Content = { text: null, icon: null };

    if (status === ACCEPTED) {
        content = {
            text: 'тренировка одобрена',
            icon: (
                <CheckCircleFilled
                    style={{ fontSize: iconSize, color: 'var(--character-light-success)' }}
                />
            ),
        };
    } else if (status === REJECTED) {
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
    } else if (status === PENDING) {
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
