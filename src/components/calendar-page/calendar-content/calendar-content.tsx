import { useGetTrainingListQuery } from '@services/endpoints/catalogs';
import { Calendar, Grid } from 'antd';

import { locale } from './locale';

const { useBreakpoint } = Grid;

export const CalendarContent = () => {
    const { data } = useGetTrainingListQuery();
    const { sm } = useBreakpoint();

    return <Calendar locale={locale} fullscreen={sm} />;
};
