import { Button } from 'antd';
import { type ReactNode } from 'react';

import styles from './result-button.module.css';

interface ResultButtonProps {
    onClick: () => void;
    children: ReactNode;
    testId: string;
    block?: boolean;
}

export const ResultButton = ({ onClick, children, block, testId }: ResultButtonProps) => {
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
