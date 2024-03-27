import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { isSidePanelOpenSelector } from '@redux/slices/side-panel';
import { Drawer, Grid } from 'antd';
import classNames from 'classnames/bind';
import { type ReactNode, useEffect } from 'react';

import styles from './side-panel.module.css';

type SidePanelProps = {
    children: ReactNode;
    onClose: () => void;
    className?: string;
    footer?: ReactNode;
};

const cx = classNames.bind(styles);

const { useBreakpoint } = Grid;

export const SidePanel = ({ children, onClose, footer, className }: SidePanelProps) => {
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
            className={cx(styles.drawer, className)}
            open={isOpen}
            closable={false}
            width={408}
            maskStyle={{ backgroundColor: 'transparent' }}
            data-test-id='modal-drawer-right'
            footer={footer}
            onClose={onClose}
            {...drawerProps}
        >
            {children}
        </Drawer>
    );
};
