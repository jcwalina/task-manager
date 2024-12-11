import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { CustomThemeProvider } from './context/ThemeContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
        <AuthProvider>
            <CustomThemeProvider>
                <App />
            </CustomThemeProvider>
        </AuthProvider>
);
