// import {baseURL} from '../constants';
import axios from 'axios';

/** base url */
const baseUrl = 'https://uat-opm-auth-service.herokuapp.com/auth';

/** user auth path */
const userAuthPath = '/api/v1/user';

export const getToken = async (body: Object, options?: any)=> {
    const res = await axios.post(`${baseUrl}/oauth/token`, body, options);
    return res;
    // const res = await axios.post(`${baseUrl}/oauth/token`, body, {
    //     auth: {
    //       username: 'optima-auth-service',
    //       password: 'secret',
    //     },
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //     }
    // });
    // return res
}

/** signup step 1; request email verification */
export const requestEmailVerification = async (body: Object, options?: any)=> {
    const res = await axios.post(`${baseUrl}${userAuthPath}/request-email-verification`, body, options);
    return res;
}

/** signup step 2; verify email */
export const verifyEmail = async (body: Object, options?: any)=> {
    const res = await axios.post(`${baseUrl}${userAuthPath}/verify-email`, body, options);
    return res;
}

/** signup step 3; complete registration */
export const completeRegistration = async (body: Object, options?: any)=> {
    const res = await axios.post(`${baseUrl}${userAuthPath}/complete-registration`, body, options);
    return res;
}

/** logs in user */
export const userLogin = async (body: Object, options?: any)=> {
    const res = await axios.post(`${baseUrl}/oauth/token`, body, options);
    return res;
}

/** request forgot password */
export const requestForgotPassword = async (email: string, options?: any)=> {
    const res = await axios.post(`${baseUrl}${userAuthPath}/request-forgot-password/${email}`, {}, options);
    return res;
}

/** forgot password */
export const forgotPassword = async (body: Object, options?: any)=> {
    const res = await axios.post(`${baseUrl}${userAuthPath}/forgot-password`, body, options);
    return res;
}
