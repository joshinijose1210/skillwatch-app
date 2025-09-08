import { render } from '@testing-library/react';
import { NoResult } from './NoResult';

describe('KpiDescriptionEditor component', () => {
    it('should take snapshot', () => {
        const { container } = render(<NoResult title={''} />);
        expect(container).toMatchSnapshot();
    });
});
