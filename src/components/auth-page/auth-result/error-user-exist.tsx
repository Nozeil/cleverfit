import { useNavigate } from 'react-router-dom';
import { CloseCircleFilled } from '@ant-design/icons';
import { COMPOUND_ROUTES } from '@constants/routes';
import ResultCard from './result-card/result-card';

import styles from './auth-result.module.css';

const ErrorUserExist = () => {
    const navigate = useNavigate();

    const onClick = () => navigate(COMPOUND_ROUTES.AUTH_REGISTRATION);

    return (
        <ResultCard
            icon={
                <CloseCircleFilled
                    className={styles.icon}
                    style={{ color: 'var(--character-light-error)', fontSize: '71px' }}
                />
            }
            title='Данные не сохранились'
            text={`Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.`}
            btnText='Назад к регистрации'
            onClick={onClick}
        />
    );
};

export default ErrorUserExist;
