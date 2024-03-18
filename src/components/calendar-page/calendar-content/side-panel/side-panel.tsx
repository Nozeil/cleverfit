import { CloseOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { isCalendarSidePanelOpenSelector } from '@redux/slices/calendar-side-panel';
import { Button, Drawer, Grid } from 'antd';
import { type ReactNode, useEffect } from 'react';

import { ContentBody } from './content-body/content-body';
import { ContentHead } from './content-head/content-head';
import styles from './side-panel.module.css';

type SidePanelProps = {
    form: ReactNode;
    close: () => void;
};

const { useBreakpoint } = Grid;

export const SidePanel = ({ form, close }: SidePanelProps) => {
    const isCalendarSidePanelOpen = useAppSelector(isCalendarSidePanelOpenSelector);
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
            open={isCalendarSidePanelOpen}
            closable={false}
            width={408}
            maskStyle={{ backgroundColor: 'transparent' }}
            onClose={close}
            data-test-id='modal-drawer-right'
            {...drawerProps}
        >
            <ContentHead>
                <Button
                    className={styles.closeBtn}
                    type='text'
                    icon={
                        <CloseOutlined style={{ color: 'var(--character-light-secondary-45)' }} />
                    }
                    data-test-id='modal-drawer-right-button-close'
                    onClick={close}
                />
            </ContentHead>

            <ContentBody>{form}</ContentBody>
        </Drawer>
    );
};
