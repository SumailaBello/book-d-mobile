import { useMutation, useQuery } from "react-query";
import { authRequestConfig, requestConfig } from "../api";
import { confirmOtp, forgotPassword, login, register, resendOtp, resetPassword } from "../Services/AuthService";

//REGISTER
/** register query body */
export interface RegisterQuery {
    name: string
    email: string,
    businessName: string,
    jobTitle: string,
    address: string,
    password: string,
}

/** register user custom hook */
export const useRegister = () => {
    return useMutation({
        mutationKey: 'register',
        mutationFn: (query: RegisterQuery)=> register(query, requestConfig),
        onError: (error)=> console.log(error),
    })
}

//LOGIN
/** login query body */
export interface LoginQuery {
    email: string,
    password: string,
}

/** login user custom hook */
export const useLogin = () => {
    return useMutation({
        mutationKey: 'login',
        mutationFn: (query: LoginQuery)=> login(query, requestConfig),
        // onError: (error)=> console.log(error),
    })
}

//REQUEST FORGOT PASSWORD OTP
export interface ForgotPasswordQuery {
    email: string,
}

/** forgot password custom hook */
export const useForgotPassword = () => {
    return useMutation({
        mutationKey: 'forgotPassword',
        mutationFn: (query: ForgotPasswordQuery)=> forgotPassword(query, requestConfig),
        onError: (error)=> console.log(error),
    })
}

//CONFIRM OTP
export interface ConfirmOtpQuery {
    email: string,
    otp: string,
}

/** confirm otp custom hook */
export const useConfirmOtp = () => {
    return useMutation({
        mutationKey: 'confirmOtp',
        mutationFn: (query: ConfirmOtpQuery)=> confirmOtp(query, requestConfig),
        onError: (error)=> console.log(error),
    })
}

//RESET PASSWORD
export interface ResetPasswordQuery {
    otp: string,
    password: string
}

/** reset password custom hook */
export const useResetPassword = () => {
    return useMutation({
        mutationKey: 'resetPassword',
        mutationFn: (query: ResetPasswordQuery)=> resetPassword(query, requestConfig),
        onError: (error)=> console.log(error),
    })
}

//RESEND OTP
/** resend otp incase previous one wasn't received */
export interface ResendOtpQuery {
    email: string,
}

/** resend otp custom hook */
export const useResendOtp = () => {
    return useMutation({
        mutationKey: 'resendOtp',
        mutationFn: (query: ResendOtpQuery)=> resendOtp(query, requestConfig),
        onError: (error)=> console.log(error),
    })
}
