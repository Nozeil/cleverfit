import { openError500Modal } from '@redux/slices/error-500-modal';
import { useLazyGetTrainingQuery } from '@services/endpoints/training';

import { useAppDispatch } from '.';

export const useTrainingHandler = (navigate: () => void) => {
    const [getTraining] = useLazyGetTrainingQuery();
    const dispatch = useAppDispatch();

    const handler = async () => {
        try {
            await getTraining(undefined, true).unwrap();
            navigate();
        } catch {
            dispatch(openError500Modal());
        }
    };

    return handler;
};
