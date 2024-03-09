import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AlertConfig, AppSettings, ConfirmationAlertConfig, LoaderConfig } from '../utils/types';
import CONSTANTS from '../utils/constants';

const {theme} = CONSTANTS;

const initialState: AppSettings = {
  isLoggedIn: false,
  isAppReady: false,
  themeMode: 'light',
  theme: theme.light,
  isLoading: false,
  loaderConfig: {
    loaderTitle: "Please wait",
    loaderSubtitle: "process will be completed in a jify",
  },
  alert: {
    title: 'Alert',
    message: '',
    mode: "success",
  },
  alertVisible: false,
  confirmationVisible: false,
  confirmationAlert: {
    title: 'Confirmation',
    message: 'Do you want to proceed?',
    // callBack: null,
  },
  biometricEnabled: false,
  hideBalance: false,
}

export const appSettingSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    /** determines whtether user is logged in or not */
    toggleLoggedIn: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isLoggedIn = !state.isLoggedIn;
    },

    toggleReady: (state) => {
        // toggles app ready state
        state.isAppReady = !state.isAppReady;
        console.log(state.isAppReady);
    },

    toggleTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
        // switches theme from light to dark mode
      state.themeMode = action.payload;
      state.theme = action.payload === 'light' ? theme.light : theme.dark
    },

    toggleBiometric: (state, action: PayloadAction<boolean>) => {
        // switches theme from light to dark mode
      state.biometricEnabled = action.payload;
    },

    toggleBalanceVisibility: (state, action: PayloadAction<boolean>) => {
      // switches theme from light to dark mode
      state.hideBalance = action.payload;
    },

  },
})

// Action creators are generated for each case reducer function
export const { toggleLoggedIn, toggleReady, toggleTheme, toggleBiometric, toggleBalanceVisibility } = appSettingSlice.actions

export default appSettingSlice.reducer