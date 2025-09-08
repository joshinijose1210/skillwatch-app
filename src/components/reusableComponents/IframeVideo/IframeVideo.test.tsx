import { screen } from '@testing-library/react';
import { RTKRender } from '@utils/test-utils';
import IframeVideo from './IframeVideo';

const renderer = (videoId = 'dQw4w9WgXcQ') => RTKRender(<IframeVideo videoId={videoId} />);

describe('IframeVideo', () => {
    it('should render iframe with correct YouTube embed src', () => {
        const testVideoId = 'test123';
        RTKRender(<IframeVideo videoId={testVideoId} />);

        const iframe = screen.getByTitle('YouTube video');
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute('src', `https://www.youtube.com/embed/${testVideoId}/?controls=1&autoplay=1&rel=0`);
    });

    it('should match snapshot', () => {
        const { container } = renderer();
        expect(container).toMatchSnapshot();
    });
});
