import { Fragment, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { ContentWrapper } from '@components/content-wrapper/content-wrapper';
import { Notification } from '@components/notification/notification';
import { SidePanel } from '@components/side-panel/side-panel';
import { SidePanelBody } from '@components/side-panel-body/side-panel-body';
import { SidePanelHeadDependentFromFormMode } from '@components/side-panel-head-dependent-from-form-mode';
import { SuccessAlert } from '@components/success-alert/success-alert';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useTrainingListQueryWithNotification } from '@hooks/use-training-list-query-with-notification';
import { closeSidePanel } from '@redux/slices/side-panel';
import { exercisesFormModeSelector } from '@redux/slices/training-modal-and-exercises-form/training-modal-and-exercises-form';
import { useGetTrainingQuery } from '@services/endpoints/training';
import type { ExercisesFormValues } from '@typings/index';
import { Form, Tabs } from 'antd';

import { EmptyTrainings } from './empty-trainings/empty-trainings';
import { JointTrainings } from './joint-trainings/joint-trainings';
import { SubmitBtn } from './submit-btn/submit-btn';
import { TrainingForm } from './training-form/training-form';
import { TrainingsTable } from './trainings-table/trainings-table';
import type { TrainingInfoFormValues } from './workouts-content.types';

import styles from './workouts-content.module.css';

export const WorkoutsContent = () => {
    const formMode = useAppSelector(exercisesFormModeSelector);
    const dispatch = useAppDispatch();

    const { refresh } = useTrainingListQueryWithNotification();
    const { data: trainings } = useGetTrainingQuery();

    const [exercisesForm] = Form.useForm<ExercisesFormValues>();
    const [trainingInfoForm] = Form.useForm<TrainingInfoFormValues>();

    useEffect(() => {
        if (formMode === 'new') {
            trainingInfoForm.resetFields();
            exercisesForm.resetFields();
        }
    }, [exercisesForm, formMode, trainingInfoForm]);

    const onClose = () => dispatch(closeSidePanel());

    const tabsItems = [
        {
            label: 'Мои тренировки',
            key: 'my-trainings',
            children: trainings?.length ? (
                <TrainingsTable />
            ) : (
                <Fragment>
                    <Notification refresh={refresh} />
                    <EmptyTrainings />
                </Fragment>
            ),
        },
        { label: 'Совместные тренировки', key: 'joint-trainings', children: <JointTrainings /> },
        { label: 'Марафоны', key: 'marathons' },
    ];

    let alertMessage;

    if (formMode === 'new') {
        alertMessage = 'Новая тренировка успешно добавлена';
    } else if (formMode === 'edit') {
        alertMessage = 'Тренировка успешно обновлена';
    }

    return (
        <Fragment>
            <SidePanel onClose={onClose} shouldCloseOnXs={false} footer={<SubmitBtn />}>
                <SidePanelHeadDependentFromFormMode
                    onClose={onClose}
                    fallbackTitle='Совместная тренировка'
                    fallbackIcon={<PlusOutlined />}
                    newTitle='Новая тренировка'
                    editTitle='Редактировать тренировку'
                />

                <SidePanelBody gap={{ xs: 'gap16', sm: 'gap24' }}>
                    <TrainingForm
                        trainingInfoForm={trainingInfoForm}
                        exercisesForm={exercisesForm}
                        onClose={onClose}
                    />
                </SidePanelBody>
            </SidePanel>

            <ContentWrapper className={styles.contentWrapper}>
                <SuccessAlert message={alertMessage} />
                <Tabs
                    className={styles.tabs}
                    defaultActiveKey='joint-trainings' // DELETE
                    items={tabsItems}
                    destroyInactiveTabPane={true}
                    moreIcon={null}
                />
            </ContentWrapper>
        </Fragment>
    );
};
