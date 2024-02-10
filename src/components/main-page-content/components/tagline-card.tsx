import { Card, Typography } from 'antd';

const TaglineCard = () => {
    return (
        <Card bordered={false}>
            <Typography.Text>
                {`CleverFit\u00a0— это не\u00a0просто приложение, а\u00a0твой личный помощник в\u00a0мире фитнеса. Не\u00a0откладывай на\u00a0завтра\u00a0— начни тренироваться уже сегодня!`}
            </Typography.Text>
        </Card>
    );
};

export default TaglineCard;
