import { RTKRender } from '@utils/test-utils';
import { RatingsHeader } from './RatingsHeader';

describe('RatingsHeader', () => {
    it('should render properly', () => {
        const { container } = RTKRender(
            <RatingsHeader
                title="dummy Title"
                ratingList={[{ rating: 5, subTitle: 'dummy subtitle', titleColor: '#BC1435', bgColor: '#F64D6E26' }]}
                isLoading={false}
            />
        );
        expect(container).toMatchSnapshot();
    });
});
