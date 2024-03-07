import { HeaderContent } from '@components/calendar-page/header-content';
import { PageTemplate } from '@components/page-template/page-template';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { resetSelectedKeys, setSelectedKey } from '@redux/slices/nav-menu/nav-menu';
import { useEffect } from 'react';

export const CalendarPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setSelectedKey('Календарь'));

        return () => {
            dispatch(resetSelectedKeys());
        };
    }, [dispatch]);

    return <PageTemplate headerContent={<HeaderContent />} />;
};
