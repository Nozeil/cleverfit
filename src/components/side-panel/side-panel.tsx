import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { isSidePanelOpenSelector } from '@redux/slices/side-panel';
import { Drawer, Grid } from 'antd';
import { type ReactNode, useEffect } from 'react';

import styles from './side-panel.module.css';

type SidePanelProps = {
    children: ReactNode;
    onClose: () => void;
};

const { useBreakpoint } = Grid;

export const SidePanel = ({ children, onClose }: SidePanelProps) => {
    const isOpen = useAppSelector(isSidePanelOpenSelector);
    const { xs } = useBreakpoint();

    useEffect(() => {
        onClose();
    }, [onClose, xs]);

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
            data-test-id='modal-drawer-right'
            {...drawerProps}
        >
            {children}
        </Drawer>
    );
};
