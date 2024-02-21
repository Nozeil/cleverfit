import { CheckCircleFilled, CloseCircleFilled, ExclamationCircleFilled, WarningFilled } from '@ant-design/icons';
import type { ResultIconTypeValues } from '../auth-page.types';
import { RESULT_ICON_TYPE_KEYS } from '../auth-page.constants';

import styles from './result-icon.module.css';

interface ResultIconProps {
    type: ResultIconTypeValues;
}

const { ERROR, SUCCESS, WARNING, EXCLAMATION } = RESULT_ICON_TYPE_KEYS;

const ResultIcon = ({ type }: ResultIconProps) => {
    const fontSize = '71px';
    const icons = {
        [ERROR]: (
            <CloseCircleFilled
                className={styles.icon}
                style={{ color: 'var(--character-light-error)', fontSize }}
            />
        ),
        [SUCCESS]: (
            <CheckCircleFilled
                className={styles.icon}
                style={{ color: 'var(--character-light-success)', fontSize }}
            />
        ),
        [WARNING]: (
            <WarningFilled
                className={styles.icon}
                style={{ color: 'var(--character-light-warning)', fontSize }}
            />
        ),
        [EXCLAMATION]: (
            <ExclamationCircleFilled
                className={styles.icon}
                style={{ color: 'var(--primary-light-6)', fontSize }}
            />
        ),
    };

    return icons[type];
};

export default ResultIcon;
