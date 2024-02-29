import { Result } from 'antd';

import { CustomModal } from './custom-modal';
import { ResultButton } from './result-button/result-button';

type ModalWithResult500Props = {
    open: boolean;
    onClick: () => void;
};

export const ModalWithResult500 = ({ open, onClick }: ModalWithResult500Props) => {
    return (
        <CustomModal open={open}>
            <Result
                status='500'
                title='Что-то пошло не так'
                subTitle='Произошла ошибка, &nbsp;попробуйте ещё раз.'
                extra={
                    <ResultButton onClick={onClick} testId=''>
                        Назад
                    </ResultButton>
                }
            />
        </CustomModal>
    );
};
