import { FooterContent } from '@components/footer-content/footer-content';
import { HeaderContent } from '@components/header-content/header-content';
import { MainPageContent } from '@components/main-page-content/main-page-content';
import { PageLayout } from '@components/page-layout/page-layout';

export const MainPage = () => (
    <PageLayout
        headerContent={<HeaderContent />}
        mainContent={<MainPageContent />}
        footerContent={<FooterContent />}
    />
);
