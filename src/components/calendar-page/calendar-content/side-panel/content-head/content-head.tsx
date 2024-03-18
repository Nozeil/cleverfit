import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex } from '@components/flex/flex';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingModalFormModeSelector } from '@redux/slices/training-modal/training-modal';
import { Typography } from 'antd';
import { type ReactNode } from 'react';

import styles from './content-head.module.css';

type ContentHeadProps = {
    children: ReactNode;
};

export const ContentHead = ({ children }: ContentHeadProps) => {
    const formMode = useAppSelector(trainingModalFormModeSelector);
    const content: { title: string; icon: ReactNode } = {
        title: 'Просмотр упражнений',
        icon: null,
    };

    if (formMode === 'new') {
        content.title = 'Добавление упражнений';
        content.icon = <PlusOutlined />;
    } else if (formMode === 'edit') {
        content.title = 'Редактирование';
        content.icon = <EditOutlined />;
    }

    return (
        <Flex className={styles.contentHead} gap='gap10' align='alignCenter'>
            {content.icon}
            <Typography.Title className={styles.title} level={4}>
                {content.title}
            </Typography.Title>
            {children}
        </Flex>
    );
};
