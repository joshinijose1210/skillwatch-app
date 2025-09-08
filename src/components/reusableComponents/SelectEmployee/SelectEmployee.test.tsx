import { RTKRender } from '@utils/test-utils';
import { SelectEmployee } from './SelectEmployee';

describe('SearchEmployee component', () => {
    it('should take snapshot', () => {
        const { container } = RTKRender(<SelectEmployee value={''} onChange={jest.fn()} />);
        expect(container).toMatchSnapshot();
    });
});
