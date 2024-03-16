import { CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex } from '@components/flex/flex';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { isCalendarSidePanelOpenSelector } from '@redux/slices/calendar-side-panel';
import { trainingModalSelector } from '@redux/slices/training-modal/training-modal';
import { Button, Drawer, Grid, Typography } from 'antd';
import { type ReactNode, useEffect } from 'react';

import { TrainingBadge } from '../../training-badge';
import type { PickedDate } from '../calendar-content.types';
import styles from './side-panel.module.css';

type SidePanelProps = {
    date: PickedDate;
    form: ReactNode;
    close: () => void;
};

const { useBreakpoint } = Grid;

export const SidePanel = ({ date, form, close }: SidePanelProps) => {
    const isCalendarSidePanelOpen = useAppSelector(isCalendarSidePanelOpenSelector);
    const { trainingType, exercisesFormMode } = useAppSelector(trainingModalSelector);
    const { xs } = useBreakpoint();
    const content: { title: string; icon: ReactNode } = {
        title: 'Просмотр упражнений',
        icon: null,
    };

    const onClose = () => close();

    useEffect(() => {
        close();
    }, [close, xs]);

    const drawerProps: { placement: 'bottom' | 'right'; height: number } = xs
        ? { placement: 'bottom', height: 555 }
        : { placement: 'right', height: 378 };

    if (exercisesFormMode === 'new') {
        content.title = 'Добавление упражнений';
        content.icon = <PlusOutlined />;
    } else if (exercisesFormMode === 'edit') {
        content.title = 'Редактирование';
        content.icon = <EditOutlined />;
    }

    return (
        <Drawer
            className={styles.drawer}
            open={isCalendarSidePanelOpen}
            closable={false}
            width={408}
            maskStyle={{ backgroundColor: 'transparent' }}
            onClose={onClose}
            data-test-id='modal-drawer-right'
            {...drawerProps}
        >
            <Flex className={styles.contentHead} gap='gap10' align='alignCenter'>
                {content.icon}
                <Typography.Title className={styles.title} level={4}>
                    {content.title}
                </Typography.Title>
                <Button
                    className={styles.closeBtn}
                    type='text'
                    icon={
                        <CloseOutlined style={{ color: 'var(--character-light-secondary-45)' }} />
                    }
                    data-test-id='modal-drawer-right-button-close'
                    onClick={onClose}
                />
            </Flex>
            <Flex className={styles.contentBody} direction='column' gap='gap24'>
                <Flex
                    className={styles.contentBodyHeader}
                    justify='justifyBetween'
                    align='alignCenter'
                >
                    <TrainingBadge className={styles.badge} text={trainingType.name} />
                    <Typography.Text className={styles.date}>{date.formated}</Typography.Text>
                </Flex>

                {form}
            </Flex>
        </Drawer>
    );
};
