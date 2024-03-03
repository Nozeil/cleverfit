import { Button } from 'antd';
import { useState } from 'react';

import { ButtonGroupWithModal } from './button-group-with-modal/button-group-with-modal';
import styles from './feedback-content.module.css';
import { FeedbackForm } from './feedback-form/feedback-form';
import { FeedbacksList } from './feedbacks-list';
import { ModalError } from './modal-error/modal-error';
import { ModalSuccess } from './modal-success';

export const FeedbacksContent = () => {
    const [showAll, toggleShowAll] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const expendBtnText = showAll ? 'Свернуть все отзывы' : 'Развернуть все отзывы';

    return (
        <>
            <ModalSuccess />
            <ModalError />

            <FeedbacksList
                showAll={showAll}
                empty={
                    <ButtonGroupWithModal
                        disabled={isSubmitDisabled}
                        buttonGroupClassName={styles.flex}
                    >
                        <FeedbackForm disableSubmit={(disabled) => setIsSubmitDisabled(disabled)} />
                    </ButtonGroupWithModal>
                }
                footer={
                    <ButtonGroupWithModal
                        disabled={isSubmitDisabled}
                        buttonGroupClassName={styles.flex}
                        expendButton={
                            <Button
                                block
                                type='link'
                                size='large'
                                onClick={() => toggleShowAll((prevShowAll) => !prevShowAll)}
                                data-test-id='all-reviews-button'
                            >
                                {expendBtnText}
                            </Button>
                        }
                    >
                        <FeedbackForm disableSubmit={(disabled) => setIsSubmitDisabled(disabled)} />
                    </ButtonGroupWithModal>
                }
            />
        </>
    );
};
