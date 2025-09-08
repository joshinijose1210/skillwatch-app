import { RTKRender } from '@utils/test-utils';
import { ReviewContentEditor } from './ReviewContentEditor';

describe('ReviewContentEditor', () => {
    it('should render properly', () => {
        const { container } = RTKRender(
            <ReviewContentEditor
                id={''}
                action={''}
                richTextValue={''}
                richTextError={''}
                handleInputChange={jest.fn()}
                ratingOptions={[]}
                rating={undefined}
                ratingError={''}
            />
        );
        expect(container).toMatchSnapshot();
    });
});
