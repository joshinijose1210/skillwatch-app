import { RTKRender } from '@utils/test-utils';
import { AvatarMenu } from './AvatarMenu';

describe('AvatarMenu component', () => {
    it('should take snapshot', () => {
        const { container } = RTKRender(<AvatarMenu open={false} setOpen={jest.fn()} />);
        expect(container).toMatchSnapshot();
    });
});
