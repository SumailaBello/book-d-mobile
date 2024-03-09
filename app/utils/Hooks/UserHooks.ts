import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import { addBeneficiary, getBeneficiaries, getTransactionInfo } from "../Services/TransactionService";
import { authRequestConfig } from "../api";
import { contactUs, getSummariesForContactUs, updateBusinessInfo, updateUserInfo } from "../Services/UserService";
import axios from "axios";

export const useGetSummaries = () => {
    return useQuery({
        queryKey: 'getContactUsSummaries',
        queryFn: async ()=> {
            return getSummariesForContactUs(authRequestConfig)
            // await axios.get(`https://uat-opm-user-service.herokuapp.com/user/api/v1/support/summaries`, authRequestConfig)
        },
        keepPreviousData: false,
        // refetchOnWindowFocus: true,
    })
}

/** update user account to user profile */ 
export interface updateUserQuery {
    userUuid: string,
    firstName: string,
    lastName: string,
    email: string,
}

/** update user info hook */
export const useUpdateUserInfo = () => {
    return useMutation({
        mutationKey: 'updateUserInfo',
        mutationFn: (query: updateUserQuery)=> updateUserInfo(query, authRequestConfig),
        onError: (error)=> console.log(error),
    })
}

export interface updateBusinessQuery {
    userUuid: string,
    businessCategory: string,
    businessDescription: string,
    businessRcNumber: string,
    businessState: string,
    businessWebsite: string,
    businessTaxIdentificationNumber: string
}

/** update business info hook */
export const useUpdateBusinessInfo = () => {
    return useMutation({
        mutationKey: 'updateBusinessInfo',
        mutationFn: (query: updateBusinessQuery)=> updateBusinessInfo(query, authRequestConfig),
        onError: (error)=> console.log(error),
    })
}

export interface contactQuery {
    businessUuid: string,
    individualUuid: string,
    summary: string,
    message: string,
}

/** send message to support hook */
export const useContactUs = () => {
    return useMutation({
        mutationKey: 'contactUs',
        mutationFn: (query: contactQuery)=> contactUs(query, authRequestConfig),
        onError: (error)=> console.log(error),
    })
}