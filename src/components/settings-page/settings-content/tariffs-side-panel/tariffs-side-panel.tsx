import { SidePanel } from '@components/side-panel/side-panel';
import { SidePanelHead } from '@components/side-panel-head/side-panel-head';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { closeSidePanel } from '@redux/slices/side-panel';
import { useGetTariffListQuery } from '@services/endpoints/catalogs';
import { useGetUserInfoQuery } from '@services/endpoints/user';

import { SidePanelBody } from './side-panel-body/side-panel-body';
import { SubmitBtn } from './submit-btn/submit-btn';
import styles from './tariffs-side-panel.module.css';

export const TariffsSidePanel = () => {
    const { data: userInfo } = useGetUserInfoQuery();
    const { data: tariffList } = useGetTariffListQuery();

    const dispatch = useAppDispatch();

    const onClose = () => dispatch(closeSidePanel());

    const isData = userInfo && tariffList;

    return (
        isData && (
            <SidePanel className={styles.sidePanel} footer={<SubmitBtn />} onClose={onClose}>
                <SidePanelHead onClose={onClose} title='Сравнить тарифы' />
                <SidePanelBody />
            </SidePanel>
        )
    );
};
