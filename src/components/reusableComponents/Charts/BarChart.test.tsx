import { renderWithStoreAndRouter } from '@utils/test-utils';
import { BarChart } from './BarChart';

describe('bar chart', () => {
    it('should render properly', () => {
        const { container } = renderWithStoreAndRouter(<BarChart rating={1} />);
        expect(container).toMatchSnapshot();
    });
});
