import { type ReactNode } from 'react';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { openSidePanel } from '@redux/slices/side-panel';
import {
    resetExercises,
    resetFormExercises,
} from '@redux/slices/training-modal-and-exercises-form/training-modal-and-exercises-form';
import { Button } from 'antd';

import styles from './new-training-btn.module.css';

type NewTrainingBtnProps = {
    children: ReactNode;
    icon?: ReactNode;
};

export const NewTrainingBtn = ({ children, icon }: NewTrainingBtnProps) => {
    const dispatch = useAppDispatch();

    const onClick = () => {
        dispatch(resetFormExercises());
        dispatch(resetExercises());
        dispatch(openSidePanel());
    };

    return (
        <Button className={styles.btn} type='primary' size='large' onClick={onClick} icon={icon}>
            {children}
        </Button>
    );
};
