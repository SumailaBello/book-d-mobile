import { configureStore } from '@reduxjs/toolkit'
import appSettingsReducer from './appSettings';
import userSliceReducer from './userSlice';
import modalSliceReducer from './modalSlice';

export const store = configureStore({
  reducer: {
    appSetting: appSettingsReducer,
    userSlice: userSliceReducer,
    modalSlice: modalSliceReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch