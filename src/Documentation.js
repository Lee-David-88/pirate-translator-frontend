import { Link } from 'react-router-dom';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Container, Offcanvas, Form, FormControl, Button} from "react-bootstrap";

const spec = {
	openapi: '3.0.3',
	info: {
		title: 'Pirate Translator',
		description: 'Translates text to Pirate speak using AI.',
		version: '0.1.0',
	},
	servers: [
		{
			url: process.env.REACT_APP_API_BASE,
			description: 'Production server',
		},
	],
	tags: [
		{
			name: 'clients',
			description: 'Clients with access to the API',
		},
		{
			name: 'metrics',
			description: 'Measurements of how the API itself is being used',
		},
	],
	components: {
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
			},
		},
		schemas: {
			Client: {
				type: 'object',
				properties: {
					id: {
						type: 'string',
						readOnly: true,
					},
					name: {
						type: 'string',
						nullable: true,
					},
					secret: {
						type: 'string',
						format: 'password',
						readOnly: true,
					},
					isAdmin: {
						type: 'boolean',
						readOnly: true,
					},
					createdAt: {
						type: 'string',
						format: 'date-time',
						readOnly: true,
					},
					updatedAt: {
						type: 'string',
						format: 'date-time',
						readOnly: true,
					},
				},
				required: ['id', 'name', 'isAdmin', 'createdAt', 'updatedAt'],
			},
			Metric: {
				type: 'object',
				properties: {
					method: {
						type: 'string',
						readOnly: true,
					},
					path: {
						type: 'string',
						readOnly: true,
					},
					date: {
						type: 'string',
						format: 'date',
						readOnly: true,
					},
					numRequests: {
						type: 'integer',
						readOnly: true,
						minimum: 0,
					},
					createdAt: {
						type: 'string',
						format: 'date-time',
						readOnly: true,
					},
					updatedAt: {
						type: 'string',
						format: 'date-time',
						readOnly: true,
					},
				},
				required: [
					'method',
					'path',
					'date',
					'numRequests',
					'createdAt',
					'updatedAt',
				],
			},
		},
	},
	security: [
		{
			bearerAuth: [],
		},
	],
	paths: {
		'/clients': {
			get: {
				tags: ['clients'],
				summary: 'List all existing clients',
				responses: {
					200: {
						content: {
							'application/json': {
								schema: {
									type: 'array',
									items: {
										$ref: '#/components/schemas/Client',
									},
								},
							},
						},
					},
				},
			},
			post: {
				tags: ['clients'],
				summary: 'Create a new client',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/Client',
							},
						},
					},
				},
				responses: {
					200: {
						content: {
							'application/json': {
								schema: {
									$ref: '#/components/schemas/Client',
								},
							},
						},
					},
				},
			},
		},
		'/clients/{clientId}': {
			delete: {
				tags: ['clients'],
				summary: 'Delete a client',
				parameters: [
					{
						name: 'clientId',
						in: 'path',
						schema: {
							type: 'string',
						},
						required: true,
					},
				],
				responses: {
					200: {
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: {
										message: {
											type: 'string',
										},
									},
									required: ['message'],
								},
							},
						},
					},
				},
			},
		},
		'/clients/self': {
			get: {
				tags: ['clients'],
				summary: 'Get the current authorized client',
				responses: {
					200: {
						content: {
							'application/json': {
								schema: {
									$ref: '#/components/schemas/Client',
								},
							},
						},
					},
				},
			},
		},
		'/login': {
			post: {
				tags: ['clients'],
				summary: 'Generate a JWT from client credentials',
				security: [],
				requestBody: {
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									clientId: {
										type: 'string',
									},
									clientSecret: {
										type: 'string',
										format: 'password',
									},
								},
								required: ['clientId', 'clientSecret'],
							},
						},
					},
				},
				responses: {
					200: {
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: {
										token: {
											type: 'string',
											format: 'password',
										},
										client: {
											$ref: '#/components/schemas/Client',
										},
									},
									required: ['token', 'client'],
								},
							},
						},
					},
				},
			},
		},
		'/metrics': {
			get: {
				tags: ['metrics'],
				summary: 'Get all metrics',
				responses: {
					200: {
						content: {
							'application/json': {
								schema: {
									type: 'array',
									items: {
										$ref: '#/components/schemas/Metric',
									},
								},
							},
						},
					},
				},
			},
		},
	},
};

export default function Documentation() {
	return (
		<>
			<Navbar expand="lg">
  			<Container>
    			<Navbar.Brand href="/login">Documentation</Navbar.Brand>
    			<Navbar.Toggle aria-controls="basic-navbar-nav" />
    			<Navbar.Collapse id="basic-navbar-nav">
      			<Nav className="me-auto">
        			<Nav.Link href="/">Home</Nav.Link>
      			</Nav>
    			</Navbar.Collapse>
  			</Container>
		</Navbar>
			<SwaggerUI spec={spec} />
		</>
	);
}
