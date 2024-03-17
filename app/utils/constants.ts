import {Dimensions, Platform} from 'react-native';
import { Theme } from './types';

const {height, width} = Dimensions.get('window');
/** base url for API service */
const baseUrl = 'https://bookd.onrender.com';

// export const baseURL = '';

const month = new Array();
month[0] = 'January';
month[1] = 'February';
month[2] = 'March';
month[3] = 'April';
month[4] = 'May';
month[5] = 'June';
month[6] = 'July';
month[7] = 'August';
month[8] = 'September';
month[9] = 'October';
month[10] = 'November';
month[11] = 'December';

const date = new Date();

export interface SortVal {
  title: string,
  subtitle: string,
  startValue: string,
  endValue: string,
}

/** adds 0 to single digit date values */
const formatDateDigits = (digits: number)=> {
  const stringDigits = String(digits); //string representation of digits
  if(stringDigits) {
    if(stringDigits.length === 1) {
      return '0' + stringDigits;
    }
    return stringDigits;
  }

}

const dateSortList: Array<SortVal> = [
  {
    title: "This Month",
    subtitle: month[date.getMonth()],
    startValue: date.getFullYear().toString() + "-" + (formatDateDigits(date.getMonth() + 1)) + "-" + "01",
    endValue: date.getFullYear().toString() + "-" + (formatDateDigits(date.getMonth() + 1)) + "-" + formatDateDigits(date.getDate()),
  },
  {
    title: "Last Month",
    subtitle: month[date.getMonth() - 1],
    startValue: date.getFullYear().toString() + "-" + formatDateDigits(date.getMonth()) + "-" + "01",
    endValue: date.getFullYear().toString() + "-" + formatDateDigits(date.getMonth()) + "-" + new Date(date.getFullYear(), date.getMonth(), 0).getDate(),
  },
  {
    title: 'This Year',
    subtitle: date.getUTCFullYear(),
    startValue: date.getFullYear().toString() + "-" + '01' + "-" + "01",
    endValue: date.getFullYear().toString() + "-" + (formatDateDigits(date.getMonth() + 1)) + "-" + formatDateDigits(date.getDate()),
  },
  {
    title: 'All Time',
    subtitle: '',
    startValue: '2024-01-01',
    endValue: date.getFullYear().toString() + "-" + (formatDateDigits(date.getMonth() + 1)) + "-" + formatDateDigits(date.getDate()),
  }
]


const theme: Theme = {
  /**LIGHT MODE COLOR PALETTE */
  light: {
    primary: {
      main: "#8f89b7",
      100: "#f1f6fe",
      200: "#c7d7fb",
    },
    success: {
      main: "#00C75B",
    },
    danger: {
      main: "#FF2D2D",
    },
    secondary: {
      main: '#f1b0da',
      100: '#fcecf6',
    },
    warning: {
      main: '#fec4b7',
      100: '#fff3f0',
    },
    neutral: {
      main: "#808080",
      100: "#f8f8f8",
      200: "#F1F1F1",
      /** black with 10percent opacity */
      300: "#E5E5E5",
    },
    light: "#FFFFFF",
    background: '#FFFFFF',
    faintWhite: "rgba(255, 255, 255, 0.1)",
    faintDark: "rgba(0, 0, 0, 0.1)",
  },
  /**DARK MODE COLOR PALETTE */
  dark: {
    primary: {
      main: "#057B89",
      100: "#E6F4F1",
      200: "#70CF89",
    },
    success: {
      main: "#00C75B",
    },
    danger: {
      main: "#FF2D2D",
    },
    secondary: {
      main: '#f1b0da',
      100: '#fcecf6',
    },
    warning: {
      main: '#fec4b7',
      100: '#fff3f0',
    },
    neutral: {
      main: "#808080",
      100: "#f8f8f8",
      200: "#F1F1F1",
      /** black with 10percent opacity */
      300: "#E5E5E5",
    },
    light: "#FFFFFF",
    background: '#141414',
    faintWhite: "rgba(255, 255, 255, 0.1)",
    faintDark: "rgba(0, 0, 0, 0.1)",
  }
}

const CONSTANTS =  {
  DEVICE_WIDTH: width,
  DEVICE_HEIGHT: height,
  IS_IOS: Platform.OS === 'ios',
  IS_ANDROID: Platform.OS === 'android',
  month,
  theme,
  dateSortList,
  baseUrl
};

export default CONSTANTS
