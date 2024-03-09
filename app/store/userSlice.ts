import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserObj } from '../utils/types';
import CONSTANTS from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setToken } from '../utils/api';

const initialState: UserObj = {
  /** data gotten from login endpoint */
  user: {},
  /** data gotten from business info endpoiint */
  businessAcct: {},
  /** individual acount user info object filtered from business account info */
  individualUser: {},
  /** all wallets present in account profile */
  wallets: [],
  notificationToken: "",
  newNotification: false,
  notifications: [],
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    /**saves user object to global state used in auth endpoints */
    saveUser: (state, action: PayloadAction<any>) => {
      console.log(action?.payload)
      state.user = action?.payload;
      /** sets token to request config */
      setToken(action?.payload?.access_token);
      const userObj = JSON.stringify(state.user);
      console.log(userObj)
    },

    /** reset user state on logout */
    resetUser: (state)=> {
      state.user = {};
      setToken('');
      state.businessAcct = {};
      state.individualUser = {};
      AsyncStorage.clear();
    },

    /** updates user state object without saving. Useful for value gotten from storage at app startup */
    updateUserState: (state, action: PayloadAction<any>) => {
      /** payload is expected to be an object that contains user key and token key */
      state.user = action?.payload?.data;
      /** sets token to request config */
      setToken(action?.payload?.data.access_token);
    },

    saveBusiness: (state, action: PayloadAction<any>)=> {
      console.log(action.payload)
      state.businessAcct = action?.payload;
      const accs:Array<any> = action?.payload.individualAccounts;
      console.log("Individual accts: ", accs);
      state.individualUser = accs.filter(acct => acct.uuid = state.user?.userUuid )[0] //first and only object in the array
      console.log("individual user", state.individualUser)
    },

    saveWallets: (state, action: PayloadAction<any>)=> {
      console.log(action.payload);
      state.wallets = action?.payload;
    },

    // sets notification token 
    setNotificationToken: (state, action: PayloadAction<string>) => {
      state.notificationToken = action?.payload;
    },

    setNotification: (state, action: PayloadAction<boolean>) => {
      state.newNotification = action.payload;
    },

    // set list of notifications
    setNewNotifications: (state, action: PayloadAction<any>) => {
      let newNotifications = [...state.notifications];
      newNotifications.push(action.payload);
      state.notifications = newNotifications as any;
      console.log('Notifications from state', state.notifications);
    }

  },
})

// Action creators are generated for each case reducer function
export const { saveUser, resetUser, updateUserState, saveBusiness, saveWallets, setNotificationToken, setNewNotifications, setNotification} = userSlice.actions

export default userSlice.reducer