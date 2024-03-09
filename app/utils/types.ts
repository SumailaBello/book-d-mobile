import { NavigationProp, Route } from "@react-navigation/native";
import { ReactNode } from "react";
import { Screen, ScreenProps } from "react-native-screens";

/** user structure */
export interface UserObj {
    /** data gotten from login endpoint */
    user: any;
    /**business information data gotten from business info endpoint */
    businessAcct: any;
    /** individual acount user info object filtered from business account info */
    individualUser: any;
    /** all wallets present in account profile */
    wallets: Array<any>;
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
    warning?: {
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
    isLoading: boolean;
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

export interface ReceiptItemType {
    title: string,
    description: string,
    amount: string,
    date: string,
    type: 'debit' | 'credit',
    status: 'successful' | "pending" | "failed",
}

//invoice object gotten from get endpoints
export interface InvoiceItemType {
    id: number,
    uuid: string,
    businessUuid: string,
    customer: {
        id: number,
        fullName: string,
        email: string,
        businessUuid: string,
        uuid: string,
        phoneNumber: string,
        address: string,
        state: string,
        profilePicture: {
            id: number,
            documentName: string,
            uuid: string,
            storageId: string,
            locationUrl: string,
            documentType: 'E_COMMERCE_PRODUCT' | 'E_COMMERCE_CUSTOMER'
        }
    },
    products: [
        {
            id: number,
            uuid: string,
            name: string,
            productUuid: string,
            description: string,
            unitPrice: number,
            quantity: number,
            discount: {
                discountAmount: number,
                discountPercentage: number
            }
        }
    ],
    invoiceNumber: string,
    currency: 'NAIRA',
    totalPriceBeforeVat: number,
    totalPriceAfterVat: number,
    createdAt: string,
    invoiceTimestamp: Date,
    description: string,
    vat: number,
    saleMedium: 'PHYSICAL' | 'SOCIAL_MEDIA' | 'ONLINE_STORE',
    paymentMethod: 'OPTIMA' | 'BANK_ACCOUNT' | 'CASH',
    status: 'PAID' | 'UNPAID' | 'PARTLY_PAID',
    discount: {
        discountAmount: number,
        discountPercentage: number
    },
    accountInfo: {
        bankName: string,
        accountNumber: string,
        accountName: string
    }
}

export interface BankType {
    active: boolean;
    code: string;
    country: string;
    currency: string;
    longcode: string;
    name: string
    slug: string;
}

interface ProductImageType {
    documentName: string,
    storageId: string,
    locationUrl: string,
}
export interface ProductType {
    id: number,
    name: string,
    categoryUuid: string,
    businessUuid: string,
    quantity: number,
    unitPrice: number,
    productType: string,
    productImages: Array<ProductImageType>,
    link: string,
    tags: Array<string>,
    description?: string,
    sku?: string,
    variations: Array<any>
}

export interface ProductVariation {
    id?: number,
    name: string,
    productUuid: string,
    businessUuid: string,
    quantity?: number,
    unitPrice?: number,
    sku?: string
}

// product object gotten from
// export interface invoiceProductType {
//     id: number,
//     productUuid: string,
//     reviewedPrice: number,
//     name: string,
//     quantity: number,
// }

export interface invoiceAccountInfo {
    bankName: string,
    accountNumber: string,
    accountName: string,
}

export interface invoiceProduct {
    id?: number,
    productUuid: string,
    unitPrice: number,
    name: string,
    quantity: number,
    variationUuid?: string,
    discount: {
        discountAmount: number,
        discountPercentage: number,
      }
}

// used to create invoice
export interface invoiceType {
    // invoiceNumber: string,
    businessUuid: string,
    customerUuid: string,
    id?: number,
    products: Array<invoiceProduct>,
    paymentMethod: "OPTIMA" | "BANK_ACCOUNT" | "CASH",
    currency: "NAIRA",
    customerPrefix?: string,
    createdAt: string,
    description: string,
    saleMedium: "PHYSICAL" | "SOCIAL_MEDIA" | "ONLINE_STORE",
    status: "PAID" | "UNPAID" | "PARTLY_PAID",
    discount: {
      discountAmount?: number,
      discountPercentage?: number,
    },
    accountInfo?: invoiceAccountInfo,
}

export interface bankAccountType {
    id?: number,
    userIdentifier: string,
    accountName: string,
    accountNo: string,
    bankName: string,
    bankCode: string,
    image?: string
}

export interface transactionType {
    id: number,
    walletId: string,
    bankId: string,
    title: string,
    provider: string,
    internalReference: string,
    externalReference: string,
    identifier: string,
    type: string,
    settledAmount: number,
    transactionFee: number,
    totalAmount: number,
    providerFee: number,
    balanceBefore: number,
    balanceAfter: number,
    status: 'PENDING' | 'SUCCESSFUL' | 'FAILED' | 'REQUERYING' | 'QUEUED_FOR_REQUERY_LATER' | 'UNKNOWN',
    sessionId: string,
    settlementId: string,
    narration: string,
    description: string,
    transactionMeta: string,
    providerMeta: string,
    providerResponse: string,
    txnTime: string,
    timestamps: string,
    parentTransactionId: string
}

export interface notificationType {
    id: string,
    email: string,
    subject: string,
    content: string,
    dateCreated: string,
    dateRead: string,
    pushNotificationStatus: "SENT" | 'PENDING' | 'READ' | 'ERROR'
}
