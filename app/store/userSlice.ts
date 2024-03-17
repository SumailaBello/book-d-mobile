import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserObj } from '../utils/types';
import CONSTANTS from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setToken } from '../utils/api';

const initialState: UserObj = {
  /** data gotten from login endpoint */
  user: {},
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
      console.log(action?.payload);
      state.user = action?.payload?.user;
      /** sets token to request config */
      setToken(action?.payload?.token);
      AsyncStorage.setItem('user', JSON.stringify(action?.payload.user));
      AsyncStorage.setItem('token', action?.payload?.token);
    },

    /** reset user state on logout */
    resetUser: (state)=> {
      state.user = {};
      setToken('');
      AsyncStorage.clear();
    },

    /** updates user state object without saving. Useful for value gotten from storage at app startup */
    updateUserState: (state, action: PayloadAction<any>) => {
      /** payload is expected to be an object that contains user key and token key */
      state.user = action?.payload
      AsyncStorage.setItem('user', JSON.stringify(action?.payload));
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
export const { saveUser, resetUser, updateUserState, setNotificationToken, setNewNotifications, setNotification} = userSlice.actions

export default userSlice.reducer