import { type ReactNode } from 'react';
import { TrainingBadge } from '@components/calendar-page/training-badge';
import { Flex } from '@components/flex/flex';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingModalAndExercisesFormSelector } from '@redux/slices/training-modal-and-exercises-form/training-modal-and-exercises-form';
import { Typography } from 'antd';

import styles from './calendar-side-panel-body.module.css';

type CalendarSidePanelBodyProps = {
    children: ReactNode;
};

export const CalendarSidePanelBody = ({ children }: CalendarSidePanelBodyProps) => {
    const { trainingType, date } = useAppSelector(trainingModalAndExercisesFormSelector);

    return (
        <Flex className={styles.contentBody} direction='column' gap='gap24'>
            <Flex className={styles.contentBodyHeader} justify='justifyBetween' align='alignCenter'>
                <TrainingBadge className={styles.badge} text={trainingType.name} />
                <Typography.Text className={styles.date}>{date.formated}</Typography.Text>
            </Flex>

            {children}
        </Flex>
    );
};
