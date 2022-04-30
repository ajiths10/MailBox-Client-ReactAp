import {configureStore } from '@reduxjs/toolkit'

import ComposeReducers from './ComposeToggle';
import InboxReducer from './inboxToggle';
import MailItemReducer from './MailFullBody';
import AuthReducers from './auth';

const store = configureStore({
    reducer:{
        compose:ComposeReducers,
        isInbox:InboxReducer,
        milItem:MailItemReducer,
        auth:AuthReducers
    },
});

export default store;