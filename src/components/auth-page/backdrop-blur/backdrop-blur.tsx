import styles from './backdrop-blur.module.css';

type BackdropBlurProps = {
    zIndex?: number;
};

export const BackdropBlur = ({ zIndex }: BackdropBlurProps) => (
    <div className={styles.blur} style={{ zIndex }} />
);
