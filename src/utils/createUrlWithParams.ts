import { createUrlWithParamsTypes } from './types/types';

export const createUrlWithParams = (payload: createUrlWithParamsTypes) => {
    let url = `/${payload.path}`;
    if (payload.params.length === 0) {
        return url;
    } else {
        payload.params.forEach(({ name, value }, index) => {
            if (index == 0) {
                url += name ? `?${name}=${value}` : '';
                return url;
            } else {
                url += name ? `&${name}=${value}` : '';
                return url;
            }
        });
        return url;
    }
};
