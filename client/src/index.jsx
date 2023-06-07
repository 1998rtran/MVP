import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';

import App from './components/App';

const auth_domain = process.env.REACT_APP_AUTH0_DOMAIN
const auth_clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

createRoot(document.getElementById('root')).render(
<Auth0Provider
  domain={auth_domain}
  clientId={auth_clientId}
  authorizationParams={{
    redirect_uri: 'http://localhost:3000'
  }}
  >
    <App />
  </Auth0Provider>
);