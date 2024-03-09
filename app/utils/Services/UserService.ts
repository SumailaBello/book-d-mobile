// import {baseURL} from '../constants';
import axios from 'axios';

/** base url */
const baseUrl = 'https://uat-opm-user-service.herokuapp.com/user';

/** business account path */
const path = '/api/v1/business-account';

const supportPath: string = '/api/v1/support';

export const createBusinessInfo = async (body: Object, options?: any)=> {
    const res = await axios.post(`${baseUrl}${path}/business`, body, options);
    return res;
}

// upload image
export const userDocument = async (uuid: string, docType: string, body: Object, options?: any)=> {
    const res = await axios.post(`${baseUrl}${path}/document?userUuid=${uuid}&documentType=${docType}`, body, options);
    return res;
}

// get business account
export const getBusinessAcct = async (uuid: string, options?: any)=> {
    const res = await axios.get(`${baseUrl}${path}/user-uuid/${uuid}`, options);
    return res;
}

/** update user info */
export const updateUserInfo = async (body: Object, options?: any)=> {
    const res = await axios.put(`${baseUrl}${path}/individual`, body, options);
    return res;
}

/** update business info */
export const updateBusinessInfo = async (body: Object, options?: any)=> {
    const res = await axios.put(`${baseUrl}${path}/business`, body, options);
    return res;
}

/** contact customer support */
export const getSummariesForContactUs = async (options?: any)=> {
    const res = await axios.get(`${baseUrl}${supportPath}/summaries`, options);
    return res;
}

/** contact customer support */
export const contactUs = async (body: Object, options?: any)=> {
    const res = await axios.post(`${baseUrl}${supportPath}`, body, options);
    return res;
}