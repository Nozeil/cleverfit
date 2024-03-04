import { FooterContent } from '@components/main-page/footer-content/footer-content';
import { HeaderContent } from '@components/main-page/header-content/header-content';
import { MainPageContent } from '@components/main-page/main-page-content/main-page-content';
import { PageTemplate } from '@components/page-template/page-template';

export const MainPage = () => (
    <PageTemplate
        headerContent={<HeaderContent />}
        mainContent={<MainPageContent />}
        footerContent={<FooterContent />}
    />
);
