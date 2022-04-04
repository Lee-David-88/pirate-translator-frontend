import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from './api';
import { useClient, useSetClient } from './ClientContext';
import { useSetToken } from './TokenContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Container, Offcanvas, Form, FormControl, Button} from "react-bootstrap";

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
		return <Navigate replace to="/"/>;
	}

	return (
		<>
		<Navbar expand="lg">
  			<Container>
    			<Navbar.Brand href="/login">Pirate Translator</Navbar.Brand>
    			<Navbar.Toggle aria-controls="basic-navbar-nav" />
    			<Navbar.Collapse id="basic-navbar-nav">
      			<Nav className="me-auto">
        		<Nav.Link href="/docs">Documentation</Nav.Link>
      			</Nav>
    		</Navbar.Collapse>
  			</Container>
		</Navbar>
		<img class="main-logo" src="piratetext.png"></img>
		<div class="center">
			<img class="background" src="piratepaper.png"></img>
			<div class="content">
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
		</div>
		</>
	);
}
