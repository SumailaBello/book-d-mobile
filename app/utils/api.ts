
import { AxiosRequestConfig } from 'axios';
import { getToken } from './Services/AuthService';
import { btoa } from './utils';

const timeoutDuration: number = 120000;
const timeoutMessage: string = 'Connection timed out';

/** access token */
export let accessToken = '';

/** defines config for requests that does not require authentication */
export let requestConfig = {
  timeout: timeoutDuration, 
  timeoutErrorMessage: timeoutMessage,
}

/** defines authentication config for requests that require authentication */
export let authRequestConfig = {
  timeout: timeoutDuration,
  timeoutErrorMessage: timeoutMessage,
  headers: {
  }
};

export const setToken = (token: string)=> {
  accessToken = token;
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
  };
  console.log(token);
  authRequestConfig.headers = headers
}

/** get auth token */
export const fetchAuthToken = async ()=> {
  const body = {
    grant_type: "client_credentials",
  }

  const base64Val = btoa('optima-mobile-service:secret');
  // console.log(base64Val);
  const config = {
    timeout: 120000,
    timeoutErrorMessage: 'Connection timed out',
    headers: {
      'Authorization': `Basic ${base64Val}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    // auth: {
    //     username: uname,
    //     password: pass
    // }
  };

  try {
    const res = await getToken(body, config);
    // const res = await getToken(body);
    console.log("res", res);
    console.log(res.data);
    const token = res.data.access_token;
    setToken(token);
  }
  catch(err) {
    console.log(err)
  }
}

// export const api = {
//   login: '/auth/signin',
//   register: '/auth/signup',
//   verify: 'api/auth/verify',
// };
