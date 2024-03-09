import axios from 'axios';
import {ecommerceBaseUrl} from './EcommerceService';

const productPath = '/api/v1/inventory/product';

/** create new product **/
export const createNewProduct = async (body: any, options?: any)=> {
    const res = await axios.post(`${ecommerceBaseUrl}${productPath}`, body, options);
    return res;
}

/** edit product **/
export const editProduct = async (body: any, options?: any)=> {
    const res = await axios.put(`${ecommerceBaseUrl}${productPath}`, body, options);
    return res;
}

/** get products by category using business uuid and category uuid */
export const getProductByCategory = async (uuid: string, categoryUuid: string, pageNum?: number, options?: any)=> {
    const res = await axios.get(`${ecommerceBaseUrl}${productPath}/filter?businessUuid=${uuid}&categoryUuid=${categoryUuid}&pageNumber=${pageNum ?? 1}&pageSize=10`, options);
    return res;
}

// get product variation by id
export const getProductById = async (id: string, options?: any)=> {
    const res = await axios.get(`${ecommerceBaseUrl}${productPath}/${id}`, options);
    return res;
}

// search product by param
export const searchItems = async (param: string, pageNum?: number, uuid?: string, options?: any)=> {
    const res = await axios.get(`${ecommerceBaseUrl}${productPath}/${uuid}/search?param=${param}&pageNumber=${pageNum ?? 1}&pageSize=10`, options);
    return res;
}

/** delete product by id */
export const deleteProduct = async (id: Object, options?: any)=> {
    const res = await axios.delete(`${ecommerceBaseUrl}${productPath}/${id}`, options);
    return res;
}