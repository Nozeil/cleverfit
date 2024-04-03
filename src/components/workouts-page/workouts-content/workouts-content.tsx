import { Fragment } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { ContentWrapper } from '@components/content-wrapper/content-wrapper';
import { ExercisesForm } from '@components/exercises-form/exercises-form';
import { Notification } from '@components/notification/notification';
import { SidePanel } from '@components/side-panel/side-panel';
import { SidePanelBody } from '@components/side-panel-body/side-panel-body';
import { SidePanelHeadDependentFromFormMode } from '@components/side-panel-head-dependent-from-form-mode';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useTrainingListQueryWithNotification } from '@hooks/use-training-list-query-with-notification';
import { closeSidePanel } from '@redux/slices/side-panel';
import { useGetTrainingQuery } from '@services/endpoints/training';
import { Form, Grid, Tabs } from 'antd';

import { EmptyTrainings } from './empty-trainings/empty-trainings';

import styles from './workouts-content.module.css';

const { useBreakpoint } = Grid;

export const WorkoutsContent = () => {
    const { refresh } = useTrainingListQueryWithNotification();
    const { data: trainings } = useGetTrainingQuery();
    const dispatch = useAppDispatch();
    const { xl, sm } = useBreakpoint();
    const [exercisesForm] = Form.useForm();

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
        exercisesForm.submit();
        exercisesForm.resetFields();

        dispatch(closeSidePanel());
    };

    return (
        <Fragment>
            <Notification refresh={refresh} />
            <SidePanel onClose={onClose} shouldCloseOnXs={false}>
                <SidePanelHeadDependentFromFormMode
                    onClose={onClose}
                    fallbackTitle='Совместная тренировка'
                    fallbackIcon={<PlusOutlined />}
                    newTitle='Новая тренировка'
                    editTitle='Редактировать тренировку'
                />

                <SidePanelBody>
                    <ExercisesForm form={exercisesForm} />
                </SidePanelBody>
            </SidePanel>
            <ContentWrapper className={styles.contentWrapper}>
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
