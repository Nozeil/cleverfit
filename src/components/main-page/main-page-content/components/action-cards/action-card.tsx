import { Button,Card, Col } from 'antd';

import styles from './action-cards.module.css';
import type { ActionCardProps } from './action-cards.types';

export const ActionCard = ({ title, buttonIcon, buttonContent }: ActionCardProps) => (
    <Col className={styles.col} span={8}>
        <Card className={styles.card} title={title} bordered={false}>
            <Button className={styles.btn} block type='link' icon={buttonIcon}>
                {buttonContent}
            </Button>
        </Card>
    </Col>
);
