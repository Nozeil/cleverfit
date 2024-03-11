import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { closeTrainingModal, isTrainingModalOpenSelector } from '@redux/slices/training-modal';
import { useGetTrainingListQuery } from '@services/endpoints/catalogs';
import { Calendar, Grid } from 'antd';
import moment from 'moment';
import { type MouseEventHandler, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Notification } from '../notification/notification';
import styles from './calendar-content.module.css';
import { useTrainingModal } from './hooks/use-training-modal';
import { locale } from './locale';
import { TrainingCard } from './training-card/training-card';

const { useBreakpoint } = Grid;

export const CalendarContent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState({ iso: '', formated: '' });
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
            setIsOpen(true);
        }
    }, [isError]);

    const close = () => setIsOpen(false);

    const refresh = () => {
        close();
        refetch();
    };

    return (
        <>
            <Notification isOpen={isOpen} close={close} refresh={refresh} />
            <div ref={calendarWrapperRef} className={styles.calendarWrapper}>
                {isTrainingModalOpen &&
                    container &&
                    createPortal(<TrainingCard date={date} style={{ ...coords }} />, container)}
                <Calendar
                    locale={locale}
                    fullscreen={sm}
                    onPanelChange={() => dispatch(closeTrainingModal())}
                    dateCellRender={(date) => {
                        const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
                            dispatch(closeTrainingModal());

                            const currMonth = moment().month();
                            const pickedMonth = date.month();

                            if (pickedMonth !== currMonth && sm) {
                                e.stopPropagation();
                            }

                            setDate({
                                iso: date.utc().toISOString(),
                                formated: date.format('DD.MM.YYYY'),
                            });
                            handleTrainingModalOpen(e);
                        };

                        return <div className={styles.cellMask} onClick={onClick} />;
                    }}
                />
            </div>
        </>
    );
};
