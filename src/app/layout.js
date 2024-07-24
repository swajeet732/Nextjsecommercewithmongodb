// src/app/layout.js
import React from 'react';
import Providers from './provider';

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
};

export default RootLayout;
