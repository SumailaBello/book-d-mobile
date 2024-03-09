import axios from 'axios';
import { authRequestConfig } from '../api';
/** transaction service base url */
const baseUrl = 'https://uat-opm-transaction-service.herokuapp.com';

/** transfer service path */
const path = '/api/v1/transfer';

/** transaction processor path */
// const transactionProcessorBaseUrl = 'https://uat-opm-transaction-processor.herokuapp.com';

/** transaction processor path */
const transactionProcessorPath = '/api/v1/transactions';

/** beneficiary path */
const beneficiaryPath: string = '/api/beneficiaries'

// get list of banks
export const getBankList = async (options?: any)=> {
    const res = await axios.get(`${baseUrl}${path}/banks`, options);
    return res;
}

/** get account name for provided account number and bank code */
export const getAccountName = async (body: Object, options?: any)=> {
    const res = await axios.post(`${baseUrl}${path}/inquiry`, body, options);
    return res;
}

/** gets transaction fees */
export const getTransactionFees = async (body: Object, options?: any)=> {
    const res = await axios.post(`${baseUrl}${path}/fees`, body, options);
    return res;
}

/** transfer the funds */
export const transfer = async (body: Object, options?: any)=> {
    const res = await axios.post(`${baseUrl}${path}`, body, options);
    return res;
}

/** get transactions by wallet number / date **/
export const getTransactionsByWallet = async (body: Object, pageNum?: number, options?: any)=> {
    const res = await axios.post(`${baseUrl}${transactionProcessorPath}/by-date?pageNumber=${pageNum}`, body, options);
    // const res = await axios.get(`${baseUrl}${transactionProcessorPath}/wallet/${walletAcctNo}?pageNumber=${pageNum}&pageSize=10`, options);
    return res;
}

/** get transactions by wallet number / date **/
// export const getTransactionsByWallet = async (walletAcctNo: number, pageNum?: number, options?: any)=> {
//     const res = await axios.get(`${baseUrl}${transactionProcessorPath}/wallet/${walletAcctNo}?pageNumber=${pageNum}&pageSize=10`, options);
//     return res;
// }

/** get all transactions by business uuid **/
export const getTransactions = async (uuid: string, pageNum?: number, options?: any)=> {
    const res = await axios.get(`${baseUrl}${transactionProcessorPath}/${uuid}?pageNumber=${pageNum}&pageSize=50`, options);
    return res;
}

/** initiate card fund **/
export const initiateCardFund = async (body: Object, options?: any)=> {
    const res = await axios.post(`${baseUrl}${path}/fund-account`, body, options);
    return res;
}

/** get transaction info by reference */
export const getTransactionInfo = async (ref: string, options?: any)=> {
    const res = await axios.get(`${baseUrl}${transactionProcessorPath}/info/${ref}`, options);
    return res;
}


//BENEFICIARY
export const getBeneficiaries = async (userIdentifier: string, pageNum?: number, options?: any)=> {
    const res = await axios.get(`${baseUrl}${beneficiaryPath}/get?pageNumber=1`, 
    {
        ...authRequestConfig,
        params: {
            userIdentifier: userIdentifier,
            // pageNumber: pageNum
        }
    }
    );
    return res.data.data;
}

// save beneficiary
export const addBeneficiary = async (body: Object, options?: any)=> {
    const res = await axios.post(`${baseUrl}${beneficiaryPath}/add`, body, options);
    return res;
}