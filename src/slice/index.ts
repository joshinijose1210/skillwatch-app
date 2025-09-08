import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { initialState as analyticsReviewInitialState } from '../slice/analyticsFilter/analyticsFilter';
import { initialState as dashboardReviewInitialState } from '../slice/dashboardFilter/dashboardFilter';
import { initialState as employeeDataInitialState } from '../slice/employeeData/employeeData';
import filterReducer from '../slice/filter';
import { initialState as filterInitialState } from '../slice/filter/filter';

import feedbackFilterReducer from '../slice/feedbackFilter';
import { initialState as feedbackFilterInitialState } from '../slice/feedbackFilter/feedbackFilter';

import { initialState as logoErrorInitialState } from '../slice/logoError/logoError';
import reviewCycleFilterReducer from '../slice/reviewCycleFilter';
import { initialState as reviewCycleFilterInitialState } from '../slice/reviewCycleFilter/reviewCycleFilter';
import searchReducer from '../slice/search';
import { initialState as searchInitialState } from '../slice/search/searchSlice';
import updateManagerReducer from '../slice/updateManager';
import { initialState as updateManagerInitialState } from '../slice/updateManager/updateManager';
import userReducer, { UserState } from '../slice/user';
import { initialState as userInitialState } from '../slice/user/user';
import analyticsReviewFilterReducer from './analyticsFilter';
import dashboardReviewFilterReducer from './dashboardFilter';
import employeeDataReducer from './employeeData';
import kpiFilterReducer from './kpiFilter';
import { initialState as KPIinitialState } from './kpiFilter/KPIFilter';
import logoErrorReducer from './logoError';
import { forgotPasswordApi } from './services/forgotPassword';
import submittedFeedbackReducer from './submittedFeedback';
import myFeedbackFilterReducer from './myFeedbackFilter';
import { initialState as submittedFeedbackState } from './submittedFeedback/submittedFeedback';

import checkInWithManagerReducer, { checkInInitialState } from './checkInWithManager';
import { initialState as checkInWithManagerState } from '@slice/checkInWithManager/checkInWithManager';

import receivedFeedbackReducer from './receivedFeedback';
import { initialState as ReceivedFeedbackState } from './receivedFeedback/receivedFeedback';
import reqFeedbackFilterReducer, { reqFBInitialState } from './reqFeedbackFilter';
import suggestionReceivedFilterReducer, { SuggestionReceivedFilterInitialState } from './suggestionReceivedFilter';
import goalModalReducer, { goalModalInitialState } from './goalModalSlice';
import {
    analyticsApi,
    authenticationApi,
    checkInWithManagerApi,
    companyInfoApi,
    dashboardActionItemApi,
    departmentApi,
    domainList,
    employeeApi,
    employeeList,
    employeesByManagerApi,
    experienceListApi,
    feedbackApi,
    feedbackOverviewApi,
    feedbackRequestApi,
    genderListApi,
    kpiApi,
    managerEmployeeList,
    managerListApi,
    onboardingFlowApi,
    orgAdminSignUpApi,
    performanceReviewCycleApi,
    permissionModulesApi,
    reporteeList,
    resendMailApi,
    reviewTimelineApi,
    singleEmployeeData,
    slackApi,
    tagsList,
    userActivityLog,
    suggestionApi,
    externalFeedbackApi,
    organisationApi,
    SuggestionTagsList,
    settingList,
    weightedScoreApi,
    singleRequestedFeedbackApi,
    markFeedbackReceievedAsReadApi,
    chartApi,
    dashboardAppreciationApi,
    designationApi,
    reviewApi,
    roleApi,
    teamApi,
    kraApi,
    SuggestionPendingCount,
    previousGoalActionItemsAPI,
    previousGoalsActionItemsList,
    editGoalApi
} from './services';

export const initialState = {
    user: userInitialState,
    filter: filterInitialState,
    feedbackFilter: feedbackFilterInitialState,
    reviewCycleFilter: reviewCycleFilterInitialState,
    updateManager: updateManagerInitialState,
    employeeData: employeeDataInitialState,
    logoError: logoErrorInitialState,
    KPIFilter: KPIinitialState,
    searchText: searchInitialState,
    reqFeedbackFilter: reqFBInitialState,
    submittedFeedback: submittedFeedbackState,
    receivedFeedbackSlice: ReceivedFeedbackState,
    analyticsReviewFilter: analyticsReviewInitialState,
    dashboardReviewFilter: dashboardReviewInitialState,
    checkInSlice: checkInInitialState,
    suggestionReceivedFilter: SuggestionReceivedFilterInitialState,
    goalModalSlice: goalModalInitialState
};

// const persistConfig = {
//     key: 'performance-tracking-app',
//     storage
// };

const userFromStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;

