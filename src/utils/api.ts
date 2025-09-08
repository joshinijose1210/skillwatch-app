import { routeConstants } from '@constants';
import axios from 'axios';
import { createBrowserHistory } from 'history';
import { renewToken } from './refreshToken';

const { API_URL } = process.env;
const IS_TEST_ENV = process.env.NODE_ENV && process.env.NODE_ENV === 'test' ? true : false;
export const apiInstance = axios.create({
    baseURL: API_URL
});

const navigateTo = (url: string, state: any) => {
    createBrowserHistory().push(url, state);
    window.location.reload();
};

const path = window.location.pathname;

let refreshingFunc: Promise<any[]> | [any, any] | PromiseLike<[any, any]> | undefined = undefined;

apiInstance.interceptors.response.use(
    res => res,
    async error => {
        if (IS_TEST_ENV) return Promise.reject(error);
        const originalConfig = error.config;
        const { refresh_token: refreshToken = '' } = JSON.parse(localStorage.getItem('token') as string);
        const paths = path.split('/');
        const loginRoute = paths.length > 1 && paths[1] === 'admin' ? routeConstants.superAdminLogin : routeConstants.login;
        const productionPath = paths.length > 1 && paths[1] === 'admin' ? '/app/admin/login' : '/app/login';
        const loginPath = process.env.MODE !== 'production' ? loginRoute : `${window.location.origin}${productionPath}`;
        // if we don't have token in local storage or error is not 401 just return error and break req.
        if (!refreshToken) {
            localStorage.removeItem('token');
            navigateTo(loginPath, { error: true, header: 'Session expired. Please log in again' });
        }

        if (error.response?.status === 401) {
            try {
                // the trick here, that `refreshingFunc` is global, e.g. 2 expired requests will get the same function pointer and await same function.
                if (!refreshingFunc) refreshingFunc = renewToken();

                const [newAccessToken, newToken] = await refreshingFunc;

                localStorage.setItem('token', JSON.stringify(newToken));

                originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;

                // retry original request
                try {
                    return await axios.request(originalConfig);
                } catch (innerError) {
                    // if original req failed with 401 again - it means server returned not valid token for refresh request
                    if (error?.response?.status === 401) {
                        throw innerError;
                    }
                }
            } catch (err) {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                navigateTo(loginPath, {
                    error: true,
                    header: 'Session expired. Please log in again'
                });
                // await axios.post(`${VITE_API_URL}/logout`, { email });
            } finally {
                refreshingFunc = undefined;
            }
        } else if (error.response?.status === 500) {
            createBrowserHistory().push(routeConstants.error500, { prevUrl: window.location.pathname });
            window.location.reload();
        } else if (error.response?.status === 502) {
            createBrowserHistory().push(routeConstants.error502, { prevUrl: window.location.pathname });
            window.location.reload();
        } else if (error.response?.status === 403 || error.response?.status === 503) {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            createBrowserHistory().push(loginPath, {
                error: true,
                header: 'Permission Denied',
                message: 'You do not have the permission to access the page, please contact your administrator.'
            });
            window.location.reload();
        } else return Promise.reject(error);
    }
);

export default apiInstance;
