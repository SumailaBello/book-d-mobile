import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import { authRequestConfig } from "../api";
import { getUser, getAppointments, getTeam, toggleAvailability, updateUser } from "../Services/UserService";
import axios from "axios";

/** get user info by user id */
export const useGetUser = (uuid: string) => {
    return useQuery({
        queryKey: 'getUser',
        queryFn: async ()=> {
            return getUser(uuid, authRequestConfig);
        },
        keepPreviousData: false,
        refetchOnWindowFocus: true,
        cacheTime: 0
    })
}

/** get user appointments by user id */
export const useGetAppointment = (uuid: string) => {
    return useQuery({
        queryKey: 'getAppointment',
        queryFn: async ()=> {
            return getAppointments(uuid, authRequestConfig);
        },
        // keepPreviousData: false,
        // refetchOnWindowFocus: true,
    })
}

/** get user team members by user id */
export const useGetTeam = (id: string) => {
    return useQuery({
        queryKey: 'getTeam',
        queryFn: async ()=> {
            return getTeam(id, authRequestConfig);
        },
        // keepPreviousData: false,
        // refetchOnWindowFocus: true,
    })
}

// export interface AddAvailabilityQuery {
//     uuid: string;
//     date: string;
// }

// /** add availability date */
// export const useAddAvailability = () => {
//     return useMutation({
//         mutationKey: 'addAvailability',
//         mutationFn: async (query: AddAvailabilityQuery)=> {
//             return addAvailability(query, authRequestConfig);
//         },
//         // keepPreviousData: false,
//         // refetchOnWindowFocus: true,
//     })
// }

export interface ToggleAvailabilityQuery {
    uuid: string;
    date: string;
    mode: 'add' | 'remove';
}

/** add availability date */
export const useToggleAvailability = () => {
    return useMutation({
        mutationKey: 'toggleAvailability',
        mutationFn: async (query: ToggleAvailabilityQuery)=> {
            return toggleAvailability(query, authRequestConfig);
        },
        // keepPreviousData: false,
        // refetchOnWindowFocus: true,
    })
}

export interface UpdateUserQuery {
    name: string; 
    jobTitle: string; 
    address: string; 
    businessName: string; 
    uuid: string;
}

/** add availability date */
export const useUpdateUser = () => {
    return useMutation({
        mutationKey: 'updateUser',
        mutationFn: async (query: UpdateUserQuery)=> {
            return updateUser(query, authRequestConfig);
        },
        // keepPreviousData: false,
        // refetchOnWindowFocus: true,
    })
}