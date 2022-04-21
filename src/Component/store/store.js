import {configureStore } from '@reduxjs/toolkit'

import ComposeReducers from './ComposeToggle';
import InboxReducer from './inboxToggle';
import MailItemReducer from './MailFullBody';

const store = configureStore({
    reducer:{
        compose:ComposeReducers,
        isInbox:InboxReducer,
        milItem:MailItemReducer,
    },
});

export default store;