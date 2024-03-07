import { ROUTES } from '@constants/routes';
import { openError500Modal } from '@redux/slices/error-500-modal';
import { useLazyGetTrainingQuery } from '@services/endpoints/training';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '.';

export const useCalendarHandler = () => {
    const [getTraining] = useLazyGetTrainingQuery();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handler = async () => {
        try {
            await getTraining({ name: undefined }, true).unwrap();
            navigate(ROUTES.CALENDAR);
        } catch {
            dispatch(openError500Modal());
        }
    };

    return handler;
};
