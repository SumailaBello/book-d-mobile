import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import { addBeneficiary, getBeneficiaries, getTransactionInfo, getTransactionsByWallet } from "../Services/TransactionService";
import { authRequestConfig } from "../api";
import { getSavedBankAccounts, saveBankAccount } from "../Services/AccountService";

export const useGetTxnInfo = (ref: string) => {
    return useQuery({
        queryKey: 'getTransactionInfo',
        queryFn: ()=> {
            return getTransactionInfo(ref, authRequestConfig)
        },
        keepPreviousData: false,
    })
}

// Add beneficiary account to user profile
export interface AddBeneficiaryQuery {
    userIdentifier: string,
    bankName: string,
    accountName: string,
    bankCode: string,
    accountNumber: string
}

// Add beneficiary account to user profile
export const useAddBeneficiaryQuery = () => {
    return useMutation({
        mutationKey: 'addBeneficiary',
        mutationFn: (query: AddBeneficiaryQuery)=> addBeneficiary(query, authRequestConfig),
        onError: (error)=> console.log(error),
    })
}


//GET LIST OF ADED BANK ACCOUNTS FOR BUSINESS
//we use usequery because this endpoint is not paginated
export const useGetBankAcctsQuery = (userUuid: string, pageNum: number) => {
    return useQuery({
        queryKey: 'getSavedBankAcctsQuery',
        queryFn: ()=> {
            return getSavedBankAccounts(userUuid, pageNum, authRequestConfig);
        },
        keepPreviousData: false,
    })
}

export interface GetBeneficiaryQuery {
    userIdentifier: string,
    // pageNum: number,
}

export const useGetBeneficiaries = (query: GetBeneficiaryQuery) => {
    return useInfiniteQuery({
        queryKey: 'getBeneficiaries',
        keepPreviousData: true,
        queryFn: ({pageParam = 1})=> {
            // console.log("Page Param: ", pageParam);
            return getBeneficiaries(query.userIdentifier, pageParam)
        },
        getNextPageParam: (lastPage: any, allPages: any)=> {
            console.log('last page', lastPage);
            console.log('all pages', allPages);
            // return lastPage?.length > 0 ? allPages?.length + 1 : undefined;
        }
    })
}

export interface addBankAccountQuery {
    userIdentifier: string,
    accountName: string,
    accountNo: string,
    bankName: string,
    bankCode: string | number
}

/** update user info hook */
export const useAddBankAccountQuery = () => {
    return useMutation({
        mutationKey: 'addBankAccountQuery',
        mutationFn: (query: addBankAccountQuery)=> saveBankAccount(query, authRequestConfig),
        onError: (error)=> console.log(error),
    })
}

export interface GetTransactionQuery {
    startDate: string,
    endDate: string,
    walletId: string,
    pageNum: number,
}
// get transacions by wallet and date
export const useGetTransactions = () => {
    return useMutation({
        mutationKey: 'getTransactions',
        mutationFn: (query: GetTransactionQuery)=> {
            // console.log("Page Param: ", pageParam);
            const body = {
                startDate: query.startDate,
                endDate: query.endDate,
                walletId: query.walletId,
            }
            return getTransactionsByWallet(body, query.pageNum, authRequestConfig);
        },
    })
}
