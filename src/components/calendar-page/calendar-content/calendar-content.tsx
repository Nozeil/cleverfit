import { Fragment, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ExercisesForm } from '@components/exercises-form/exercises-form';
import { Notification } from '@components/notification/notification';
import { SidePanel } from '@components/side-panel/side-panel';
import { SidePanelHeadDependentFromFormMode } from '@components/side-panel-head-dependent-from-form-mode';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useTrainingListQueryWithNotification } from '@hooks/use-training-list-query-with-notification';
import { closeSidePanel } from '@redux/slices/side-panel';
import {
    closeTrainingModal,
    isTrainingModalOpenSelector,
    resetExercises,
    resetFormExercises,
} from '@redux/slices/training-modal-and-exercises-form/training-modal-and-exercises-form';
import { Calendar, Form, Grid } from 'antd';

import { CalendarSidePanelBody } from './calendar-side-panel-body/calendar-side-panel-body';
import { useTrainingModal } from './hooks/use-training-modal/use-training-modal';
import { TrainingModal } from './training-modal/training-modal';

import styles from './calendar-content.module.css';

const { useBreakpoint } = Grid;

export const CalendarContent = () => {
    const { queryResult, refresh } = useTrainingListQueryWithNotification();

    const isTrainingModalOpen = useAppSelector(isTrainingModalOpenSelector);
    const dispatch = useAppDispatch();

    const [form] = Form.useForm();
    const { sm } = useBreakpoint();

    const { coords, container, dateCellRender, calendarWrapperRef } = useTrainingModal(sm);

    const closeCalendarSidePanel = useCallback(() => {
        form.submit();
        dispatch(closeSidePanel());
    }, [dispatch, form]);

    const resetExercisesAndForm = () => {
        form.resetFields();

        dispatch(resetFormExercises());
        dispatch(resetExercises());
    };

    const calendar = queryResult.isError ? (
        <Calendar fullscreen={sm} />
    ) : (
        <Calendar
            fullscreen={sm}
            onPanelChange={() => dispatch(closeTrainingModal())}
            onSelect={resetExercisesAndForm}
            dateCellRender={dateCellRender}
        />
    );

    return (
        <Fragment>
            <SidePanel onClose={closeCalendarSidePanel} testId='modal-drawer-right'>
                <SidePanelHeadDependentFromFormMode
                    onClose={closeCalendarSidePanel}
                    fallbackTitle='Просмотр упражнений'
                    fallbackIcon={null}
                    newTitle='Добавление упражнений'
                    editTitle='Редактирование'
                />

                <CalendarSidePanelBody>
                    <ExercisesForm form={form} />
                </CalendarSidePanelBody>
            </SidePanel>
            <Notification refresh={refresh} />
            <div ref={calendarWrapperRef} className={styles.calendarWrapper}>
                {isTrainingModalOpen &&
                    container &&
                    createPortal(
                        <TrainingModal
                            style={{ ...coords }}
                            resetForm={() => form.resetFields()}
                            resetExercisesAndForm={resetExercisesAndForm}
                        />,
                        container,
                    )}
                {calendar}
            </div>
        </Fragment>
    );
};
