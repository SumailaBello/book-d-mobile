import axios from 'axios';
import { accessToken } from '../api';

/** base url */
const baseUrl = 'https://uat-opm-notification-service.herokuapp.com/notification';
const path = '/api/v1/push_notification';

// save device token to server
export const pushUserToken = async (body: Object, options?: any)=> {
    const res = await axios.post(`${baseUrl}${path}/user`, body, options);
    return res;
}

// get latest notifications
export const getPushNotificatioins = async (email: string, options?: any)=> {
    const res = await axios.get(`${baseUrl}${path}/request/unread/${email}`, options);
    return res;
}