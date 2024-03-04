import { FeedbacksContent } from '@components/feedbacks-page/feedbacks-content/feedbacks-content';
import { HeaderContent } from '@components/feedbacks-page/header-content';
import { PageTemplate } from '@components/page-template/page-template';

export const FeedbacksPage = () => (
    <PageTemplate headerContent={<HeaderContent />} mainContent={<FeedbacksContent />} />
);
