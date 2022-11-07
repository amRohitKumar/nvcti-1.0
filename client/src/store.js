import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import userSlice from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
