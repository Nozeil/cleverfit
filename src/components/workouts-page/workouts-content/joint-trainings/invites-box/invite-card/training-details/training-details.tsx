import { useMemo, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Flex } from '@components/flex/flex';
import { TrainingBadge } from '@components/training-badge';
import { DATE_FORMATS } from '@constants/index';
import { Invite } from '@models/models';
import { Button, Card, Typography } from 'antd';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { Exercise } from './exercise';

import styles from './training-details.module.css';

type TrainingDetailsProps = Pick<Invite['training'], 'date' | 'name' | 'exercises'>;

export const TrainingDetails = ({ date, exercises, name }: TrainingDetailsProps) => {
    const [isTrainingDetails, setIsTrainingDetails] = useState(false);

    const humanizedDaysFirstLetterUpperCase = useMemo(() => {
        const days = moment(date)
            .set({ hours: 0 })
            .diff(moment({ hours: 0 }), 'days');
        const humanizedDays = moment.duration(days, 'days').humanize(true);

        return humanizedDays[0].toUpperCase() + humanizedDays.slice(1);
    }, [date]);

    const onShowTrainingDetails = () => setIsTrainingDetails((prevDetails) => !prevDetails);

    const onCloseDetails = () => setIsTrainingDetails(false);

    return (
        <Flex className={styles.details}>
            <Button className={styles.linkBtn} type='link' onClick={onShowTrainingDetails}>
                Посмотреть детали тренировки
            </Button>
            {isTrainingDetails && (
                <Card
                    className={styles.card}
                    title={
                        <Flex justify='justifyBetween'>
                            <TrainingBadge text={name} />
                            <Button
                                className={styles.btn}
                                type='text'
                                icon={<CloseOutlined />}
                                onClick={onCloseDetails}
                            />
                        </Flex>
                    }
                    data-test-id='joint-training-review-card'
                >
                    <Flex direction='column'>
                        <Flex className={styles.dates} justify='justifyBetween' align='alignCenter'>
                            <Typography.Paragraph className={styles.humanizedDate}>
                                {humanizedDaysFirstLetterUpperCase}
                            </Typography.Paragraph>
                            <Typography.Text className={styles.date}>
                                {moment(date).format(DATE_FORMATS.DMY)}
                            </Typography.Text>
                        </Flex>
                    </Flex>

                    {exercises.map(({ name: exerciseName, approaches, weight, replays }) => (
                        <Exercise
                            key={uuidv4()}
                            name={exerciseName}
                            approaches={approaches}
                            weight={weight}
                            replays={replays}
                        />
                    ))}
                </Card>
            )}
        </Flex>
    );
};
