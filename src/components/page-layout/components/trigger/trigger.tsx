import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import styles from './trigger.module.css';

type TriggerProps = {
    isBreakpoint: boolean;
    collapsed: boolean;
    onClick: () => void;
};

export const Trigger = ({ collapsed, isBreakpoint, onClick }: TriggerProps) => {
    const Icon = collapsed ? MenuUnfoldOutlined : MenuFoldOutlined;
    const testIds = { desktop: 'sider-switch', mobile: 'sider-switch-mobile' };
    const testId = isBreakpoint ? testIds.mobile : testIds.desktop;

    return (
        <div className={styles.shadowBox}>
            <div className={styles.polygon}>
                <Icon
                    data-test-id={testId}
                    className={styles.trigger}
                    onClick={onClick}
                    style={{ color: 'var(--neutral-gray-7)' }}
                />
            </div>
        </div>
    );
};
