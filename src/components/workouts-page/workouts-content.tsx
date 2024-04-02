import { Fragment } from 'react';
import { ContentWrapper } from '@components/content-wrapper/content-wrapper';
import { Notification } from '@components/notification/notification';
import { useTrainingListQueryWithNotification } from '@hooks/use-training-list-query-with-notification';

export const WorkoutsContent = () => {
    const { queryResult, refresh } = useTrainingListQueryWithNotification();

    return (
        <Fragment>
            <Notification refresh={refresh} />
            <ContentWrapper>content</ContentWrapper>
        </Fragment>
    );
};
