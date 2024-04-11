import { Fragment } from 'react';
import { MinusOutlined } from '@ant-design/icons';
import { Flex } from '@components/flex/flex';
import { EXERCISES_FORM_MODES } from '@constants/index';
import { useAppSelector } from '@hooks/index';
import { exercisesFormModeSelector } from '@redux/slices/training-modal-and-exercises-form/training-modal-and-exercises-form';
import { Button } from 'antd';

import { AddBtn } from './add-btn';

import styles from './action-btns.module.css';

type ActionBtnsProps = {
    deleteDisabled: boolean;
    onDelete: () => void;
};

const { NEW, EDIT, JOINT } = EXERCISES_FORM_MODES;

export const ActionBtns = ({ deleteDisabled, onDelete }: ActionBtnsProps) => {
    const formMode = useAppSelector(exercisesFormModeSelector);

    let btns = null;
    let btnsWrapperClassName = '';

    if (formMode === NEW) {
        btnsWrapperClassName = styles.btnsWrapper;
        btns = <AddBtn />;
    } else if (formMode === EDIT || formMode === JOINT) {
        btnsWrapperClassName = styles.btnsWrapperEditMode;
        btns = (
            <Fragment>
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
            </Fragment>
        );
    }

    return (
        <Flex className={btnsWrapperClassName} justify='justifyBetween'>
            {btns}
        </Flex>
    );
};
