import { HeaderSettingsRow } from '@components/header-settings-row/header-settings-row';
import { Breadcrumb, Typography } from 'antd';

import styles from './header-content.module.css';

export const HeaderContent = () => (
    <>
        <Breadcrumb className={styles.breadcrumb}>
            <Breadcrumb.Item>Главная</Breadcrumb.Item>
        </Breadcrumb>
        <HeaderSettingsRow>
            <Typography.Title className={styles.title}>
                {`Приветствуем тебя в\u00a0CleverFit\u00a0— приложении, 
                    которое поможет тебе добиться своей мечты!`}
            </Typography.Title>
        </HeaderSettingsRow>
    </>
);
