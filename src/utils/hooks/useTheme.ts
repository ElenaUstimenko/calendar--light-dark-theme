import { useContext } from 'react';
import { Theme, ThemeContext } from '../../context/ThemeContext';
import LOCAL_STORAGE_KEYS from '../constants/LocalStorage';

const useTheme = () => {
	const {theme, setTheme} = useContext(ThemeContext);
	
	
	const toggleTheme = () => {
    if (setTheme) {
      const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
      setTheme(newTheme);
      localStorage.setItem(LOCAL_STORAGE_KEYS.theme, newTheme);
    }
  };
	
	return {
		theme,
		toggleTheme
	}
}

export default useTheme;