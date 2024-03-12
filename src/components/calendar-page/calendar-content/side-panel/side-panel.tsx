import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex } from '@components/flex/flex';
import { Button, Drawer, Grid, Typography } from 'antd';
import { useEffect } from 'react';

import type { PickedDate, PickedTraining } from '../calendar-content.types';
import { useTrainingBadge } from '../hooks/use-training-badge';
import { ExerciseForm } from './exercise-form/exercise-form';
import styles from './side-panel.module.css';

type SidePanelProps = {
    date: PickedDate;
    isOpen: boolean;
    trainingType: PickedTraining;
    close: () => void;
};

const { useBreakpoint } = Grid;

export const SidePanel = ({ date, isOpen, trainingType, close }: SidePanelProps) => {
    const badge = useTrainingBadge({
        type: trainingType.key,
        text: trainingType.name,
        className: styles.badge,
    });

    const { xs } = useBreakpoint();

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
            onClose={close}
            {...drawerProps}
        >
            <Flex className={styles.head} gap='gap10' align='alignCenter'>
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
                    onClick={close}
                />
            </Flex>

            <Flex direction='column' gap='gap4'>
                <Flex justify='justifyBetween' align='alignCenter'>
                    <div className={styles.badge}>{badge}</div>
                    <Typography.Text className={styles.date}>{date.formated}</Typography.Text>
                </Flex>

                <ExerciseForm />
            </Flex>
        </Drawer>
    );
};
