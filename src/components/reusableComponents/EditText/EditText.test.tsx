import { RTKRender } from '@utils/test-utils';
import { EditText } from './EditText';

describe('EditText component', () => {
    it('should take snapshot', () => {
        const { container } = RTKRender(<EditText onclick={jest.fn()} />);
        expect(container).toMatchSnapshot();
    });
});
