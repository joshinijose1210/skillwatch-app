import axios from 'axios';
import { addToast } from '@medly-components/core';

export const downloadCSV = async (url: string, fileName: string) => {
    try {
        const Token = JSON.parse(localStorage.getItem('token') as string)?.access_token;
        const result = await axios({
            url,
            headers: {
                Authorization: `Bearer ${Token}`
            }
        });
        if (result.data) {
            const url = window.URL.createObjectURL(new Blob(['\ufeff', result.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${fileName}.csv`);
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
        }
    } catch (err) {
        addToast({
            variant: 'error',
            header: 'Something went wrong.',
            timer: 3000
        });
    }
};
