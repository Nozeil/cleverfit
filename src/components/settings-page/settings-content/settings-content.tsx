import { ContentWrapper } from '@components/content-wrapper/content-wrapper';
import { FeedbackModalWithButtonGroup } from '@components/feedback-modal-with-button-group/feedback-modal-with-button-group';
import { FeedbackNavBtn } from '@components/feedbacks-nav-btn/feedbacks-nav-btn';
import { Flex } from '@components/flex/flex';

import styles from './settings-content.module.css';
import { Switchers } from './switchers/switchers';
import { Tariffs } from './tariffs/tariffs';

export const SettingsContent = () => {
    return (
        <ContentWrapper>
            <Flex
                className={styles.settingsContainer}
                direction='column'
                gap={{ xs: 'gap20', sm: 'gap24' }}
            >
                <Tariffs />
                <Switchers />
                <FeedbackModalWithButtonGroup
                    btnGroupClassName={styles.btnGroup}
                    maskStyleColor='var(--blue-2)'
                    additonalButton={
                        <FeedbackNavBtn className={styles.btn}>Смотреть все отзывы</FeedbackNavBtn>
                    }
                />
            </Flex>
        </ContentWrapper>
    );
};
