import { type ReactNode, Fragment } from 'react';
import { SidePanelBody } from '@components/side-panel-body/side-panel-body';
import { TrainingBadge } from '@components/training-badge';
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
        <SidePanelBody
            head={
                <Fragment>
                    <TrainingBadge className={styles.badge} text={trainingType.name} />
                    <Typography.Text className={styles.date}>{date.formated}</Typography.Text>
                </Fragment>
            }
            gap='gap24'
        >
            {children}
        </SidePanelBody>
    );
};
