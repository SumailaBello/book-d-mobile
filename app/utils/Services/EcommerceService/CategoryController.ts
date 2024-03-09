import axios from 'axios';
import {ecommerceBaseUrl} from './EcommerceService';

const categoryPath = '/api/v1/inventory/category';

// get all categories
export const getCategories = async (uuid: string, pageNum?: number, options?: any)=> {
    // const res = await axios.get(`${ecommerceBaseUrl}${customerPath}/pages/${uuid}`, options);
    const res = await axios.get(`${ecommerceBaseUrl}${categoryPath}/pages?pageNumber=${pageNum ?? 1}&pageSize=10`, options);
    return res;
}

// search categories by param
export const searchCategories = async (param: string, pageNum?: number, options?: any, uuid?: string)=> {
    const res = await axios.get(`${ecommerceBaseUrl}${categoryPath}/search?param=${param}&pageNumber=${pageNum ?? 1}&pageSize=10`, options);
    return res;
}

/** create new product category **/
export const createNewCategory = async (body: any, options?: any)=> {
    const res = await axios.post(`${ecommerceBaseUrl}${categoryPath}`, body, options);
    return res;
}

/** edit product category **/
export const editProductCategory = async (body: any, options?: any)=> {
    const res = await axios.put(`${ecommerceBaseUrl}${categoryPath}`, body, options);
    return res;
}

/** delete product category **/
export const deleteProductCategory = async (id: string, options?: any)=> {
    const res = await axios.delete(`${ecommerceBaseUrl}${categoryPath}/${id}`, options);
    return res;
}