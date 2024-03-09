// import {baseURL} from '../constants';
import axios from 'axios';
import { accessToken } from '../api';

/** base url */
const baseUrl = 'https://uat-opm-file-service.herokuapp.com/file';

/** business account path */
const path = '/api/v1/storage';

export const docType = {
    profilePicture: 'PROFILE_PICTURE',
    logo: 'LOGO',
    id: 'MEANS_OF_IDENTIFICATION',
    product: 'E_COMMERCE_PRODUCT',
    customer: 'E_COMMERCE_CUSTOMER',
    general: 'GENERAL',
}

// upload doc file to file service
export const uploadFile = async (body: Object, options?: any)=> {
    const res = await axios.post(`${baseUrl}${path}/folder/file`, body, options);
    return res;
}

// upload file to file service
export const uploadToFileService = async (file: any, businessAcct: any, type: any /**doctype */ )=> {
    const uri = file.uri;
    const imageType = uri?.split('.')[uri?.split('.').length - 1];
    // console.log("Image: ", image)
    const body = new FormData();
    body.append("file", {
        // Passing an object only works on Android and iOS and uri works on only web
        uri: uri, 
        type: `image/${imageType}`, 
        name: `photo.${imageType}`,
    } as any)
    // body.append("file", file.base64);
    body.append("businessUuid", businessAcct?.uuid);
    body.append("location", 'GOOGLE_DRIVE');
    body.append("docType", type);
    // body.append("permission", 'ANYONE');
    const config = {
        timeout: 120000,
        timeoutErrorMessage: 'Connection timed out',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
        },
    };
    console.log("Body: ", body)
    // try {
        const res = await uploadFile(body, config);
        // const res = await uploadFile(body, authRequestConfig);
        return res
    // }
    // catch(err) {
    //     console.log(err);
    //     throw err
    // }
  }