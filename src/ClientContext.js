import { createContext, useContext, useState } from 'react';

const ClientContext = createContext();
const SetClientContext = createContext();

export function useClient() {
	return useContext(ClientContext);
}

export function useSetClient() {
	return useContext(SetClientContext);
}

export function ClientProvider({ children }) {
	const [client, setClient] = useState(null);

	return (
		<ClientContext.Provider value={client}>
			<SetClientContext.Provider value={setClient}>
				{children}
			</SetClientContext.Provider>
		</ClientContext.Provider>
	);
}
