import { Col, Card, Button } from 'antd';
import type { ActionCardProps } from './action-cards.types';

import styles from './action-cards.module.css';

export const ActionCard = ({ title, buttonIcon, buttonContent }: ActionCardProps) => (
    <Col className={styles.col} span={8}>
        <Card className={styles.card} title={title} bordered={false}>
            <Button className={styles.btn} block type='link' icon={buttonIcon}>
                {buttonContent}
            </Button>
        </Card>
    </Col>
);
