import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AlertConfig, ModalSettings, ConfirmationAlertConfig, LoaderConfig } from '../utils/types';
import CONSTANTS from '../utils/constants';
import { createSelector } from 'reselect';

const {theme} = CONSTANTS;

const initialState: ModalSettings = {
  loaderConfig: {
    loaderTitle: "Please wait",
    loaderSubtitle: "process will be completed in a jify",
  },
  loading: false,
  alert: {
    title: 'Alert',
    message: '',
    mode: 'neutral',
  },
  alertVisible: false,
  confirmationVisible: false,
  confirmationAlert: {
    title: 'Confirm',
    message: 'Do you want to proceed?',
    mode: 'neutral',
  },
}

export const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    /**toggles application loading state */
    toggleLoading: (state, action: PayloadAction<LoaderConfig | undefined>) => {
      state.loading = !state.loading;
      state.loaderConfig.loaderTitle = action?.payload?.loaderTitle ?? "Please wait";
      state.loaderConfig.loaderSubtitle = action?.payload?.loaderSubtitle ?? "process will be completed in a jiffy";
    },
    /**toggles application wide alert modal with */
    toggleAlert: (state, action: PayloadAction<AlertConfig>) => {
      state.alertVisible = !state.alertVisible;
      if(state.alertVisible) {
        state.alert.title = action.payload.title ?? 'Alert';
        state.alert.message = action.payload.message ?? '';
        state.alert.mode = action.payload.mode;
      } 
    },

    /** toggle app wide confirmation modal */
    toggleConfirmation: (state, action: PayloadAction<ConfirmationAlertConfig>) => {
      state.confirmationVisible = !state.confirmationVisible;
      if(state.confirmationVisible) {
        state.confirmationAlert.title = action?.payload?.title ?? 'Confirm';
        state.confirmationAlert.message = action?.payload?.message ?? 'Do you want to proceed?';
        state.confirmationAlert.mode = action?.payload?.mode ?? 'neutral';
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  toggleLoading,
  toggleAlert, 
  toggleConfirmation,
} = modalSlice.actions

export default modalSlice.reducer