export default function Documentation() {
	return (
		<>
			<h1>Documentation</h1>
			<p>
				The base path for the API is: <code>http://api.piratetranslate.me</code>
			</p>
			<p>
				All endpoints &mdash; except for logging in &mdash; require the{' '}
				<code>Authorization</code> header to be set to{' '}
				<code>Bearer [token]</code>
			</p>
			<p>
				<h2>Client Object</h2>
				<pre>
					{`{
    "id": string,
    "name": string?,
    "secret": string,
    "isAdmin": boolean,
    "createdAt": string,
    "updatedAt": string
}`}
				</pre>
			</p>
			<p>
				<h2>Metric Object</h2>
				<pre>
					{`{
    "method": string,
    "path": string,
    "date": string,
    "numRequests": number,
    "createdAt": string,
    "updatedAt": string
}`}
				</pre>
			</p>
			<p>
				<h2>POST /login</h2>
				Generates a JWT from your credentials.
				<h3>Request Body</h3>
				<pre>
					{`{
    "clientId": string,
    "clientSecret": string
}
`}
				</pre>
				<h3>Response Body</h3>
				<pre>
					{`{
    "token": string,
    "client": Client
}
`}
				</pre>
			</p>
			<p>
				<h2>GET /clients</h2>
				Lists all existing clients. Can only be called by an admin client.
				<h3>Response Body</h3>
				<pre>{`[Client]`}</pre>
			</p>
			<p>
				<h2>GET /clients/self</h2>
				Gets the object for the authenticated client.
				<h3>Response Body</h3>
				<pre>{`Client`}</pre>
			</p>
			<p>
				<h2>POST /clients</h2>
				Creates a new client and returns it (including the secret). Can only be
				called by an admin client.
				<h3>Request Body</h3>
				<pre>
					{`{
    "name": string
}
`}
				</pre>
				<h3>Response Body</h3>
				<pre>{`Client`}</pre>
			</p>
			<p>
				<h2>DELETE /clients/:id</h2>
				Deletes a client by its id. Can only be called by an admin client.
				<h3>Response Body</h3>
				<pre>{`{
    "message": string
}
`}</pre>
			</p>
			<p>
				<h2>GET /metrics</h2>
				Gets all existing endpoint metrics. Can only be called by an admin
				client.
				<h3>Response Body</h3>
				<pre>{`[Metric]`}</pre>
			</p>
		</>
	);
}
