import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { TokenProvider } from './TokenContext';
import { ClientProvider } from './ClientContext';
import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<TokenProvider>
			<ClientProvider>
				<App />
			</ClientProvider>
		</TokenProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
