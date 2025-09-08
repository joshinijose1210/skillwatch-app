import { StyledToastContainer } from '@common';
import { ErrorBoundary } from '@components';
import { CssBaseline } from '@medly-components/core';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AppRoutes from '@routes';
import { useAppDispatch } from '@slice';
import { syncUser } from '@slice/user';
import { defaultTheme } from '@theme';
import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { HelmetProvider } from 'react-helmet-async';

const App: React.FC = () => {
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const dispatch = useAppDispatch();

    useEffect(() => {
        AOS.init();
    }, []);

    useEffect(() => {
        dispatch(syncUser());
    }, [dispatch]);

    useEffect(() => {
        window.addEventListener('error', e => {
            if (e.message.includes('ResizeObserver') || e.message === 'Script error.') {
                const resizeObserverErrDiv = document.getElementById('webpack-dev-server-client-overlay-div');
                const resizeObserverErr = document.getElementById('webpack-dev-server-client-overlay');
                if (resizeObserverErr) {
                    resizeObserverErr.setAttribute('style', 'display: none');
                }
                if (resizeObserverErrDiv) {
                    resizeObserverErrDiv.setAttribute('style', 'display: none');
                }
            }
        });
    }, []);

    return (
        // <PersistGate persistor={persistor} loading={null}>
        <GoogleOAuthProvider clientId={clientId || ''}>
            <HelmetProvider>
                <ThemeProvider theme={defaultTheme}>
                    <CssBaseline />
                    <Router basename={'/app'}>
                        <ErrorBoundary>
                            <StyledToastContainer position="top" />
                            <AppRoutes />
                        </ErrorBoundary>
                    </Router>
                </ThemeProvider>
            </HelmetProvider>
        </GoogleOAuthProvider>
        // </PersistGate>
    );
};

export default App;
