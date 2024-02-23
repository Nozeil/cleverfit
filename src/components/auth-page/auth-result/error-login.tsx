import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants/routes';
import ResultCard from '../result-card/result-card';
import ResultIcon from '../result-icon/result-icon';
import { RESULT_ICON_TYPE_KEYS } from '../auth-page.constants';
import ResultButton from './result-button/result-button';

const ErrorLogin = () => {
    const navigate = useNavigate();

    const onClick = () => navigate(ROUTES.AUTH);

    return (
        <ResultCard
            head={<ResultIcon type={RESULT_ICON_TYPE_KEYS.WARNING} />}
            title='Вход не выполнен'
            text='Что-то пошло не так. Попробуйте еще раз'
        >
            <ResultButton block onClick={onClick} testId='login-retry-button'>
                Повторить
            </ResultButton>
        </ResultCard>
    );
};

export default ErrorLogin;
