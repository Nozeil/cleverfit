import { PageTemplate } from '@components/page-template/page-template';
import { HeaderContent } from '@components/profile-page/header-content';
import { useSetMenuKey } from '@hooks/use-set-menu-key';

import styles from './profile-page.module.css';

export const ProfilePage = () => {
    useSetMenuKey('Профиль');

    return (
        <PageTemplate headerContent={<HeaderContent />} headerContentClassName={styles.header} />
    );
};
