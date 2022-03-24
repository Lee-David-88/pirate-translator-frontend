import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import api from './api';
import { useClient } from './ClientContext';
export default function Home() {
	const client = useClient();

	const [text, setText] = useState('');
	const [prompt, setPrompt] = useState('');
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);

	const translate = async () => {
		setIsPending(true);
		setError(null);
		try {
			const {
				data: { text },
			} = await api.post('/translations', {
				prompt,
			});
			setText(text);
		} catch (err) {
			setError(err.response?.data?.message ?? 'Failed to translate');
		}
		setIsPending(false);
	};

	if (!client) {
		return <Navigate replace to="/login" />;
	}

	return (
		<>
			<h1>Pirate Translator</h1>
			<p>Client ID: {client.id}</p>
			{client.isAdmin ? (
				<p>
					<Link to="/admin">Admin</Link>
				</p>
			) : null}
			<Link to="/docs">Documentation</Link>

			<p>
				<input
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					type="text"
					placeholder="Enter The Prompt You Wish To Translate Here"
				/>
			</p>
			<p>
				<button disabled={isPending} onClick={translate}>
					Translate
				</button>
				{error ? <p style={{ color: 'red' }}>{error}</p> : null}
			</p>
			<p>{text}</p>
		</>
	);
}
