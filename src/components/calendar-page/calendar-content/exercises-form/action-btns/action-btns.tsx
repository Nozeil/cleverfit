import { MinusOutlined } from '@ant-design/icons';
import { Flex } from '@components/flex/flex';
import { useAppSelector } from '@hooks/index';
import {
    trainingModalFormModeSelector,
} from '@redux/slices/training-modal/training-modal';
import { Button } from 'antd';

import styles from './action-btns.module.css';
import { AddBtn } from './add-btn';

type ActionBtnsProps = {
    deleteDisabled: boolean;
    onDelete: () => void;
};

export const ActionBtns = ({ deleteDisabled, onDelete }: ActionBtnsProps) => {
    const formMode = useAppSelector(trainingModalFormModeSelector);

    let btns = null;
    let btnsWrapperClassName = '';

    if (formMode === 'new') {
        btnsWrapperClassName = styles.btnsWrapper;
        btns = <AddBtn />;
    } else if (formMode === 'edit') {
        btnsWrapperClassName = styles.btnsWrapperEditMode;
        btns = (
            <>
                <AddBtn />
                <Button
                    className={styles.btn}
                    icon={<MinusOutlined />}
                    size='large'
                    type='text'
                    disabled={deleteDisabled}
                    onClick={onDelete}
                >
                    Удалить
                </Button>
            </>
        );
    }

    return (
        <Flex className={btnsWrapperClassName} justify='justifyBetween'>
            {btns}
        </Flex>
    );
};
