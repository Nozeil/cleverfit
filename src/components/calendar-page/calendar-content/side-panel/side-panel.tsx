import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex } from '@components/flex/flex';
import { Button, Drawer, Grid, Typography } from 'antd';
import { type ReactNode, useEffect } from 'react';

import { TrainingBadge } from '../../training-badge';
import type { PickedDate } from '../calendar-content.types';
import styles from './side-panel.module.css';

type SidePanelProps = {
    date: PickedDate;
    form: ReactNode;
    isOpen: boolean;
    trainingType: string;
    close: () => void;
};

const { useBreakpoint } = Grid;

export const SidePanel = ({ date, form, isOpen, trainingType, close }: SidePanelProps) => {
    const { xs } = useBreakpoint();

    const onClose = () => close();

    useEffect(() => {
        close();
    }, [close, xs]);

    const drawerProps: { placement: 'bottom' | 'right'; height: number } = xs
        ? { placement: 'bottom', height: 555 }
        : { placement: 'right', height: 378 };

    return (
        <Drawer
            className={styles.drawer}
            open={isOpen}
            closable={false}
            width={408}
            maskStyle={{ backgroundColor: 'transparent' }}
            onClose={onClose}
            {...drawerProps}
        >
            <Flex className={styles.contentHead} gap='gap10' align='alignCenter'>
                <PlusOutlined />
                <Typography.Title className={styles.title} level={4}>
                    Добавление упражнений
                </Typography.Title>
                <Button
                    className={styles.closeBtn}
                    type='text'
                    icon={
                        <CloseOutlined style={{ color: 'var(--character-light-secondary-45)' }} />
                    }
                    onClick={onClose}
                />
            </Flex>
            <Flex className={styles.contentBody} direction='column' gap='gap26'>
                <Flex justify='justifyBetween' align='alignCenter'>
                    <TrainingBadge className={styles.badge} text={trainingType} />
                    <Typography.Text className={styles.date}>{date.formated}</Typography.Text>
                </Flex>

                {form}
            </Flex>
        </Drawer>
    );
};
