import CONSTANTS from '../constants';
import axios from 'axios';

//base url
const {baseUrl} = CONSTANTS;

/** auth path */
const path: string = 'auth';

/** log in user */
export const login = async (body: Object, options?: any)=> {
    const res = await axios.post(`${baseUrl}/${path}/login`, body, options);
    return res;
}

/** register user */
export const register = async (body: Object, options?: any)=> {
    const res = await axios.post(`${baseUrl}/${path}/register`, body, options);
    return res;
}

/** forgot password */
export const forgotPassword = async (body: Object, options?: any)=> {
    const res = await axios.post(`${baseUrl}/${path}/forgot-password`, body, options);
    return res;
}

/** confirm otp */
export const confirmOtp = async (body: Object, options?: any)=> {
    const res = await axios.post(`${baseUrl}/${path}/confirm-otp`, body, options);
    return res;
}

/** resend otp */
export const resendOtp = async (body: Object, options?: any)=> {
    const res = await axios.post(`${baseUrl}/${path}/resend-otp`, body, options);
    return res;
}

/** reset password */
export const resetPassword = async (body: Object, options?: any)=> {
    const res = await axios.post(`${baseUrl}/${path}/reset-password`, body, options);
    return res;
}
