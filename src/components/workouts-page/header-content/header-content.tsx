import { Fragment } from 'react';
import { HeaderSettingsRow } from '@components/header-settings-row/header-settings-row';
import { Breadcrumb } from 'antd';

import styles from './header-content.module.css';

export const HeaderContent = () => (
    <Fragment>
        <Breadcrumb>
            <Breadcrumb.Item>Тренировки</Breadcrumb.Item>
        </Breadcrumb>
        <HeaderSettingsRow rowClassName={styles.row} />
    </Fragment>
);
