import { ResultButton } from '@components/result-button/result-button';
import { WIDTH_540 } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { isError500ModalOpenSelector } from '@redux/slices/error-500-modal';
import { Modal, Result } from 'antd';

type ModalWithResult500Props = {
    onClick: () => void;
};

export const ModalWithResult500 = ({ onClick }: ModalWithResult500Props) => {
    const isOpen = useAppSelector(isError500ModalOpenSelector);

    return (
        <Modal open={isOpen} closable={false} centered width={WIDTH_540} footer={null}>
            <Result
                status='500'
                title='Что-то пошло не так'
                subTitle='Произошла ошибка, &nbsp;попробуйте ещё раз.'
                extra={<ResultButton onClick={onClick}>Назад</ResultButton>}
            />
        </Modal>
    );
};
