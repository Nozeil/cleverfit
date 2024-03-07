import { SettingOutlined } from '@ant-design/icons';
import { Button, Row } from 'antd';
import { ReactNode } from 'react';

import styles from './header-settings-row.module.css';

type HeaderSettingsRowProps = {
    children?: ReactNode;
};

export const HeaderSettingsRow = ({ children }: HeaderSettingsRowProps) => {
    const justify = children ? 'space-between' : 'end';

    return (
        <Row className={styles.row} justify={justify} align='top' wrap={false}>
            {children}

            <Button
                className={styles.btn}
                type='text'
                icon={<SettingOutlined className={styles.btnIcon} />}
            >
                Настройки
            </Button>
        </Row>
    );
};
