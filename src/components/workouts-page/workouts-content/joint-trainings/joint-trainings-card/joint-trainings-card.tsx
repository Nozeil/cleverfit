import { Flex } from '@components/flex/flex';
import { Button, Card, Typography } from 'antd';

import styles from './joint-trainings-card.module.css';

export const JointTrainingsCard = () => (
    <Card
        className={styles.card}
        actions={[
            <Flex
                direction={{ xs: 'column', sm: 'column', xl: 'row' }}
                align='alignCenter'
                gap='gap16'
            >
                <Button block={true} type='link'>
                    Случайный выбор
                </Button>
                <Button block={true} className={styles.textBtn} type='text'>
                    Выбор друга по моим видам тренировок
                </Button>
            </Flex>,
        ]}
    >
        <Flex direction='column' align='alignCenter' gap='gap32'>
            <Typography.Title className={styles.title} level={3}>
                {`Хочешь тренироваться с тем, кто разделяет твои цели и темп?
Можешь найти друга для совместных тренировок среди других пользователей.`}
            </Typography.Title>
            <Typography.Text className={styles.text}>
                Можешь воспользоваться случайным выбором или выбрать друга с похожим на твой уровень
                и вид тренировки, и мы найдем тебе идеального спортивного друга.
            </Typography.Text>
        </Flex>
    </Card>
);
