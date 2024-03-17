import CONSTANTS from '../constants';
import axios from 'axios';

//base url
const {baseUrl} = CONSTANTS;
/** auth path */
const path: string = 'user';

/** get user info by id */
export const getUser = async (uuid: string, options?: any)=> {
    // console.log('SERVICE UUID', options)
    const res = await axios.get(`${baseUrl}/${path}/${uuid}`, options);
    return res;
}

/** update user */
export const updateUser = async (body: any, options?: any)=> {
    const res = await axios.patch(`${baseUrl}/${path}/update`, body, options);
    return res;
}

export const getAppointments = async (uuid: string, options?: any)=> {
    const res = await axios.get(`${baseUrl}/${path}/appointments/${uuid}`, options);
    return res;
}

export const getTeam = async (userId: string, options?: any)=> {
    const res = await axios.get(`${baseUrl}/${path}/team/${userId}`, options);
    return res;
}

/** toggle availability */
export const toggleAvailability = async (body: any, options?: any)=> {
    const res = await axios.post(`${baseUrl}/${path}/availability/toggle`, body, options);
    return res;
}
