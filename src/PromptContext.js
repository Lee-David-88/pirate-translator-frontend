import { createContext, useContext, useState } from 'react';

const PromptContext = createContext();
const SetPromptContext = createContext();

export function usePrompt() {
	return useContext(PromptContext);
}

export function useSetPrompt() {
	return useContext(SetPromptContext);
}

export function PromptProvider({ children }) {
	const [prompt, setPrompt] = useState(null);

	return (
		<PromptContext.Provider value={prompt}>
			<SetPromptContext.Provider value={setPrompt}>
				{children}
			</SetPromptContext.Provider>
		</PromptContext.Provider>
	);
}