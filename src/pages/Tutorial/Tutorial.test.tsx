import { fireEvent, queryByText, screen, waitFor } from '@testing-library/react';
import { RTKRender } from '@utils/test-utils';
import { Tutorial } from './Tutorial';
import { useTutorial } from './useTutorial';

jest.mock('./useTutorial');

const mockSetFilter = jest.fn();
const mockOnSearchChange = jest.fn();
const mockOnSearchClear = jest.fn();

beforeAll(() => {
    Element.prototype.scrollIntoView = jest.fn();
});

const mockTutorials = [
    {
        videoId: 'nfDYeOgeulI',
        cardLabel: 'Getting Started with SkillWatch Setup',
        cardDescription: 'A simple guide to setting up your company',
        category: 'Setup',
        cardTag: ['Company'],
        thumbnail: '/thumbnails/tutorial1.jpg'
    },
    {
        videoId: 'efgh1234',
        cardLabel: 'Giving Feedback the Right Way',
        cardDescription: 'Leave impactful feedback',
        category: '360-degree Feedback',
        cardTag: ['Peer Feedback'],
        thumbnail: '/thumbnails/tutorial1.jpg'
    }
];

const setupTutorialHook = (tutorials = mockTutorials, searchText = '', filter = 'all') => {
    (useTutorial as jest.Mock).mockReturnValue({
        searchText,
        filter,
        viewCount: 100,
        setFilter: mockSetFilter,
        onSearchChange: mockOnSearchChange,
        onSearchClear: mockOnSearchClear,
        openModal: false,
        toggleModal: jest.fn(),
        filteredTutorials: tutorials
    });
};

const renderTutorial = () => RTKRender(<Tutorial />);

describe('Tutorial Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        setupTutorialHook();
    });

    it('should take snapshot', () => {
        const { container } = renderTutorial();
        expect(container).toMatchSnapshot();
    });

    it('should render header and controls', () => {
        renderTutorial();

        expect(screen.getByText('Tutorial Videos')).toBeInTheDocument();
        expect(screen.getByTestId('search-tutorial')).toBeInTheDocument();
        expect(screen.getByTestId('filter')).toBeInTheDocument();
    });

    it('should render all tutorial cards', () => {
        renderTutorial();

        expect(screen.getByText('Getting Started with SkillWatch Setup')).toBeInTheDocument();
        expect(screen.getByText('Giving Feedback the Right Way')).toBeInTheDocument();
    });

    it('should show empty state if no tutorials are returned', () => {
        setupTutorialHook([]);
        renderTutorial();

        expect(screen.getByText('More tutorial videos coming soon...')).toBeInTheDocument();
    });

    it('should trigger onSearchChange on input', () => {
        renderTutorial();

        const searchBox = screen.getByTestId('search-tutorial');
        fireEvent.change(searchBox, { target: { value: 'Feedback' } });

        expect(mockOnSearchChange).toHaveBeenCalledWith('Feedback');
    });

    // TODO: to be fixed later
    // it('should call setFilter when "Setup" is selected', async () => {
    //     renderTutorial();

    //     const filterDropdown = screen.getByTestId('filter');
    //     fireEvent.change(filterDropdown, { target: { value: 'setup' } });
    //     screen.debug();
    //     expect(screen.queryByText('360-degree Feedback')).not.toBeInTheDocument();
    // });
});
