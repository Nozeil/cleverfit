import { Fragment } from 'react';
import { Flex } from '@components/flex/flex';
import { Notification } from '@components/notification/notification';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { openSearch } from '@redux/slices/joint-training/joint-trainings';
import {
    closeErrorNotification,
    openErrorNotification,
} from '@redux/slices/training-list-error-notification';
import { useLazyGetUserJointTrainingListQuery } from '@services/endpoints/catalogs';
import { Button, Card, Typography } from 'antd';

import styles from './joint-trainings-card.module.css';

export const JointTrainingsCard = () => {
    const [getUserJointTrainingList] = useLazyGetUserJointTrainingListQuery();
    const dispatch = useAppDispatch();

    const onRandomSelection = async () => {
        try {
            await getUserJointTrainingList().unwrap();
            dispatch(openSearch());
        } catch {
            dispatch(openErrorNotification());
        }
    };

    const refresh = () => {
        dispatch(closeErrorNotification());
        onRandomSelection();
    };

    return (
        <Fragment>
            <Notification refresh={refresh} />
            <Card
                className={styles.card}
                actions={[
                    <Flex
                        direction={{ xs: 'column', sm: 'column', xl: 'row' }}
                        align='alignCenter'
                        gap='gap16'
                    >
                        <Button block={true} type='link' onClick={onRandomSelection}>
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
                        Можешь воспользоваться случайным выбором или выбрать друга с похожим на твой
                        уровень и вид тренировки, и мы найдем тебе идеального спортивного друга.
                    </Typography.Text>
                </Flex>
            </Card>
        </Fragment>
    );
};
