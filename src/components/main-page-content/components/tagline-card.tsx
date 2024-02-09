import { Card, Typography } from 'antd';

import styles from '../index.module.css';

const TaglineCard = () => {
    return (
        <Card className={styles.card} bordered={false}>
            <Typography.Text>
                {`CleverFit — это не просто приложение, а твой личный помощник 
                в мире фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!`}
            </Typography.Text>
        </Card>
    );
};

export default TaglineCard;
