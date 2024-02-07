import { Image } from 'antd';
import AppLogo from '/svg/logo.svg';

import styles from './logo.module.css';

export const Logo = () => {
    return (
        <div className={styles.wrapper}>
            <Image className={styles.image} src={AppLogo} preview={false} alt='logo' />
        </div>
    );
};
