import { useGetTrainingQuery } from '@services/endpoints/training';
import { Grid, Pagination } from 'antd';

const { useBreakpoint } = Grid;

export const TrainingsPagination = () => {
    const { data } = useGetTrainingQuery();
    const { xs } = useBreakpoint();

    const pageSize = xs ? 8 : 14;

    return (
        <Pagination pageSize={pageSize} size='small' total={data?.length} hideOnSinglePage={true} />
    );
};
