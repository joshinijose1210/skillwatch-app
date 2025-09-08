import { RTKRender } from '@utils/test-utils';
import { demographicData } from '@mocks/demographics';
import { GenderAnalytics } from './GenderAnalytics';

describe('GenderAnalytics', () => {
    it('should render properly', () => {
        const { container } = RTKRender(<GenderAnalytics isLoading={false} gendersData={demographicData.gendersData} />);
        expect(container).toMatchSnapshot();
    });
});
