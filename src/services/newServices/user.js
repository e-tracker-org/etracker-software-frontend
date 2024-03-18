import request from 'umi-request';
import { API_URL, USER_TOKEN } from '../config/config';

export async function updateUserAccountType(body, userId) {
    return request(`${API_URL}/user-profile/update-account-type/${userId}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: USER_TOKEN,
        },
        body: JSON.stringify(body),
    });
}
