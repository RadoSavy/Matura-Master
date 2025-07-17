import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="562285484934-sbe73anaak500lghj135hqv2pfev8rld.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);