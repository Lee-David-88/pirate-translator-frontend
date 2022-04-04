import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import api from './api';
import { useClient } from './ClientContext';
import { Navbar, Nav, NavDropdown, Container, Offcanvas, Form, FormControl, Button} from "react-bootstrap";
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
				prompt
			});
			setText(text);
		} catch (err) {
			setError(err.response?.data?.message ?? 'Failed to translate');
			setIsPending(false);
		}
	};


	 if (!client) {
	 	return <Navigate replace to="/login" />;
	 }

	return (
		<>
		<div class="background-body">
			<Navbar expand="lg">
				<Container>
					<Navbar.Brand href="/login">Pirate Translator</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/docs">Documentation</Nav.Link>
						{client.isAdmin ? (
							<Nav.Link href="/admin">Admin</Nav.Link>
						) : null}
						<Nav.Link href="">Client ID: {client.id}</Nav.Link>
					</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<img class="main-logo" src="piratetext.png"></img>
			<div class="center">
				<img class="map" src="piratemap.png" alt="Pirate map"></img>
				<p>
					<input
						value={prompt}
						onChange={(e) => setPrompt(e.target.value)}
						type="text"
						placeholder="Enter The Prompt You Wish To Translate Here"
					/>
				</p>
				<p>
					<button class="text" disabled={isPending} onClick={translate}>
						Translate
					</button>
					{error ? <p style={{ color: 'red' }}>{error}</p> : null}
				</p>
				<p class="output-text">{text}</p>
			</div>
		</div>
		</>
	);
}
