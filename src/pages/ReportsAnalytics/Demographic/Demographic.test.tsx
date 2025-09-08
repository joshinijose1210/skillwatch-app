import { RTKRender } from '@utils/test-utils';
import { demographicData } from '@mocks/demographics';
import { Demographic } from './Demographic';

describe('Demographic', () => {
    it('should render properly', () => {
        const { container } = RTKRender(<Demographic isLoading={false} demographics={demographicData} />);
        expect(container).toMatchSnapshot();
    });
});
