import { CalendarContent } from '@components/calendar-page/calendar-content/calendar-content';
import { HeaderContent } from '@components/calendar-page/header-content';
import { PageTemplate } from '@components/page-template/page-template';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { resetSelectedKeys, setSelectedKey } from '@redux/slices/nav-menu/nav-menu';
import { useEffect } from 'react';

import styles from './calendar-page.module.css';

export const CalendarPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setSelectedKey('Календарь'));

        return () => {
            dispatch(resetSelectedKeys());
        };
    }, [dispatch]);

    return <PageTemplate headerContent={<HeaderContent />} mainContent={<CalendarContent />} mainContentClassName={styles.mainContent} />;
};
