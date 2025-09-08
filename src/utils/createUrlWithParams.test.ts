import { createUrlWithParams } from './createUrlWithParams';

describe('createUrlWithParams', () => {
    it('should return correct url on empty array', () => {
        expect(createUrlWithParams({ path: 'received', params: [] })).toBe('/received');
    });

    it('should return correct url on filled array', () => {
        expect(createUrlWithParams({ path: 'received', params: [{ name: 'email', value: 'dummy@gamil.com' }] })).toBe(
            '/received?email=dummy@gamil.com'
        );
    });
});
