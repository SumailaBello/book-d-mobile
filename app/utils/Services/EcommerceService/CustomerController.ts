import axios from 'axios';
import {ecommerceBaseUrl} from './EcommerceService';

const customerPath = '/api/v1/customer';

// get customers by business uuid
export const getCustomers = async (uuid: string, pageNum?: number, options?: any)=> {
    // const res = await axios.get(`${ecommerceBaseUrl}${customerPath}/pages/${uuid}`, options);
    const res = await axios.get(`${ecommerceBaseUrl}${customerPath}/pages/${uuid}?pageNumber=${pageNum ?? 1}&pageSize=10`, options);
    return res;
}

// search customers by param
export const searchCustomers = async (param: string, pageNum?: number, options?: any, uuid?: string)=> {
    const res = await axios.get(`${ecommerceBaseUrl}${customerPath}/search?param=${param}&pageNumber=${pageNum ?? 1}&pageSize=10`, options);
    return res;
}

/** create customer */
export const createNewCustomer = async (body: Object, options?: any)=> {
    const res = await axios.post(`${ecommerceBaseUrl}${customerPath}`, body, options);
    return res;
}

/** update customer */
export const updateCustomer = async (body: Object, options?: any)=> {
    const res = await axios.put(`${ecommerceBaseUrl}${customerPath}`, body, options);
    return res;
}

/** delete customer by id */
export const deleteCustomer = async (id: Object, options?: any)=> {
    const res = await axios.delete(`${ecommerceBaseUrl}${customerPath}/${id}`, options);
    return res;
}