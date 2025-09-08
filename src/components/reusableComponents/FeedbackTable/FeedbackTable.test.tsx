import { PageContent } from '@components/layout';
import { RTKRender } from '@utils/test-utils';
import FeedbackTable from './FeedbackTable';
import { FeedbackTableProps } from './types';

const defaultProps: FeedbackTableProps = {
    columns: [{ title: 'dummyTitle', field: 'dummyField', sortable: true }],
    data: [],
    action: 'dummyAction',
    onSort: jest.fn(),
    options: [{ label: 'dummy', value: 'dummy', selected: true }],
    values: ['dummy1', 'dummy2'],
    onNameSelection: jest.fn(),
    isLoading: false
};
const renderer = (props = defaultProps) =>
    RTKRender(
        <PageContent>
            <FeedbackTable {...props} />
        </PageContent>
    );

describe('FeedbackTable', () => {
    it('should render properly with default props', () => {
        const { container } = renderer();
        expect(container).toMatchSnapshot();
    });
});
