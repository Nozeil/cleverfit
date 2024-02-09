import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import styles from './index.module.css';

interface TriggerProps {
    collapsed: boolean;
    onClick: () => void;
}

const Trigger = ({ collapsed, onClick }: TriggerProps) => {
    const Icon = collapsed ? MenuUnfoldOutlined : MenuFoldOutlined;
    return (
        <div className={styles.shadowBox}>
            <div className={styles.polygon}>
                <Icon
                    className={`trigger ${styles.trigger}`}
                    onClick={onClick}
                    style={{ color: 'var(--neutral-gray-7)' }}
                />
            </div>
        </div>
    );
};

export default Trigger;
