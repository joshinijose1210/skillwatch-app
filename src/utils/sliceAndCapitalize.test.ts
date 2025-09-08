import { sliceAndCapitalize } from './sliceAndCapitalize';

describe('sliceAndCapitalize', () => {
    test('should give proper output for condition 1', () => {
        expect(sliceAndCapitalize('received')).toEqual('Received');
    });

    test('should give proper output for condition 2', () => {
        expect(sliceAndCapitalize('/')).toEqual('/');
    });

    test('should return empty when empty', () => {
        expect(sliceAndCapitalize('')).toEqual('');
    });
});
