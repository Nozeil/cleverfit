import { Card, Typography } from 'antd';

import styles from '../main-page-content.module.css';

export const BenefitsCard = () => (
    <Card className={styles.card} bordered={false}>
        <Typography.Text className={styles.benefitsText}>
            {`С\u00a0CleverFit ты сможешь:\u00a0
                — планировать свои тренировки на\u00a0календаре, выбирая тип и\u00a0уровень нагрузки;\u00a0
                — отслеживать свои достижения в\u00a0разделе статистики, сравнивая свои результаты с\u00a0нормами и\u00a0рекордами;\u00a0
                — создавать свой профиль, где ты\u00a0можешь загружать свои фото, видео и\u00a0отзывы о\u00a0тренировках;
                — выполнять расписанные тренировки для разных частей тела, следуя подробным инструкциям и\u00a0советам профессиональных тренеров.`}
        </Typography.Text>
    </Card>
);
