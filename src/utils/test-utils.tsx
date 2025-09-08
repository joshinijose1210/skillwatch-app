import { ToastContainer } from '@medly-components/core';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { store as rtkStore, setupStore } from '@slice';
import { RenderOptions, RenderResult, render } from '@testing-library/react';
import { defaultTheme } from '@theme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import reduxMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components';
import { userMockState } from '../mocks/userMockState';
import { initialState } from '../slice';

interface CustomOptions extends RenderOptions {
    initialState?: any;
    initialEntries?: any;
}

interface WithThemeProviderProps {
    children?: React.ReactNode;
}

const mockStore = reduxMockStore(),
    store = mockStore({
        ...initialState,
        user: { ...initialState.user, groups: ['admin'] }
    });

const WithThemeProvider: React.FunctionComponent<WithThemeProviderProps> = ({ children }) => (
    <ThemeProvider theme={defaultTheme}>
        <>
            <ToastContainer position="top-end" />
            {children}
        </>
    </ThemeProvider>
);

const WithStore: React.FunctionComponent<WithThemeProviderProps> = ({ children }) => (
    <Provider store={store}>
        <WithThemeProvider>{children}</WithThemeProvider>
    </Provider>
);

const WithRouter: React.FunctionComponent<WithThemeProviderProps> = ({ children }) => (
    <MemoryRouter>
        <WithThemeProvider>{children}</WithThemeProvider>
    </MemoryRouter>
);

const WithStoreAndRouter: React.FunctionComponent<WithThemeProviderProps> = ({ children }) => (
    <Provider store={store}>
        <MemoryRouter>
            <WithThemeProvider>{children}</WithThemeProvider>
        </MemoryRouter>
    </Provider>
);

export const RTKRender = (ui: React.ReactElement, { initialState = userMockState, ...renderOptions }: CustomOptions = {}) => {
    const store = setupStore(initialState);
    setupListeners(store.dispatch);

    const RtkWrapper: React.FunctionComponent<WithThemeProviderProps> = ({ children }) => (
        <Provider store={store}>
            <MemoryRouter initialEntries={renderOptions.initialEntries}>
                <WithThemeProvider>{children}</WithThemeProvider>
            </MemoryRouter>
        </Provider>
    );
    return { rtkStore, ...render(ui, { wrapper: RtkWrapper, ...renderOptions }) };
};
const customRender = (ui: React.ReactElement, options?: RenderOptions): RenderResult =>
    render(ui, { wrapper: WithThemeProvider, ...options });

export const renderWithStore = (ui: React.ReactElement, options?: RenderOptions): RenderResult =>
    render(ui, { wrapper: WithStore, ...options });

export const renderWithRouter = (ui: React.ReactElement, options?: RenderOptions): RenderResult =>
    render(ui, { wrapper: WithRouter, ...options });

export const renderWithStoreAndRouter = (ui: React.ReactElement, options?: RenderOptions): RenderResult =>
    render(ui, { wrapper: WithStoreAndRouter, ...options });

export const wrapper = (props: { children: React.ReactNode }, { initialState = userMockState }: CustomOptions = {}) => {
    const store = setupStore(initialState);
    setupListeners(store.dispatch);
    return (
        <Provider store={store}>
            <MemoryRouter>
                <WithThemeProvider>{props.children}</WithThemeProvider>
            </MemoryRouter>
        </Provider>
    );
};

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render, store };
