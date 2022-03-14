import { Link, Navigate } from 'react-router-dom';

import { useClient } from './ClientContext';

export default function Home() {
	const client = useClient();

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
		</>
	);
}
