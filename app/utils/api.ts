
import { AxiosRequestConfig } from 'axios';

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
export let authRequestConfig: AxiosRequestConfig = {
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
  console.log('TOKEN', token);
  authRequestConfig.headers = headers
}

// export const api = {
//   login: '/auth/signin',
//   register: '/auth/signup',
//   verify: 'api/auth/verify',
// };
