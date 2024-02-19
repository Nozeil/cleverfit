import styles from './backdrop-blur.module.css';

interface BackdropBlurProps {
    zIndex?: number;
}

const BackdropBlur = ({ zIndex }: BackdropBlurProps) => {
    return <div className={styles.blur} style={{ zIndex }} />;
};

export default BackdropBlur;
