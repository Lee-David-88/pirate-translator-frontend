import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useIsToken } from './TokenContext';
import { useClient, useSetClient } from './ClientContext';

import api from './api';

import Home from './Home';
import Login from './Login';
import Admin from './Admin';

export default function App() {
	const isToken = useIsToken();
	const client = useClient();
	const setClient = useSetClient();

	const needsClient = isToken && !client;

	useEffect(() => {
		if (needsClient) {
			api
				.get('/clients/self')
				.then(async ({ data: client }) => setClient(client));
		}
	}, [needsClient, setClient]);

	if (needsClient) {
		return <p>Loading...</p>;
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/admin" element={<Admin />} />
			</Routes>
		</BrowserRouter>
	);
}
