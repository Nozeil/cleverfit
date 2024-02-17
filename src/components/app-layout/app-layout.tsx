import { Outlet } from 'react-router-dom';

import styles from './app-layout.module.css';

const AppLayout = () => (
    <div className={styles.layout}>
        <Outlet />
    </div>
);

export default AppLayout;