const rootReducer = combineReducers({
    user: userReducer,
    filter: filterReducer,
    feedbackFilter: feedbackFilterReducer,
    reviewCycleFilter: reviewCycleFilterReducer,
    updateManager: updateManagerReducer,
    employeeData: employeeDataReducer,
    logoError: logoErrorReducer,
    kpiFilter: kpiFilterReducer,
    search: searchReducer,
    reqFeedbackFilter: reqFeedbackFilterReducer,
    analyticsReviewFilter: analyticsReviewFilterReducer,
    dashboardReviewFilter: dashboardReviewFilterReducer,
    submittedFeedback: submittedFeedbackReducer,
    myFeedbackFilter: myFeedbackFilterReducer,
    checkInWithManager: checkInWithManagerReducer,
    receivedFeedback: receivedFeedbackReducer,
    suggestionReceivedFilter: suggestionReceivedFilterReducer,
    goalModal: goalModalReducer,
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    [chartApi.reducerPath]: chartApi.reducer,
    [singleEmployeeData.reducerPath]: singleEmployeeData.reducer,
    [slackApi.reducerPath]: slackApi.reducer,
    [feedbackRequestApi.reducerPath]: feedbackRequestApi.reducer,
    [singleRequestedFeedbackApi.reducerPath]: singleRequestedFeedbackApi.reducer,
    [resendMailApi.reducerPath]: resendMailApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
    [teamApi.reducerPath]: teamApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
    [designationApi.reducerPath]: designationApi.reducer,
    [employeeList.reducerPath]: employeeList.reducer,
    [domainList.reducerPath]: domainList.reducer,
    [settingList.reducerPath]: settingList.reducer,
    [reporteeList.reducerPath]: reporteeList.reducer,
    [kpiApi.reducerPath]: kpiApi.reducer,
    [kraApi.reducerPath]: kraApi.reducer,
    [orgAdminSignUpApi.reducerPath]: orgAdminSignUpApi.reducer,
    [companyInfoApi.reducerPath]: companyInfoApi.reducer,
    [analyticsApi.reducerPath]: analyticsApi.reducer,
    [forgotPasswordApi.reducerPath]: forgotPasswordApi.reducer,
    [performanceReviewCycleApi.reducerPath]: performanceReviewCycleApi.reducer,
    [tagsList.reducerPath]: tagsList.reducer,
    [SuggestionTagsList.reducerPath]: SuggestionTagsList.reducer,
    [permissionModulesApi.reducerPath]: permissionModulesApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [feedbackOverviewApi.reducerPath]: feedbackOverviewApi.reducer,
    [dashboardAppreciationApi.reducerPath]: dashboardAppreciationApi.reducer,
    [reviewTimelineApi.reducerPath]: reviewTimelineApi.reducer,
    [checkInWithManagerApi.reducerPath]: checkInWithManagerApi.reducer,
    [dashboardActionItemApi.reducerPath]: dashboardActionItemApi.reducer,
    [managerEmployeeList.reducerPath]: managerEmployeeList.reducer,
    [onboardingFlowApi.reducerPath]: onboardingFlowApi.reducer,
    [managerListApi.reducerPath]: managerListApi.reducer,
    [experienceListApi.reducerPath]: experienceListApi.reducer,
    [genderListApi.reducerPath]: genderListApi.reducer,
    [userActivityLog.reducerPath]: userActivityLog.reducer,
    [employeesByManagerApi.reducerPath]: employeesByManagerApi.reducer,
    [suggestionApi.reducerPath]: suggestionApi.reducer,
    [externalFeedbackApi.reducerPath]: externalFeedbackApi.reducer,
    [organisationApi.reducerPath]: organisationApi.reducer,
    [weightedScoreApi.reducerPath]: weightedScoreApi.reducer,
    [markFeedbackReceievedAsReadApi.reducerPath]: markFeedbackReceievedAsReadApi.reducer,
    [SuggestionPendingCount.reducerPath]: SuggestionPendingCount.reducer,
    [previousGoalActionItemsAPI.reducerPath]: previousGoalActionItemsAPI.reducer, // data
    [previousGoalsActionItemsList.reducerPath]: previousGoalsActionItemsList.reducer, // tags
    [editGoalApi.reducerPath]: editGoalApi.reducer
});

export const setupStore = (preloadedState?: UserState) =>
    configureStore({
        reducer: rootReducer,
        preloadedState: {
            user: userFromStorage
                ? {
                      ...userFromStorage
                  }
                : preloadedState
                ? preloadedState
                : userInitialState,
            checkInWithManager: preloadedState?.checkInWithManagerReduxState
                ? preloadedState?.checkInWithManagerReduxState
                : checkInWithManagerState
        },
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(
                employeeApi.middleware,
                feedbackApi.middleware,
                feedbackRequestApi.middleware,
                authenticationApi.middleware,
                chartApi.middleware,
                resendMailApi.middleware,
                roleApi.middleware,
                slackApi.middleware,
                teamApi.middleware,
                departmentApi.middleware,
                designationApi.middleware,
                employeeList.middleware,
                domainList.middleware,
                settingList.middleware,
                reporteeList.middleware,
                kpiApi.middleware,
                kraApi.middleware,
                orgAdminSignUpApi.middleware,
                companyInfoApi.middleware,
                analyticsApi.middleware,
                forgotPasswordApi.middleware,
                performanceReviewCycleApi.middleware,
                tagsList.middleware,
                SuggestionTagsList.middleware,
                permissionModulesApi.middleware,
                reviewApi.middleware,
                singleEmployeeData.middleware,
                feedbackOverviewApi.middleware,
                dashboardAppreciationApi.middleware,
                reviewTimelineApi.middleware,
                checkInWithManagerApi.middleware,
                dashboardActionItemApi.middleware,
                managerEmployeeList.middleware,
                onboardingFlowApi.middleware,
                managerListApi.middleware,
                genderListApi.middleware,
                experienceListApi.middleware,
                userActivityLog.middleware,
                employeesByManagerApi.middleware,
                suggestionApi.middleware,
                externalFeedbackApi.middleware,
                organisationApi.middleware,
                weightedScoreApi.middleware,
                singleRequestedFeedbackApi.middleware,
                markFeedbackReceievedAsReadApi.middleware,
                SuggestionPendingCount.middleware,
                previousGoalActionItemsAPI.middleware,
                previousGoalsActionItemsList.middleware,
                editGoalApi.middleware
            )
    });

export const store = setupStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
