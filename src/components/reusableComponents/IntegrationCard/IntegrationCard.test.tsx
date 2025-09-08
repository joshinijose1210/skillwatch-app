import { Text } from '@medly-components/core';
import { renderWithRouter, screen } from '@utils/test-utils';
import { IntegrationCard } from './IntegrationCard';
import { Props } from './types';

const defaultProps: Props = {
        icon: <svg />,
        title: 'Dummy title'
    },
    dashboardCardRender = (props = defaultProps) => renderWithRouter(<IntegrationCard {...props} />);

describe('IntegrationCard', () => {
    it('should render properly with default props', () => {
        const { container } = dashboardCardRender();
        expect(screen.getByText('Dummy title')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('should render properly with all props given', () => {
        const { container } = dashboardCardRender({
            ...defaultProps,
            description: 'dummy Description',
            content: <Text>dummy content</Text>,
            footer: <Text>footer content</Text>,
            footerText: 'dummy footer text'
        });
        expect(screen.getByText('dummy Description')).toBeInTheDocument();
        expect(screen.getByText('dummy content')).toBeInTheDocument();
        expect(screen.getByText('footer content')).toBeInTheDocument();
        expect(screen.getByText('dummy footer text')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
});
