import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from './api';
import { useClient } from './ClientContext';

export default function Admin() {
	const client = useClient();

	const [metrics, setMetrics] = useState(null);

	useEffect(() => {
		api.get('/metrics').then(({ data: metrics }) => setMetrics(metrics));
	}, []);

	if (!client) {
		return <Navigate replace to="/login" />;
	}

	return (
		<>
			<h1>Admin</h1>
			<p>
				<h2>Client</h2>
				<pre>{JSON.stringify(client, null, '\t')}</pre>
			</p>
			<p>
				<h2>Metrics</h2>
				{metrics ? (
					<table>
						<thead>
							<tr>
								<th align="left">Method</th>
								<th align="left">Path</th>
								<th align="left">Date</th>
								<th align="right">Requests</th>
							</tr>
						</thead>
						<tbody>
							{metrics.map((metric, i) => (
								<tr key={i}>
									<th scope="row" align="left">
										{metric.method}
									</th>
									<th scope="row" align="left">
										{metric.path}
									</th>
									<td align="left">{metric.date}</td>
									<td align="right">{metric.numRequests}</td>
								</tr>
							))}
						</tbody>
					</table>
				) : null}
			</p>
		</>
	);
}
