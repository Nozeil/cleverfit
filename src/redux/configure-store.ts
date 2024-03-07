import { configureStore } from '@reduxjs/toolkit';
import { api } from '@services/api';
import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';
import { createReduxHistoryContext } from 'redux-first-history';

import { authReducer } from './slices/auth';
import { error500ModalReducer } from './slices/error-500-modal';
import { errorFeedbackModalReducer } from './slices/error-feedback-modal';
import { feedbackModalReducer } from './slices/feedback-modal';
import { navMenuReducer } from './slices/nav-menu/nav-menu';
import { siderReducer } from './slices/sider';
import { successFeedbackModalReducer } from './slices/success-feedback-modal';

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
        [api.reducerPath]: api.reducer,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(routerMiddleware).concat(api.middleware),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
