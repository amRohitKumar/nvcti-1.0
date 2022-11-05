import {configureStore} from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import userSlice from "./features/user/userSlice";
import eventsSlice from './features/events/eventsSlice';


const store = configureStore({
    reducer: {
        user: userSlice,
        events: eventsSlice,
    }
});

export default store;