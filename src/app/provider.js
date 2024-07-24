// src/app/provider.js
"use client";

import React from 'react';
import ReduxProvider from './redux-provider';

const Providers = ({ children }) => {
    return (
        <ReduxProvider>
            {children}
        </ReduxProvider>
    );
};

export default Providers;
