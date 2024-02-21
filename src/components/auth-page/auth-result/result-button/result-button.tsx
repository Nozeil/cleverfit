import { type ReactNode } from 'react';
import { Button } from 'antd';
import styles from './result-button.module.css';

interface ResultButtonProps {
    onClick: () => void;
    children: ReactNode;
    block?: boolean;
}

const ResultButton = ({ onClick, children, block }: ResultButtonProps) => {
    return (
        <Button className={styles.btn} block={block} type='primary' size='large' onClick={onClick}>
            {children}
        </Button>
    );
};

export default ResultButton;
