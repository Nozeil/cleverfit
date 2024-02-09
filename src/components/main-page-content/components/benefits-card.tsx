import { Card, Typography } from 'antd';

import styles from '../index.module.css';

const BenefitsCard = () => {
    return (
        <Card className={styles.card} bordered={false}>
            <Typography.Text>
                {`С CleverFit ты сможешь:
                — планировать свои тренировки на календаре, выбирая тип и уровень нагрузки; 
                — отслеживать свои достижения в разделе статистики, сравнивая свои результаты
                с нормами и рекордами; 
                — создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы
                о тренировках; 
                — выполнять расписанные тренировки для разных частей тела, следуя подробным инструкциям и советам профессиональных тренеров.`}
            </Typography.Text>
        </Card>
    );
};

export default BenefitsCard;
