import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { closeCalendarSidePanel } from '@redux/slices/calendar-side-panel';
import {
    closeTrainingModal,
    isTrainingModalOpenSelector,
    resetExercises,
    resetFormExercises,
    setIsPastFalse,
    setIsPastTrue,
} from '@redux/slices/training-modal/training-modal';
import { useGetTrainingListQuery } from '@services/endpoints/catalogs';
import { Calendar, Form, Grid } from 'antd';
import moment from 'moment';
import { type MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import styles from './calendar-content.module.css';
import { CellContent } from './cell-content/cell-content';
import { ExercisesForm } from './exercises-form/exercises-form';
import { useTrainingModal } from './hooks/use-training-modal';
import { locale } from './locale';
import { Notification } from './notification/notification';
import { SidePanel } from './side-panel/side-panel';
import { TrainingModal } from './training-modal/training-modal';

const { useBreakpoint } = Grid;

export const CalendarContent = () => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [date, setDate] = useState({ iso: '', formated: '' });

    const [form] = Form.useForm();

    const calendarWrapperRef = useRef<HTMLDivElement>(null);
    const { sm } = useBreakpoint();
    const { coords, container, handleTrainingModalOpen } = useTrainingModal(
        calendarWrapperRef.current,
        sm,
    );
    const isTrainingModalOpen = useAppSelector(isTrainingModalOpenSelector);
    const dispatch = useAppDispatch();

    const { isError, refetch } = useGetTrainingListQuery();

    useEffect(() => {
        if (isError) {
            setIsNotificationOpen(true);
        }
    }, [isError]);

    const closeNotification = () => setIsNotificationOpen(false);

    const refresh = () => {
        closeNotification();
        refetch();
    };

    const closeSidePanel = useCallback(() => {
        form.submit();
        dispatch(closeCalendarSidePanel());
    }, [dispatch, form]);

    const resetExercisesAndForm = () => {
        form.resetFields();

        dispatch(resetFormExercises());
        dispatch(resetExercises());
    };

    return (
        <>
            <SidePanel
                form={<ExercisesForm form={form} />}
                close={closeSidePanel}
                date={date}
            />
            <Notification isOpen={isNotificationOpen} close={closeNotification} refresh={refresh} />
            <div ref={calendarWrapperRef} className={styles.calendarWrapper}>
                {isTrainingModalOpen &&
                    container &&
                    createPortal(
                        <TrainingModal
                            date={date}
                            style={{ ...coords }}
                            resetForm={() => form.resetFields()}
                            resetExercisesAndForm={resetExercisesAndForm}
                        />,
                        container,
                    )}
                <Calendar
                    locale={locale}
                    fullscreen={sm}
                    onPanelChange={() => dispatch(closeTrainingModal())}
                    onSelect={resetExercisesAndForm}
                    dateCellRender={(date) => {
                        const iso = date
                            .utcOffset(0)
                            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
                            .utc()
                            .toISOString();

                        const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
                            dispatch(closeTrainingModal());

                            const setIsPast = date.isBefore() ? setIsPastTrue : setIsPastFalse;
                            dispatch(setIsPast());

                            const currMonth = moment().month();
                            const pickedMonth = date.month();

                            if (pickedMonth !== currMonth && sm) {
                                e.stopPropagation();
                            }

                            setDate({
                                iso,
                                formated: date.format('DD.MM.YYYY'),
                            });

                            handleTrainingModalOpen(e);
                        };

                        return <CellContent breakpoint={sm} iso={iso} onClick={onClick} />;
                    }}
                />
            </div>
        </>
    );
};
