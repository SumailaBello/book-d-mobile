import axios from 'axios';
import {ecommerceBaseUrl} from './EcommerceService';

const variationPath = '/api/v1/inventory/variation';

/** create new product variation **/
export const createNewProductVariation = async (body: any, options?: any)=> {
    const res = await axios.post(`${ecommerceBaseUrl}${variationPath}`, body, options);
    return res;
}

// get product variation by id
export const getVariationById = async (id: string, options?: any)=> {
    const res = await axios.get(`${ecommerceBaseUrl}${variationPath}/${id}`, options);
    return res;
}

// delete product variation by id
export const deleteVariationById = async (id: string, options?: any)=> {
    const res = await axios.delete(`${ecommerceBaseUrl}${variationPath}/${id}`, options);
    return res;
}