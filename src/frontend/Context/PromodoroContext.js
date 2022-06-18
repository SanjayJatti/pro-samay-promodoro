import { useContext, createContext, useState } from "react";

const promodoroContext = createContext(null);

const PromodoroProvider = ({ children })=> {
	const [promodoro, setPromodoro] = useState( {
		workMinutes: 25,
		breakMinutes: 5,
	});
	return (
		<promodoroContext.Provider value={{ promodoro, setPromodoro }}>
			{children}
		</promodoroContext.Provider>
	);
}
const usePromodoro = () => useContext(promodoroContext);

export { PromodoroProvider, usePromodoro };