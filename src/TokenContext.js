import { createContext, useContext, useState } from 'react';
import api from './api';

const TokenContext = createContext();
const SetTokenContext = createContext();

export function useIsToken() {
	return !!useContext(TokenContext);
}

export function useSetToken() {
	return useContext(SetTokenContext);
}

export function TokenProvider({ children }) {
	const [token, setToken] = useState(() => {
		const token = localStorage.getItem('token');
		if (token) {
			api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		}
		return token;
	});

	return (
		<TokenContext.Provider value={token}>
			<SetTokenContext.Provider
				value={(token) => {
					if (token) {
						api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
					} else {
						delete api.defaults.headers.common['Authorization'];
					}
					localStorage.setItem('token', token);
					setToken(token);
				}}
			>
				{children}
			</SetTokenContext.Provider>
		</TokenContext.Provider>
	);
}
