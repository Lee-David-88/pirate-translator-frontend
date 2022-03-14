import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from './api';
import { useClient, useSetClient } from './ClientContext';
import { useSetToken } from './TokenContext';

export default function Login() {
	const setToken = useSetToken();
	const client = useClient();
	const setClient = useSetClient();

	const [clientId, setClientId] = useState('');
	const [clientSecret, setClientSecret] = useState('');
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);

	const logIn = async () => {
		setIsPending(true);
		setError(null);
		try {
			const {
				data: { token, client },
			} = await api.post('/login', {
				clientId,
				clientSecret,
			});
			setToken(token);
			setClient(client);
		} catch (err) {
			setError(err.response?.data?.message ?? 'Failed to log in');
			setIsPending(false);
		}
	};

	if (client) {
		return <Navigate replace to="/" />;
	}

	return (
		<>
			<h1>Login</h1>
			<p className="mt-1">
				<input
					value={clientId}
					onChange={(e) => setClientId(e.target.value)}
					type="text"
					placeholder="Client ID"
				/>
			</p>
			<p className="mt-1">
				<input
					value={clientSecret}
					onChange={(e) => setClientSecret(e.target.value)}
					type="text"
					placeholder="Client Secret"
				/>
			</p>
			<p className="mt-1">
				<button disabled={isPending} onClick={logIn}>
					Login
				</button>
			</p>
			{error ? (
				<p style={{ color: 'red' }} className="mt-1">
					{error}
				</p>
			) : null}
		</>
	);
}
