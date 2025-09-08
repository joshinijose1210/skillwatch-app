import { RTKRender, screen } from '@utils/test-utils';
import { EmployeeInfo } from './EmployeeInfo';

describe('EmployeeInfo', () => {
    it('should render properly', async () => {
        const { container } = RTKRender(<EmployeeInfo employeeId={'1234'} firstName={'Dummy'} lastName={'User'} checkInRating={4} />);
        expect(await screen.findByText('1234')).toBeInTheDocument();
        expect(await screen.findByText('DU')).toBeInTheDocument();
        expect(await screen.findByText('Dummy User')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('should check if component renders properly without lastname', async () => {
        const { container } = RTKRender(<EmployeeInfo employeeId={'1234'} firstName={'Dummy'} lastName={''} checkInRating={4} />);
        expect(await screen.findByText('D')).toBeInTheDocument();
        expect(await screen.findByText('Dummy')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
});
