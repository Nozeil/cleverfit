import { useLayoutEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    setPaginationPage,
    setPaginationPageSize,
    trainingsTablePaginationPageSizeSelector,
} from '@redux/slices/trainings-table/trainings-table';
import { useGetTrainingQuery } from '@services/endpoints/training';
import { Grid, Pagination, PaginationProps } from 'antd';

const { useBreakpoint } = Grid;

export const TrainingsPagination = () => {
    const pageSize = useAppSelector(trainingsTablePaginationPageSizeSelector);
    const dispatch = useAppDispatch();

    const { data } = useGetTrainingQuery();
    const { xs } = useBreakpoint();

    useLayoutEffect(() => {
        const size = xs ? 8 : 14;

        dispatch(setPaginationPageSize(size));
    }, [dispatch, xs]);

    const onChange: PaginationProps['onChange'] = (page) => dispatch(setPaginationPage(page));

    return (
        <Pagination
            pageSize={pageSize}
            size='small'
            total={data?.length}
            hideOnSinglePage={true}
            onChange={onChange}
        />
    );
};
