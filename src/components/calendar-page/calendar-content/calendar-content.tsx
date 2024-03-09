import { useGetTrainingListQuery } from '@services/endpoints/catalogs';
import { Calendar, Grid } from 'antd';
import { useEffect, useState } from 'react';

import { Notification } from '../notification/notification';
import { locale } from './locale';

const { useBreakpoint } = Grid;

export const CalendarContent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data, isError, refetch } = useGetTrainingListQuery();

    const { sm } = useBreakpoint();

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
            <Calendar locale={locale} fullscreen={sm} />
        </>
    );
};
