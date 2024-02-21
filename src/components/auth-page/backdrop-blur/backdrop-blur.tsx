import styles from './backdrop-blur.module.css';

interface BackdropBlurProps {
    zIndex?: number;
}

const BackdropBlur = ({ zIndex }: BackdropBlurProps) => (
    <div className={styles.blur} style={{ zIndex }} />
);

export default BackdropBlur;
