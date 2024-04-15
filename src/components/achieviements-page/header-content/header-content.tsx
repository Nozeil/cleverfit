import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { HeaderSettingsRow } from '@components/header-settings-row/header-settings-row';
import { ROUTES } from '@constants/routes';
import { Breadcrumb } from 'antd';

import styles from './header-content.module.css';

export const HeaderContent = () => (
    <Fragment>
        <Breadcrumb>
            <Breadcrumb.Item>
                <Link to={ROUTES.MAIN}>Главная</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Достижения</Breadcrumb.Item>
        </Breadcrumb>
        <HeaderSettingsRow rowClassName={styles.row} />
    </Fragment>
);
