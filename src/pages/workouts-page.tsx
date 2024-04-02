import { PageTemplate } from '@components/page-template/page-template';
import { HeaderContent } from '@components/workouts-page/header-content/header-content';
import { WorkoutsContent } from '@components/workouts-page/workouts-content';
import { useSetMenuKey } from '@hooks/use-set-menu-key';

import styles from './common-main-content.module.css';

export const WorkoutsPage = () => {
    useSetMenuKey('Тренировки');

    return (
        <PageTemplate
            headerContent={<HeaderContent />}
            mainContent={<WorkoutsContent />}
            mainContentClassName={styles.mainContent}
        />
    );
};
