import { ROUTES } from '@constants/routes';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { routerSelector } from '@redux/router-selector';
import { useGetTrainingQuery } from '@services/endpoints/training';

export const useGetTrainingQueryWithSkip = () => {
    const { previousLocations } = useAppSelector(routerSelector);
    const result = useGetTrainingQuery(
        { name: undefined },
        {
            skip: previousLocations?.at(-1)?.location?.pathname !== ROUTES.MAIN,
        },
    );

    return result;
};
