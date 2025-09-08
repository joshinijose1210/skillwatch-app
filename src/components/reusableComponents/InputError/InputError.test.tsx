import { RTKRender } from '@utils/test-utils';
import { InputError } from './InputError';

describe('InputError component', () => {
    it('should take snapshot', () => {
        const { container } = RTKRender(<InputError error={''} />);
        expect(container).toMatchSnapshot();
    });
});
