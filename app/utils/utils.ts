import { NavigationProp } from '@react-navigation/native';
import constants from './constants';
import {Linking, Platform} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-root-toast';
import { AlertConfig } from './types';
import { shareAsync } from 'expo-sharing';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

// returns masking string
export const maskingString = (str: string, start: number, end: number) => {
  if (!str || start < 0 || start >= str.length || end < 0 || end > str.length || start >= end) {
     return str;
  }
  const maskLength = end - start;
  const maskedStr = str.substring(0, start) + "*".repeat(maskLength) + str.substring(end);
  return maskedStr;
}

export const validatePassword = (value: string)=> {
  // regex for pasword validity
  const lowerCase: RegExp = /[a-z]/;
  const upperCase: RegExp = /[A-Z]/;
  const numEx: RegExp = /[0-9]/;
  if(lowerCase.test(value) && upperCase.test(value) && numEx.test(value) && value.length >=8) {
    return {
      valid: true,
      message: '',
    };
  }
  const errRes = {
    valid: false,
    message: !lowerCase.test(value) ? 'Password must contain a lowercase letter' 
    : !upperCase.test(value) ? 'Password must contain an uppercase letter'
    : !numEx.test(value) ? 'Password must contain a number'
    : value.length < 8 ? 'Password must contain 8 characters' : ''
  }
  return errRes;
}

export const validateEmail = (email?: string | any) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email?.toLowerCase());
};

export const validatePhone = (number: string) => {
  return number.startsWith('234') && number.length === 13
};

export const errorHandler = (error: any)=> {
  const obj: AlertConfig = {
    title: "Action Failed",
    message: error?.response?.data?.message || 'An error occured',
    mode: "danger",
  }
  return obj
}

// handles success response and displays any necessary message to user
export const successHandler = (res: any)=> {
  const obj: AlertConfig = {
    title: "Done",
    message: res?.data?.message || "Action successful",
    mode: "success",
  }
  return obj
}

/** this function simply extracts data from an api response */
export const extractData = (res: any)=> {
  return res.data.data
}

export const formatTime = (seconds: number)=> {
  return new Date(seconds * 1000).toISOString().substring(14, 19)
}

// retuns date in am/pm format
export const formatAMPM = (date: Date)=> {
  let hours = date.getHours();
  let minutes: any = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+ minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

export const getMapOfWeeks = () => {
  const daysOfWeek = new Map();
  daysOfWeek.set('1', 'Sun');
  daysOfWeek.set('2', 'Mon');
  daysOfWeek.set('3', 'Tue');
  daysOfWeek.set('4', 'Wed');
  daysOfWeek.set('5', 'Thu');
  daysOfWeek.set('6', 'Fri');
  daysOfWeek.set('7', 'Sat');

  return daysOfWeek;
};

// global navigation fuction to navigate outside screen or app
export const navigate = (navProps: NavigationProp<any, any>, route: string, params?: any)=> {
  navProps.navigate(route, params);
}

export const copyToClipboard = async (value: string) => {
  await Clipboard.setStringAsync(value);
  Toast.show('Copied to clipboard.', {
    duration: Toast.durations.LONG,
  });
}

export const call = async (value: string) => {
  Linking.openURL(`tel: ${value}`);
}

export const openExternalUrl = async (value: string) => {
  const canOpen = await Linking.canOpenURL(value)
  if(canOpen) Linking.openURL(value);
  else throw new Error('Unable to open Url');
}

export const showToast = async (message: string)=> {
  Toast.show(message);
}

//BASE64 ENCODING
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
export const btoa = (input:string = '')  => {
  let str = input;
  let output = '';

  for (let block = 0, charCode, i = 0, map = chars;
  str.charAt(i | 0) || (map = '=', i % 1);
  output += map.charAt(63 & block >> 8 - i % 1 * 8)) {

    charCode = str.charCodeAt(i += 3/4);

    if (charCode > 0xFF) {
      throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
    }
    
    block = block << 8 | charCode;
  }
  
  return output;
};

/** format date to yyyy-mm-dd */
export const formatDate = (value: Date)=> {
  const year = value.toLocaleString('default', {year: 'numeric'});
  const month = value.toLocaleString('default', {
    month: '2-digit',
  });
  const day = value.toLocaleString('default', {day: '2-digit'});
  const finalDate = year + "-" + month + "-" + day;
  console.log(finalDate);
  return finalDate
}

/** calculate age from given date */
export const calculateAge = (dob: Date)=> { 
  var diff_ms = Date.now() - dob.getTime();
  var age_dt = new Date(diff_ms); 

  return Math.abs(age_dt.getUTCFullYear() - 1970);
}

/** search through a list of items and takes an optional key if list contains object */
export const search = (list: Array<any>, searchTerm: string, key?: string)=> {
  // const key = props.listTitleKey ? props.listTitleKey : null;
  let subList: any = list;
  subList = subList.filter((item: any) => key ? item[key].toLowerCase().includes(searchTerm.toLowerCase()) : item.toLowerCase().includes(searchTerm.toLowerCase()))
  // setList(subList);
  return subList
}

/** holds global confirmation function */
export let confirmationFunction : Function | null; 

/** sets the current value for global confirmation function */
export const setConfirmationFunction = (func: Function | null)=>  confirmationFunction = func;

//NOTIFICATIONS HANDLER
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
// async function sendPushNotification(expoPushToken) {
//   const message = {
//     to: expoPushToken,
//     sound: 'default',
//     title: 'Original Title',
//     body: 'And here is the body!',
//     data: { someData: 'goes here' },
//   };

//   await fetch('https://exp.host/--/api/v2/push/send', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Accept-encoding': 'gzip, deflate',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(message),
//   });
// }

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants?.expoConfig?.extra?.eas.projectId,
    });
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token?.data;
}
