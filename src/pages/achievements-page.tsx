import { AchievementsContent } from '@components/achieviements-page/achieviements-content/achieviements-content';
import { HeaderContent } from '@components/achieviements-page/header-content/header-content';
import { PageTemplate } from '@components/page-template/page-template';
import { useSetMenuKey } from '@hooks/use-set-menu-key';

import styles from './common-main-content.module.css';

export const AchievementsPage = () => {
    useSetMenuKey('Достижения');

    return (
        <PageTemplate
            headerContent={<HeaderContent />}
            mainContent={<AchievementsContent />}
            mainContentClassName={styles.mainContent}
        />
    );
};
