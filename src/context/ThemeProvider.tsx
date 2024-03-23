import React, { ReactNode, useState, useMemo } from 'react';
import { Theme, ThemeContext } from "./ThemeContext";
import LOCAL_STORAGE_KEYS from '../utils/constants/LocalStorage';

type ThemeProviderProps = {
	children: ReactNode
}

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_KEYS.theme) as Theme || Theme.LIGHT

const ThemeProvider = (props: ThemeProviderProps) => {
	const {children} = props
	const [theme, setTheme] = useState(defaultTheme)
	
	const defaultValue = useMemo(() => ({ theme, setTheme }), [theme]);
	
	return (
		<ThemeContext.Provider value={defaultValue}>
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeProvider;