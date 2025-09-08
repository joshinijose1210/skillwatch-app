import apiUrls from '@constants/apiUrls';
import axios from 'axios';

export async function renewToken() {
    const refreshToken = JSON.parse(localStorage.getItem('token') as string)?.refresh_token;
    const userId = JSON.parse(localStorage.getItem('user') as string)?.id;
    if (!refreshToken) throw new Error('refresh token does not exist');

    const response = await axios.post(`${apiUrls.login}/refresh-token`, {
        id: userId,
        refreshToken
    });
    const newToken = {
        email: response.data?.authentication?.name,
        authenticated: response.data?.authenticated,
        ...response.data?.authentication?.attributes
    };

    const newAccess = response.data?.authentication?.attributes.access_token;

    return [newAccess, newToken];
}
