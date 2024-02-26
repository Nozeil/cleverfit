import { Navigate, Route, Routes } from 'react-router-dom';
import { HistoryRouter } from 'redux-first-history/rr6';
import { history } from '@redux/configure-store';
import { MainPage } from '@pages/main-page/main-page';
import { MainPageLayout } from '@components/main-page-layout/main-page-layout';
import { AppLayout } from '@components/app-layout/app-layout';
import { AuthPage } from '@pages/auth/auth';
import { LoginForm } from '@components/auth-page/auth-forms/login-form/login-form';
import { RegistrationForm } from '@components/auth-page/auth-forms/registration-form';
import { COMPOUND_ROUTES, ROUTES } from '@constants/routes';
import { ErrorLogin } from '@components/auth-page/auth-result/error-login';
import { AuthPageContent } from '@components/auth-page/auth-page-content/auth-page-content';
import { SuccessRegistration } from '@components/auth-page/auth-result/success-registration';
import { ErrorUserExist } from '@components/auth-page/auth-result/error-user-exist';
import { ErrorRegistration } from '@components/auth-page/auth-result/error-registration';
import { AuthProvider } from '@components/auth/auth-provider';
import { AuthRoute } from '@components/auth-route';
import { NonAuthRoute } from '@components/non-auth-route';
import { ErrorCheckEmailNoExist } from '@components/auth-page/auth-result/error-check-email-no-exist';
import { ErrorCheckEmail } from '@components/auth-page/auth-result/error-check-email';
import { ConfirmEmail } from '@components/auth-page/confirm-email/confirm-email';
import { ChangePassword } from '@components/auth-page/auth-forms/change-password/change-password';
import { ErrorChangePassword } from '@components/auth-page/auth-result/error-change-password';
import { SuccessChangePassword } from '@components/auth-page/auth-result/success-change-password';
import { ForgotPasswordRoute } from '@components/auth-page/auth-result/forgot-password-route';

const routes = (
    <Routes>
        <Route element={<AppLayout />}>
            <Route
                element={
                    <NonAuthRoute>
                        <AuthPage />
                    </NonAuthRoute>
                }
            >
                <Route path={ROUTES.AUTH}>
                    <Route element={<AuthPageContent />}>
                        <Route index element={<LoginForm />} />
                        <Route path={ROUTES.REGISTRATION} element={<RegistrationForm />} />
                    </Route>
                    <Route
                        path={ROUTES.CONFIRM_EMAIL}
                        element={
                            <ForgotPasswordRoute prevRoute={ROUTES.AUTH}>
                                <ConfirmEmail />
                            </ForgotPasswordRoute>
                        }
                    />
                    <Route
                        path={ROUTES.CHANGE_PASSWORD}
                        element={
                            <ForgotPasswordRoute prevRoute={COMPOUND_ROUTES.AUTH_CONFIRM_EMAIL}>
                                <ChangePassword />
                            </ForgotPasswordRoute>
                        }
                    />
                </Route>

                <Route path={ROUTES.RESULT}>
                    <Route path={ROUTES.ERROR_LOGIN} element={<ErrorLogin />} />
                    <Route path={ROUTES.SUCCESS_REGISTRATION} element={<SuccessRegistration />} />
                    <Route path={ROUTES.ERROR_USER_EXIST} element={<ErrorUserExist />} />
                    <Route path={ROUTES.ERROR_REGISTRATION} element={<ErrorRegistration />} />
                    <Route
                        path={ROUTES.ERROR_CHANGE_PASSWORD}
                        element={
                            <ForgotPasswordRoute prevRoute={COMPOUND_ROUTES.AUTH_CHANGE_PASSWORD}>
                                <ErrorChangePassword />
                            </ForgotPasswordRoute>
                        }
                    />
                    <Route
                        path={ROUTES.SUCCESS_CHANGE_PASSWORD}
                        element={
                            <ForgotPasswordRoute prevRoute={COMPOUND_ROUTES.AUTH_CHANGE_PASSWORD}>
                                <SuccessChangePassword />
                            </ForgotPasswordRoute>
                        }
                    />
                    <Route
                        path={ROUTES.ERROR_CHECK_EMAIL_NO_EXIST}
                        element={
                            <ForgotPasswordRoute prevRoute={ROUTES.AUTH}>
                                <ErrorCheckEmailNoExist />
                            </ForgotPasswordRoute>
                        }
                    />
                    <Route
                        path={ROUTES.ERROR_CHECK_EMAIL}
                        element={
                            <ForgotPasswordRoute prevRoute={ROUTES.AUTH}>
                                <ErrorCheckEmail />
                            </ForgotPasswordRoute>
                        }
                    />
                </Route>
            </Route>

            <Route
                path={ROUTES.MAIN}
                element={
                    <AuthRoute>
                        <MainPageLayout />
                    </AuthRoute>
                }
            >
                <Route index element={<MainPage />} />
            </Route>
        </Route>
        <Route path='*' element={<Navigate to={ROUTES.AUTH} />} />
    </Routes>
);

export const Router = () => (
    <AuthProvider>
        <HistoryRouter history={history}>{routes}</HistoryRouter>
    </AuthProvider>
);
