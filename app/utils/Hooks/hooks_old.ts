import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import { addBeneficiary, getBeneficiaries } from "../Services/TransactionService";
import { authRequestConfig } from "../api";
  
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

// Add beneficiary account to user profile
// export interface AddBeneficiaryQuery {
//     userIdentifier: string,
//     bankName: string,
//     accountName: string,
//     bankCode: string,
//     accountNumber: string
// }

// export const useAddBeneficiary = () => {
//     return useMutation({
//         mutationKey: 'addBeneficiary',
//         mutationFn: (query: AddBeneficiaryQuery)=> addBeneficiary(query, authRequestConfig),
//         onError: (error)=> console.log(error),
//     })
// }