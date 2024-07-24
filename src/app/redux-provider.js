// src/app/redux-provider.js
"use client";

import React from 'react';
import { Provider } from 'react-redux';
import store from '@/redux/store';// Adjust path as needed

const ReduxProvider = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

export default ReduxProvider;
