import { NavigationProp, Route } from "@react-navigation/native";
import { ReactNode } from "react";
import { Screen, ScreenProps } from "react-native-screens";

/** user structure */
export interface UserObj {
    /** data gotten from login endpoint */
    user: any;
    notificationToken: string;
    newNotification: boolean;
    notifications: Array<any>;
}
/** colors properties contained in theme */
interface Colors {
    primary: {
        main: string;
        100?: string;
        200?: string;
        300?: string;
    };
    success: {
        main: string;
    };
    secondary: {
        main: string;
        100: string;
        200?: string
    }
    warning: {
        main: string;
        100?: string;
    };
    danger: {
        main: string;
    };
    neutral: {
        main: string;
        100?: string;
        200?: string;
        300?: string;
    };
    light: string;
    background: string;
    faintWhite: string;
    faintDark: string;
}

/** general theme of the application */
export interface Theme {
    light: Colors,
    dark: Colors,
}

/** generic interface for routed screens */
export interface Screen {
    navigation: NavigationProp<any, any>;
    route?: Route<any, any>;
    store?: any;
}

export interface AlertConfig {
    title?: string;
    message: string;
    mode?: "success" | "danger" | "neutral",
    /** confirmation callback function */
    // callBack?: Function,
}

/** confrmation alert config */
export interface ConfirmationAlertConfig {
    title?: string;
    message: string;
    mode?: "success" | "danger" | "neutral",
}

/** loading alert config */
export interface LoaderConfig {
    loaderTitle: string;
    loaderSubtitle: string;
}

export interface ModalSettings {
    loaderConfig: LoaderConfig;
    loading: boolean;
    /** contains message and title for alert */
    alert: AlertConfig
    /** determines whether alert is visible */
    alertVisible: boolean;
    /** determines if confirmation modal is visible */
    confirmationVisible: boolean;
    confirmationAlert: ConfirmationAlertConfig;
}

/** declares type for application wide settings/configuratioon */
export interface AppSettings {
    isLoggedIn: boolean;
    isAppReady: boolean;
    themeMode: 'light' | 'dark';
    theme: Colors;
    isLoading: boolean;
    /** contains message and title for alert */
    alert: AlertConfig
    /** determines whether alert is visible */
    alertVisible: boolean;
    // loaderTitle?: string;
    // loaderSubTitle?: string;
    loaderConfig: LoaderConfig;
    confirmationVisible: boolean;
    confirmationAlert: ConfirmationAlertConfig;
    biometricEnabled: boolean;
    hideBalance: boolean;
}

export interface TabIconType {
    focused: boolean;
    title: string;
    iconName: any;
    color: string;
    size: number;
}

export interface AppointmentItemType {
    date: string;
    title: string;
    description: string;
}