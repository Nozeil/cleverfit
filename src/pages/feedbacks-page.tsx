import { FeedbacksContent } from '@components/feedbacks-page/feedbacks-content';
import { HeaderContent } from '@components/feedbacks-page/header-content';
import { PageLayout } from '@components/page-layout/page-layout';

export const FeedbacksPage = () => (
    <PageLayout headerContent={<HeaderContent />} mainContent={<FeedbacksContent />} />
);
