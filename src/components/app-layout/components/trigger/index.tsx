import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import styles from './index.module.css';

interface TriggerProps {
    isBreakpoint: boolean;
    collapsed: boolean;
    onClick: () => void;
}

const Trigger = ({ collapsed, isBreakpoint, onClick }: TriggerProps) => {
    const Icon = collapsed ? MenuUnfoldOutlined : MenuFoldOutlined;
    const testIds = { desktop: 'sider-switch', mobile: 'sider-switch-mobile' };
    const testId = isBreakpoint ? testIds.mobile : testIds.desktop;

    return (
        <div className={styles.shadowBox}>
            <div className={styles.polygon}>
                <Icon
                    data-test-id={testId}
                    className={`trigger ${styles.trigger}`}
                    onClick={onClick}
                    style={{ color: 'var(--neutral-gray-7)' }}
                />
            </div>
        </div>
    );
};

export default Trigger;
