import { useLayoutEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    jointTrainingsSelector,
    setPaginationPage,
    setPaginationPageSize,
} from '@redux/slices/joint-training/joint-trainings';
import { type PaginationProps, Grid, Pagination } from 'antd';

const { useBreakpoint } = Grid;

export const SearchPagination = () => {
    const { paginationTotal, paginationPageSize } = useAppSelector(jointTrainingsSelector);
    const dispatch = useAppDispatch();
    const { xl } = useBreakpoint();

    const onChange: PaginationProps['onChange'] = (page) => dispatch(setPaginationPage(page));

    useLayoutEffect(() => {
        const pageSize = xl ? 12 : 8;

        dispatch(setPaginationPageSize(pageSize));

        return () => {
            dispatch(setPaginationPage(1));
        };
    }, [dispatch, xl]);

    return (
        paginationTotal && (
            <Pagination
                pageSize={paginationPageSize}
                size='small'
                showSizeChanger={false}
                total={paginationTotal}
                onChange={onChange}
            />
        )
    );
};
