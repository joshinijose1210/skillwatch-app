import { renderWithStoreAndRouter } from '@utils/test-utils';
import { Loader } from './Loader';

describe('Loader component', () => {
    it('should take snapshot', () => {
        const { container } = renderWithStoreAndRouter(<Loader />);
        expect(container).toMatchSnapshot();
    });
});
