import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import lightTheme from '../theme/lightTheme';
import darkTheme from '../theme/darkTheme';

interface ThemeContextProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

const CustomThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export const CustomThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => setIsDarkMode((prev) => !prev);

    const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

    return (
        <CustomThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </CustomThemeContext.Provider>
    );
};

export const useCustomTheme = () => useContext(CustomThemeContext);
