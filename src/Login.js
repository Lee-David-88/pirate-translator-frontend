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
			<img class="main-logo" src="piratetext.png"></img>
			<div class="center">
				<h1>Login</h1>
				<p>
					<input
						value={clientId}
						onChange={(e) => setClientId(e.target.value)}
						type="text"
						placeholder="Client ID"
					/>
				</p>
				<p>
					<input
						value={clientSecret}
						onChange={(e) => setClientSecret(e.target.value)}
						type="password"
						placeholder="Client Secret"
					/>
				</p>
				<p>
					<button disabled={isPending} onClick={logIn}>
						Login
					</button>
				</p>
				{error ? <p style={{ color: 'red' }}>{error}</p> : null}
			</div>
		</>
	);
}
