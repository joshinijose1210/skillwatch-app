import '@testing-library/jest-dom';
import 'whatwg-fetch';
global.URL.createObjectURL = jest.fn();

beforeEach(() => {
    jest.spyOn(console, 'error');
    console.error.mockImplementation(() => {
        return null;
    });
});
