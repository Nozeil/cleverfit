import { combineReducers } from 'redux';
import { createReduxHistoryContext } from 'redux-first-history';
import { configureStore } from '@reduxjs/toolkit';
import { api } from '@services/api';
import { createBrowserHistory } from 'history';

import { achieviementsFiltersReducer } from './slices/achieviements-filter/achieviements-filters';
import { authReducer } from './slices/auth';
import { error500ModalReducer } from './slices/error-500-modal';
import { errorFeedbackModalReducer } from './slices/error-feedback-modal';
import { feedbackModalReducer } from './slices/feedback-modal';
import { jointTrainingsReducer } from './slices/joint-training/joint-trainings';
import { navMenuReducer } from './slices/nav-menu/nav-menu';
import { profileReducer } from './slices/profile';
import { sidePanelReducer } from './slices/side-panel';
import { siderReducer } from './slices/sider';
import { successAlertReducer } from './slices/success-alert';
import { successFeedbackModalReducer } from './slices/success-feedback-modal';
import { tariffsReducer } from './slices/tariffs';
import { trainingFormReducer } from './slices/training-form';
import { errorNotificationReducer } from './slices/training-list-error-notification';
import { trainingModalAndExercisesFormReducer } from './slices/training-modal-and-exercises-form/training-modal-and-exercises-form';
import { trainingsTableReducer } from './slices/trainings-table/trainings-table';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
    savePreviousLocations: 1,
});

export const store = configureStore({
    reducer: combineReducers({
        router: routerReducer,
        sider: siderReducer,
        auth: authReducer,
        feedbackModal: feedbackModalReducer,
        successFeedbackModal: successFeedbackModalReducer,
        errorFeedbackModal: errorFeedbackModalReducer,
        error500Modal: error500ModalReducer,
        navMenu: navMenuReducer,
        trainingModalAndExercisesForm: trainingModalAndExercisesFormReducer,
        sidePanel: sidePanelReducer,
        profile: profileReducer,
        tariffs: tariffsReducer,
        trainingListErrorNotification: errorNotificationReducer,
        trainingForm: trainingFormReducer,
        successAlert: successAlertReducer,
        trainingsTable: trainingsTableReducer,
        jointTrainings: jointTrainingsReducer,
        achieviementsFilters: achieviementsFiltersReducer,
        [api.reducerPath]: api.reducer,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(routerMiddleware).concat(api.middleware),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
