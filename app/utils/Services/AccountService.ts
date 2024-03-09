import axios from 'axios';
/** base url */
const baseUrl = 'https://uat-opm-account-service.herokuapp.com';

/** business account path */
const path = '/api/v1/wallets';

/** bank information path */
const bankInfoPath = '/api/v1/bank-information';

/** get business account */
export const getWallets = async (uuid: string, options?: any)=> {
    const res = await axios.get(`${baseUrl}${path}/get-wallets/${uuid}`, options);
    return res;
}

/** create pin for wallet */
export const createWalletPin = async (body: Object, options?: any)=> {
    const res = await axios.post(`${baseUrl}${path}/pin/create`, body, options);
    return res;
}

/** create new sub wallet */
export const createSubWallet = async (body: Object, options?: any)=> {
    const res = await axios.post(`${baseUrl}${path}/create`, body, options);
    return res;
}

/** create transaction pin for wallet */
export const changeWalletPin = async (body: Object, options?: any)=> {
    const res = await axios.put(`${baseUrl}${path}/pin/change`, body, options);
    return res;
}

/** get all wallet schemes */
export const getWalletScheme = async (options?: any)=> {
    const res = await axios.get(`${baseUrl}${path}/scheme`, options);
    return res;
}

/** get all saved bank accounts by user id */
export const getSavedBankAccounts = async (userId: string, pageNum: Number, options?: any)=> {
    const res = await axios.get(`${baseUrl}${bankInfoPath}/retrieve/${userId}?pageNumber=${pageNum ?? 1}&pageSize=10`, options);
    return res;
}

/** save bank accounts by user id */
export const saveBankAccount = async (body: any, options?: any)=> {
    const res = await axios.post(`${baseUrl}${bankInfoPath}/save`, body, options);
    return res;
}

/** edit saved bank accounts by user id */
export const editSavedBankAccount = async (body: any, options?: any)=> {
    const res = await axios.put(`${baseUrl}${bankInfoPath}/edit`, body, options);
    return res;
}

/** delete saved bank accounts by user id */
export const deleteSavedBankAccount = async (userId: string, options?: any)=> {
    const res = await axios.delete(`${baseUrl}${bankInfoPath}/delete/${userId}`, options);
    return res;
}