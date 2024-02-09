import { Col, Card, Button } from 'antd';
import type { ActionCardProps } from './index.types';

import styles from '../../index.module.css';

const ActionCard = ({ title, buttonIcon, buttonContent }: ActionCardProps) => {
    return (
        <Col span={8}>
            <Card className={styles.card} title={title} bordered={false}>
                <Button block type='link' icon={buttonIcon}>
                    {buttonContent}
                </Button>
            </Card>
        </Col>
    );
};

export default ActionCard;
