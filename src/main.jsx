// index.js or main.jsx
import { useState } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

const lightTheme = {
  bg: '#fff',
  text: '#000',
};

const darkTheme = {
  bg: '#111',
  text: '#fff',
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.3s ease;
  }
`;

function RootApp() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          <GlobalStyle />
          <App toggleTheme={toggleTheme} isDark={isDark} />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

createRoot(document.getElementById('root')).render(<RootApp />);
