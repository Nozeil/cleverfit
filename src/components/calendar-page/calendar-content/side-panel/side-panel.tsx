import { CloseOutlined } from '@ant-design/icons';
import { Flex } from '@components/flex/flex';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { isCalendarSidePanelOpenSelector } from '@redux/slices/calendar-side-panel';
import { trainingModalSelector } from '@redux/slices/training-modal/training-modal';
import { Button, Drawer, Grid, Typography } from 'antd';
import { type ReactNode, useEffect } from 'react';

import { TrainingBadge } from '../../training-badge';
import { useSidePanelContent } from './hooks/use-side-panel-content';
import styles from './side-panel.module.css';

type SidePanelProps = {
    form: ReactNode;
    close: () => void;
};

const { useBreakpoint } = Grid;

export const SidePanel = ({ form, close }: SidePanelProps) => {
    const isCalendarSidePanelOpen = useAppSelector(isCalendarSidePanelOpenSelector);
    const { trainingType, date } = useAppSelector(trainingModalSelector);
    const { xs } = useBreakpoint();
    const content = useSidePanelContent();

    useEffect(() => {
        close();
    }, [close, xs]);

    const drawerProps: { placement: 'bottom' | 'right'; height: number } = xs
        ? { placement: 'bottom', height: 555 }
        : { placement: 'right', height: 378 };

    return (
        <Drawer
            className={styles.drawer}
            open={isCalendarSidePanelOpen}
            closable={false}
            width={408}
            maskStyle={{ backgroundColor: 'transparent' }}
            onClose={close}
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
                    onClick={close}
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
