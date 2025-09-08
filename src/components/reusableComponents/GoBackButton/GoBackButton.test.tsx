import { renderWithStoreAndRouter } from '@utils/test-utils';
import { GoBackButton } from './GoBackButton';

describe('GoBackButton component', () => {
    it('should take snapshot', () => {
        const { container } = renderWithStoreAndRouter(<GoBackButton />);
        expect(container).toMatchSnapshot();
    });
});
