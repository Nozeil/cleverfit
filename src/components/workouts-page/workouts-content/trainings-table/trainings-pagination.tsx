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
    const { xs, lg } = useBreakpoint();

    useLayoutEffect(() => {
        let size;

        if (xs) {
            size = 8;
        } else if (lg) {
            size = 14;
        } else {
            size = 10;
        }

        dispatch(setPaginationPageSize(size));

        return () => {
            dispatch(setPaginationPage(1));
        };
    }, [dispatch, lg, xs]);

    const onChange: PaginationProps['onChange'] = (page) => dispatch(setPaginationPage(page));

    return (
        <Pagination
            pageSize={pageSize}
            size='small'
            total={data?.length}
            showSizeChanger={false}
            hideOnSinglePage={true}
            onChange={onChange}
        />
    );
};
