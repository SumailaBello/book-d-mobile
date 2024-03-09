import axios from 'axios';
import {ecommerceBaseUrl} from './EcommerceService';

const invoicePath = '/api/v1/invoice';

/** create invoice */
export const createInvoice = async (body: Object, options?: any)=> {
    const res = await axios.post(`${ecommerceBaseUrl}${invoicePath}`, body, options);
    return res;
}

// get invoices
// export const getInvoice = async (uuid?: string, pageNum?: number, options?: any)=> {
//     const res = await axios.get(`${ecommerceBaseUrl}${invoicePath}/pages/${uuid}?pageNumber=${pageNum ?? 1}&pageSize=10`, options);
//     return res;
// }

// get invoices
export const getInvoice = async (body?: any, pageNum?: number, options?: any)=> {
    const res = await axios.get(`${ecommerceBaseUrl}${invoicePath}/filter`, {
        ...options,
        params: {
            businessUuid: body.businessUuid,
            startDate: body.startDate,
            endDate: body.endDate,
            pageNumber: pageNum ?? 1,
            pageSize: 10,
            status: body.status,
        }
    });
    return res;
}