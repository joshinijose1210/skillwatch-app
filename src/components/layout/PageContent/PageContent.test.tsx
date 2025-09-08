import { RTKRender } from '@utils/test-utils';
import { PageContent } from './PageContent';

describe('PageContent component', () => {
    it('should render properly', () => {
        const { container } = RTKRender(<PageContent>Demo PageContent</PageContent>);
        expect(container).toMatchSnapshot();
    });
});
