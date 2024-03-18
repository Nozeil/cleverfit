import { Button, Card, Col } from 'antd';

import styles from './action-cards.module.css';
import type { ActionCardProps } from './action-cards.types';

export const ActionCard = ({
    title,
    buttonIcon,
    buttonContent,
    testId,
    onClick,
}: ActionCardProps) => (
    <Col className={styles.col} span={8}>
        <Card className={styles.card} title={title} bordered={false}>
            <Button
                className={styles.btn}
                block
                type='link'
                icon={buttonIcon}
                data-test-id={testId}
                onClick={onClick}
            >
                {buttonContent}
            </Button>
        </Card>
    </Col>
);
