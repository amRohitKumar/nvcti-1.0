import {configureStore} from '@reduxjs/toolkit';
import userSlice from "./features/user/userSlice";
import eventsSlice from './features/events/eventsSlice';


const store = configureStore({
    reducer: {
        user: userSlice,
        events: eventsSlice,
    }
});

export default store;