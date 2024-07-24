// src/pages/_app.js
'use client';
import { Provider } from 'react-redux';
import store from '@/store';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <MyApp/>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
