import { RTKRender, cleanup, fireEvent, screen, waitFor } from '@utils/test-utils';
import { Settings } from './Settings';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { SettingsMockData } from '@mocks/settings';
import { Loader } from '@components';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });

beforeEach(mock.reset);

afterEach(cleanup);

describe('Settings page', () => {
    it('should take snapshot of loader', () => {
        const { container } = RTKRender(<Settings />);
        const { container: loaderContainer } = RTKRender(<Loader />);
        expect(container.innerHTML).toMatch(loaderContainer.innerHTML);
    });

    it('should take snapshot of loaded page and add new domain', async () => {
        mock.onGet('https://dummy-api.example.com/api/organisation/general-settings/?organisationId=1').replyOnce(200, {
            ...SettingsMockData.organisationData
        });
        mock.onGet('https://dummy-api.example.com/api/organisation/domains/?id=1').replyOnce(200, SettingsMockData.domains);

        mock.onGet('https://dummy-api.example.com/api/review-cycle/timeline/?organisationId=1&reviewToId=72').replyOnce(200, {
            ...SettingsMockData.timelineData
        });
        mock.onPost('https://dummy-api.example.com/api/organisation/domains/').replyOnce(200);

        const { container } = RTKRender(<Settings />, { initialState: SettingsMockData.initialState });
        expect(await screen.findByText(/Employees can submit suggestions Anonymously:/i)).toBeInTheDocument();

        expect(container).toMatchSnapshot();

        fireEvent.click(screen.getByText('+ Add Domain'));

        const addDomainInput = await screen.findByTestId<HTMLInputElement>('inputDomainName');
        fireEvent.change(addDomainInput, { target: { value: 'invalid email' } });
        expect(await screen.findByText('Please enter valid domain name')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('clearInput'));
        fireEvent.click(screen.getByText('+ Add Domain'));
        const addDomainInput2 = await screen.findByTestId<HTMLInputElement>('inputDomainName');

        fireEvent.change(addDomainInput2, { target: { value: 'newdomain.com' } });
        await waitFor(() => expect(addDomainInput2).toHaveValue('@newdomain.com'));
        const saveButton = await screen.findByText('Save');
        expect(saveButton).toBeEnabled();
        fireEvent.click(saveButton);
        expect(await screen.findByText('Allowed Domain list updated successfully')).toBeInTheDocument();
    });

    it('should delete a domain if it is not used', async () => {
        mock.onGet('https://dummy-api.example.com/api/organisation/domains/?id=1').replyOnce(200, SettingsMockData.domains);
        mock.onGet('https://dummy-api.example.com/api/organisation/?id=21').replyOnce(200, {
            ...SettingsMockData.companyData
        });
        mock.onGet('https://dummy-api.example.com/api/organisation/general-settings/?organisationId=1').replyOnce(200, {
            ...SettingsMockData.organisationData
        });

        mock.onGet('https://dummy-api.example.com/api/review-cycle/timeline/?organisationId=1&reviewToId=72').replyOnce(200, {
            ...SettingsMockData.timelineData
        });
        mock.onPost('https://dummy-api.example.com/api/organisation/domains/').replyOnce(200);

        RTKRender(<Settings />, { initialState: SettingsMockData.initialState });
        await screen.findByDisplayValue('@scalereal.com');
        const domains = await screen.findAllByText('Domain Name');
        const deleteDomainButtons = await screen.findAllByTestId('deleteDomainButton');
        await waitFor(() => expect(domains).toHaveLength(3));
        await waitFor(() => expect(deleteDomainButtons).toHaveLength(2)); // since atleast one domain should be in the list that cannot be deleted

        fireEvent.click(deleteDomainButtons[1]);

        expect(await screen.findByText('Are you sure you want to delete the domain?')).toBeInTheDocument();

        const closeIcon = document.getElementById('medly-modal-close-button') as HTMLElement;
        expect(closeIcon).toBeInTheDocument();
        fireEvent.click(closeIcon);

        fireEvent.click(deleteDomainButtons[1]);
        fireEvent.click(await screen.findByText('No'));

        fireEvent.click(deleteDomainButtons[1]);

        expect(await screen.findByText('Are you sure you want to delete the domain?')).toBeInTheDocument();
        fireEvent.click(await screen.findByText('Yes'));
        expect(await screen.findByText('Allowed Domain list updated successfully')).toBeInTheDocument();
    });

    it('should toggle anonymous suggestion send, manager review response mandatory and bi-weekly reminders', async () => {
        RTKRender(<Settings />, { initialState: SettingsMockData.initialState });
        mock.onGet('https://dummy-api.example.com/api/organisation/?id=21').replyOnce(200, {
            ...SettingsMockData.companyData
        });
        mock.onGet('https://dummy-api.example.com/api/organisation/general-settings/?organisationId=1').replyOnce(200, {
            ...SettingsMockData.organisationData
        });

        mock.onGet('https://dummy-api.example.com/api/review-cycle/timeline/?organisationId=1&reviewToId=72').replyOnce(200, {
            ...SettingsMockData.timelineData
        });
        mock.onPut('https://dummy-api.example.com/api/organisation/general-settings/').replyOnce(200, {});
        const toggleManagerReview = await screen.findByTestId('toggleManagerReview');
        const toggleAnonymousSuggestion = await screen.findByTestId('toggleAnonymousSuggestion');
        const toggleBiWeeklyFeedbackReminderEnabled = await screen.findByTestId('isBiWeeklyFeedbackReminderEnabled');

        expect(toggleManagerReview).not.toBeChecked();
        expect(toggleAnonymousSuggestion).not.toBeChecked();
        expect(toggleBiWeeklyFeedbackReminderEnabled).toBeChecked();

        fireEvent.click(toggleAnonymousSuggestion);
        fireEvent.click(toggleManagerReview);
        fireEvent.click(toggleBiWeeklyFeedbackReminderEnabled);

        expect(toggleManagerReview).toBeChecked();
        expect(toggleAnonymousSuggestion).toBeChecked();
        expect(toggleBiWeeklyFeedbackReminderEnabled).not.toBeChecked();

        const saveButton = await screen.findByText('Save');
        expect(saveButton).toBeEnabled();

        fireEvent.click(saveButton);

        expect(await screen.findByText('Settings updated successfully')).toBeInTheDocument();
    });

    it('should fail to delete a domain', async () => {
        mock.onGet('https://dummy-api.example.com/api/organisation/general-settings/?organisationId=1').replyOnce(200, {
            ...SettingsMockData.organisationData
        });
        mock.onGet('https://dummy-api.example.com/api/organisation/domains/?id=1').replyOnce(200, SettingsMockData.domains);

        mock.onGet('https://dummy-api.example.com/api/review-cycle/timeline/?organisationId=1&reviewToId=72').replyOnce(200, {
            ...SettingsMockData.timelineData
        });
        mock.onPost('https://dummy-api.example.com/api/organisation/domains/').replyOnce(404);
        RTKRender(<Settings />, { initialState: SettingsMockData.initialState });
        expect(await screen.findByText(/Employees can submit suggestions Anonymously:/i)).toBeInTheDocument();
        fireEvent.click(screen.getByText('+ Add Domain'));
        const addDomainInput = await screen.findByTestId<HTMLInputElement>('inputDomainName');
        fireEvent.change(addDomainInput, { target: { value: 'newdomain.com' } });
        const saveButton = await screen.findByText('Save');
        expect(saveButton).toBeEnabled();
        fireEvent.click(saveButton);

        expect(await screen.findByText(/Unable to update allowed domains list./i)).toBeInTheDocument();
    });

    it('should fail to update settings with a proper error message', async () => {
        RTKRender(<Settings />, { initialState: SettingsMockData.initialState });
        mock.onGet('https://dummy-api.example.com/api/organisation/?id=21').replyOnce(200, {
            ...SettingsMockData.companyData
        });
        mock.onGet('https://dummy-api.example.com/api/organisation/general-settings/?organisationId=1').replyOnce(200, {
            ...SettingsMockData.organisationData
        });

        mock.onGet('https://dummy-api.example.com/api/review-cycle/timeline/?organisationId=1&reviewToId=72').replyOnce(200, {
            ...SettingsMockData.timelineData
        });
        mock.onPut('https://dummy-api.example.com/api/organisation/general-settings/').replyOnce(400, {});
        const toggleManagerReview = await screen.findByTestId('toggleManagerReview');
        const toggleAnonymousSuggestion = await screen.findByTestId('toggleAnonymousSuggestion');

        expect(toggleManagerReview).not.toBeChecked();
        expect(toggleAnonymousSuggestion).not.toBeChecked();

        fireEvent.click(toggleAnonymousSuggestion);
        fireEvent.click(toggleManagerReview);
        expect(toggleManagerReview).toBeChecked();
        expect(toggleAnonymousSuggestion).toBeChecked();
        const saveButton = await screen.findByText('Save');
        expect(saveButton).toBeEnabled();
        fireEvent.click(saveButton);

        expect(await screen.findByText('Unable to update settings.')).toBeInTheDocument();
    });
});
