import Lottie from 'lottie-react';
import animationData from '@lotties/loader.json';
import { BackdropBlur } from '@components/auth-page/backdrop-blur/backdrop-blur';

import styles from './loader.module.css';

export const Loader = () => (
    <>
        <BackdropBlur zIndex={10} />
        <Lottie className={styles.loader} animationData={animationData} data-test-id='loader' />
    </>
);
