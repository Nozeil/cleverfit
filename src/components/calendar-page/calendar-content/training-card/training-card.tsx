import { CloseOutlined } from '@ant-design/icons';
import EmptyIcon from '@assets/icons/empty.svg?react';
import { Flex } from '@components/flex/flex';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { closeTrainingModal } from '@redux/slices/training-modal';
import { Button, Card, Empty, Typography } from 'antd';
import { type CSSProperties } from 'react';

import styles from './training-card.module.css';

type TrainingCardProps = {
    date: { iso: string; formated: string };
    style?: CSSProperties;
};

export const TrainingCard = ({ date, style }: TrainingCardProps) => {
    const { iso, formated } = date;
    const dispatch = useAppDispatch();

    return (
        <Card
            className={styles.card}
            bordered={false}
            style={style}
            actions={[
                <Button className={styles.actionBtn} block type='primary' size='large'>
                    Создать тренировку
                </Button>,
            ]}
        >
            <Flex className={styles.cardHead} justify='justifyBetween'>
                <Flex direction='column' gap='gap4'>
                    <Typography.Text className={styles.title}>
                        Тренировки на <span className={styles.date}>{formated}</span>
                    </Typography.Text>
                    <Typography.Text className={styles.subtitle} disabled>
                        Нет активных тренировок
                    </Typography.Text>
                </Flex>

                <Button
                    className={styles.iconBtn}
                    type='text'
                    onClick={() => dispatch(closeTrainingModal())}
                    icon={
                        <CloseOutlined
                            style={{
                                color: 'var(--character-light-title-85)',
                                fontSize: 12,
                            }}
                        />
                    }
                />
            </Flex>
            <Empty
                description=''
                image={<EmptyIcon />}
                imageStyle={{ height: 64, marginBottom: 0 }}
            />
        </Card>
    );
};
