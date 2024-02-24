import { type ReactNode } from 'react';
import { Button } from 'antd';

import styles from './result-button.module.css';

interface ResultButtonProps {
    onClick: () => void;
    children: ReactNode;
    testId: string;
    block?: boolean;
}

const ResultButton = ({ onClick, children, block, testId }: ResultButtonProps) => {
    return (
        <Button
            className={styles.btn}
            block={block}
            type='primary'
            size='large'
            onClick={onClick}
            data-test-id={testId}
        >
            {children}
        </Button>
    );
};

export default ResultButton;
