import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants/routes';
import ResultCard from '../result-card/result-card';
import ResultIcon from '../result-icon/result-icon';
import { RESULT_ICON_TYPE_KEYS } from '../auth-page.constants';
import ResultButton from './result-button/result-button';

const SuccessRegistration = () => {
    const navigate = useNavigate();

    const onClick = () => navigate(ROUTES.AUTH, { replace: true });

    return (
        <ResultCard
            head={<ResultIcon type={RESULT_ICON_TYPE_KEYS.SUCCESS} />}
            title='Регистрация успешна'
            text={`Регистрация прошла успешно. Зайдите
в приложение, используя свои e-mail и пароль.`}
        >
            <ResultButton block onClick={onClick} testId='registration-enter-button'>
                Войти
            </ResultButton>
        </ResultCard>
    );
};

export default SuccessRegistration;
