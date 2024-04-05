import { Fragment } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { ContentWrapper } from '@components/content-wrapper/content-wrapper';
import { Notification } from '@components/notification/notification';
import { SidePanel } from '@components/side-panel/side-panel';
import { SidePanelBody } from '@components/side-panel-body/side-panel-body';
import { SidePanelHeadDependentFromFormMode } from '@components/side-panel-head-dependent-from-form-mode';
import { SuccessAlert } from '@components/success-alert/success-alert';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useTrainingListQueryWithNotification } from '@hooks/use-training-list-query-with-notification';
import { closeSidePanel } from '@redux/slices/side-panel';
import type { ExercisesFormValues } from '@typings/index';
import { Form, Grid, Tabs } from 'antd';

import { EmptyTrainings } from './empty-trainings/empty-trainings';
import { SubmitBtn } from './submit-btn/submit-btn';
import { TrainingForm } from './training-form/training-form';
import type { TrainingInfoFormValues } from './workouts-content.types';

import styles from './workouts-content.module.css';

const { useBreakpoint } = Grid;

export const WorkoutsContent = () => {
    const dispatch = useAppDispatch();

    const { refresh } = useTrainingListQueryWithNotification();
    const { xl, sm } = useBreakpoint();

    const [exercisesForm] = Form.useForm<ExercisesFormValues>();
    const [trainingInfoForm] = Form.useForm<TrainingInfoFormValues>();

    const tabsItems = [
        {
            label: 'Мои тренировки',
            key: 'my-trainings',
            children: /* trainings?.length ? <div>Trainings</div> : */ <EmptyTrainings />,
        },
        { label: 'Совместные тренировки', key: 'joint-trainings', children: <div>Joint</div> },
        { label: 'Марафоны', key: 'marathons' },
    ];

    let tabBarGutter = 0;

    if (xl) {
        tabBarGutter = 228;
    } else if (sm) {
        tabBarGutter = 74;
    } else {
        tabBarGutter = 10;
    }

    const onClose = () => {
        trainingInfoForm.resetFields();
        exercisesForm.resetFields();

        dispatch(closeSidePanel());
    };

    return (
        <Fragment>
            <Notification refresh={refresh} />
            <SidePanel onClose={onClose} shouldCloseOnXs={false} footer={<SubmitBtn />}>
                <SidePanelHeadDependentFromFormMode
                    onClose={onClose}
                    fallbackTitle='Совместная тренировка'
                    fallbackIcon={<PlusOutlined />}
                    newTitle='Новая тренировка'
                    editTitle='Редактировать тренировку'
                />

                <SidePanelBody>
                    <TrainingForm
                        trainingInfoForm={trainingInfoForm}
                        exercisesForm={exercisesForm}
                        onClose={onClose}
                    />
                </SidePanelBody>
            </SidePanel>

            <ContentWrapper className={styles.contentWrapper}>
                <SuccessAlert message='Новая тренировка успешно добавлена' />
                <Tabs
                    className={styles.tabs}
                    items={tabsItems}
                    destroyInactiveTabPane={true}
                    tabBarGutter={tabBarGutter}
                    moreIcon={null}
                />
            </ContentWrapper>
        </Fragment>
    );
};
