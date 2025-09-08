import React from 'react';
import { RTKRender, fireEvent, screen, waitFor, cleanup, wrapper } from '@utils/test-utils';
import { renderHook, act } from '@testing-library/react-hooks';
import { FirstDesignation } from './FirstDesignation';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { orgAdminMockState } from '../../mocks/userMockState';
import { onboardingFlowMockData } from '@mocks/onboardingFlow';
import { useFirstDesignation } from './useFirstDesignation';
const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn(),
    Navigate: jest.fn(() => <div data-testid="mock-navigate">Navigate component</div>)
}));

beforeAll(() => {
    const { url, someData } = onboardingFlowMockData.departments.get;
    mock.onGet(url).replyOnce(200, someData);
});

afterEach(() => {
    cleanup();
    mock.reset();
});

describe('FirstDesignation Component', () => {
    it('should render properly', () => {
        const { container } = RTKRender(<FirstDesignation />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        expect(screen.getByText('designations are created for you. Do you want to add more designations?')).toBeInTheDocument();
        expect(screen.getByTestId('initAddBtn')).toBeEnabled();
        expect(container).toMatchSnapshot();
    });

    it('should add designation when correct data is entered', async () => {
        mock.onPost(onboardingFlowMockData.firstDesignation.url).replyOnce(200, {
            addedDesignation: ['Test designation']
        });
        const { url, someData } = onboardingFlowMockData.departments.get;
        mock.onGet(url).replyOnce(200, someData);
        mock.onGet(onboardingFlowMockData.teams.get.url).replyOnce(200, onboardingFlowMockData.teams.get.data);
        RTKRender(<FirstDesignation />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        fireEvent.click(screen.getByTestId('initAddBtn'));
        await screen.findByTestId('clearBtn-0');
        fireEvent.click(screen.getByTestId('clearBtn-0'));
        await waitFor(() => expect(screen.queryByTestId('clearBtn-0')).not.toBeInTheDocument());
        fireEvent.click(screen.getByTestId('initAddBtn'));
        await screen.findByTestId('clearBtn-0');
        fireEvent.click(screen.getByTestId('cancelBtn'));
        await waitFor(() => expect(screen.queryByTestId('clearBtn-0')).not.toBeInTheDocument());
        fireEvent.click(screen.getByTestId('initAddBtn'));
        await screen.findByTestId('clearBtn-0');
        fireEvent.click(screen.getByTestId('departmentName-0'));
        await screen.findByText('Dep1');
        fireEvent.click(screen.getByText('Dep1'));
        await waitFor(() => expect(screen.getByTestId('teamName-0')).toBeEnabled());
        fireEvent.click(screen.getByTestId('teamName-0'));
        await screen.findByText('Team1');
        fireEvent.click(screen.getByText('Team1'));
        fireEvent.change(screen.getByTestId('designationName-0'), { target: { value: 'Test designation' } });
        fireEvent.click(screen.getByTestId('activeToggle-0'));
        fireEvent.click(screen.getByTestId('saveBtn'));
        expect(await screen.findByText('Designation Test designation added successfully')).toBeInTheDocument();
    });

    it('should form fields and user interactions in modal work propely', async () => {
        const { url, someData } = onboardingFlowMockData.departments.get;
        mock.onGet(url).replyOnce(200, someData);
        mock.onGet(onboardingFlowMockData.teams.get.url).replyOnce(200, onboardingFlowMockData.teams.get.data);
        RTKRender(<FirstDesignation />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        fireEvent.click(screen.getByTestId('initAddBtn'));
        await screen.findByTestId('clearBtn-0');
        fireEvent.click(screen.getByTestId('departmentName-0'));
        await screen.findByText('Dep1');
        fireEvent.click(screen.getByText('Dep1'));
        await waitFor(() => expect(screen.getByTestId('teamName-0')).toBeEnabled());
        fireEvent.click(screen.getByTestId('teamName-0'));
        await screen.findByText('Team1');
        const designationInput = screen.getByTestId('designationName-0');
        fireEvent.change(designationInput, { target: { value: 'Test team' } });
        fireEvent.click(screen.getByTestId('cancelBtn'));
        await screen.findByTestId('modal-no');
        fireEvent.click(screen.getByTestId('modal-no'));
        await waitFor(() => expect(document.body).toHaveStyle({ overflow: 'unset' }));
        expect(designationInput).toHaveValue('Test team');
        fireEvent.click(screen.getByTestId('cancelBtn'));
        await screen.findByTestId('modal-yes');
        fireEvent.click(screen.getByTestId('modal-yes'));
        await waitFor(() => expect(document.body).toHaveStyle({ overflow: 'unset' }));
    });

    it('should show field error when department already exist', async () => {
        mock.onPost(onboardingFlowMockData.firstDesignation.url).replyOnce(200, {
            existingDesignation: ['Test']
        });
        const { url, someData } = onboardingFlowMockData.departments.get;
        mock.onGet(onboardingFlowMockData.teams.get.url).replyOnce(200, onboardingFlowMockData.teams.get.data);
        mock.onGet(url).replyOnce(200, someData);
        mock.onGet(onboardingFlowMockData.teams.get.url).replyOnce(200, onboardingFlowMockData.teams.get.data);
        RTKRender(<FirstDesignation />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        fireEvent.click(screen.getByTestId('initAddBtn'));
        await screen.findByTestId('clearBtn-0');
        fireEvent.click(screen.getByTestId('departmentName-0'));
        await screen.findByText('Dep1');
        fireEvent.click(screen.getByText('Dep1'));
        await waitFor(() => expect(screen.getByTestId('teamName-0')).toBeEnabled());
        fireEvent.click(screen.getByTestId('teamName-0'));
        await screen.findByText('Team1');
        fireEvent.click(screen.getByText('Team1'));
        fireEvent.change(screen.getByTestId('designationName-0'), { target: { value: 'Test' } });
        fireEvent.click(screen.getByTestId('saveBtn'));
        expect(await screen.findByText('Designation Test already exists')).toBeInTheDocument();
    });

    it('should show an error when department already exist', async () => {
        mock.onPost(onboardingFlowMockData.firstDesignation.url).replyOnce(200, {
            existingDesignation: ['Test designation']
        });
        const { url, someData } = onboardingFlowMockData.departments.get;
        mock.onGet(onboardingFlowMockData.teams.get.url).replyOnce(200, onboardingFlowMockData.teams.get.data);
        mock.onGet(url).replyOnce(200, someData);
        mock.onGet(onboardingFlowMockData.teams.get.url).replyOnce(200, onboardingFlowMockData.teams.get.data);
        RTKRender(<FirstDesignation />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        fireEvent.click(screen.getByTestId('initAddBtn'));
        await screen.findByTestId('clearBtn-0');
        fireEvent.click(screen.getByTestId('departmentName-0'));
        await screen.findByText('Dep1');
        fireEvent.click(screen.getByText('Dep1'));
        await waitFor(() => expect(screen.getByTestId('teamName-0')).toBeEnabled());
        fireEvent.click(screen.getByTestId('teamName-0'));
        await screen.findByText('Team1');
        fireEvent.click(screen.getByText('Team1'));
        fireEvent.change(screen.getByTestId('designationName-0'), { target: { value: 'Test designation' } });
        fireEvent.click(screen.getByTestId('saveBtn'));
        expect(await screen.findByText('Designation Test designation already exists')).toBeInTheDocument();
    });

    it('should check if empty teams condition work properly', async () => {
        mock.onPost(onboardingFlowMockData.firstDesignation.url).replyOnce(200, {
            existingDesignation: ['Test designation']
        });
        const { url, someData } = onboardingFlowMockData.departments.get;
        mock.onGet(url).replyOnce(200, someData);
        mock.onGet(onboardingFlowMockData.teams.get.url).replyOnce(200, {
            unlinkedTeamsCount: 0,
            totalTeams: 0,
            teams: []
        });
        RTKRender(<FirstDesignation />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        fireEvent.click(screen.getByTestId('initAddBtn'));
        await screen.findByTestId('clearBtn-0');
        fireEvent.click(screen.getByTestId('departmentName-0'));
        await screen.findByText('Dep1');
        fireEvent.click(screen.getByText('Dep1'));
        await waitFor(() => expect(screen.getByTestId('teamName-0')).toBeDisabled());
    });

    it('should check if different ids conditions work properly', async () => {
        const { result } = renderHook(() => useFirstDesignation(), { wrapper });
        mock.onPost(onboardingFlowMockData.firstDesignation.url).replyOnce(200, {
            existingDesignation: ['Test designation']
        });
        const { url, someData } = onboardingFlowMockData.departments.get;
        mock.onGet(onboardingFlowMockData.teams.get.url).replyOnce(200, onboardingFlowMockData.teams.get.data);
        mock.onGet(url).replyOnce(200, someData);
        mock.onGet(onboardingFlowMockData.teams.get.url).replyOnce(200, onboardingFlowMockData.teams.get.data);
        RTKRender(<FirstDesignation />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        fireEvent.click(screen.getByTestId('initAddBtn'));
        await screen.findByTestId('clearBtn-0');
        fireEvent.click(screen.getByTestId('departmentName-0'));
        expect(await screen.findByText('Dep1')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Dep1'));
        await act(async () => {
            result.current.handleDepartmentChange(3, 5);
        });

        fireEvent.click(screen.getByTestId('teamName-0'));

        await act(async () => {
            result.current.handleDropdownChange(3, 6, 'test');
        });

        fireEvent.change(screen.getByTestId('designationName-0'), { target: { value: 'Test designation' } });
        await act(async () => {
            const e = {
                target: { name: 'designationName', value: 'test' },
                preventDefault: () => jest.fn()
            } as unknown as React.ChangeEvent<HTMLInputElement>;
            result.current.handleDesignationChange(e, 6, 4);
        });
        fireEvent.click(screen.getByTestId('activeToggle-0'));
        await act(async () => {
            const e = {
                currentTarget: { checked: true }
            } as React.MouseEvent<HTMLInputElement>;
            result.current.handleToggleClick(e, 6);
        });
        fireEvent.click(screen.getByTestId('addBtn'));

        fireEvent.click(screen.getByTestId('saveBtn'));
    });

    it('should check if team dropdown conditions work properly', async () => {
        const { result } = renderHook(() => useFirstDesignation(), { wrapper });
        mock.onPost(onboardingFlowMockData.firstDesignation.url).replyOnce(200, {
            existingDesignation: ['Test designation']
        });
        const { url, someData } = onboardingFlowMockData.departments.get;
        mock.onGet(onboardingFlowMockData.teams.get.url).replyOnce(200, onboardingFlowMockData.teams.get.data);
        mock.onGet(url).replyOnce(200, someData);
        mock.onGet(onboardingFlowMockData.teams.get.url).replyOnce(200, onboardingFlowMockData.teams.get.data);
        RTKRender(<FirstDesignation />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        fireEvent.click(screen.getByTestId('initAddBtn'));
        await screen.findByTestId('clearBtn-0');
        fireEvent.click(screen.getByTestId('departmentName-0'));
        await screen.findByText('Dep1');
        fireEvent.click(screen.getByText('Dep1'));
        await act(async () => {
            result.current.handleDepartmentChange(3, 5);
        });

        fireEvent.click(screen.getByTestId('teamName-0'));

        await act(async () => {
            result.current.inputFields[0]['designationRefId'] = 0;
            result.current.inputFields[0]['teamId'] = 3;
            result.current.handleDropdownChange(3, result.current.inputFields[0]['teamRefId'], '');
        });
        expect(await screen.findByTestId('teamName-0')).toBeEnabled();
    });

    it('should check if teams API error is handled properly', async () => {
        mock.onPost(onboardingFlowMockData.firstDesignation.url).replyOnce(200, {
            existingDesignation: ['Test']
        });
        const { url, someData } = onboardingFlowMockData.departments.get;
        mock.onGet(url).replyOnce(200, someData);
        mock.onGet(onboardingFlowMockData.teams.get.url).reply(400, {});
        RTKRender(<FirstDesignation />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        fireEvent.click(screen.getByTestId('initAddBtn'));
        await screen.findByTestId('clearBtn-0');
        fireEvent.click(screen.getByTestId('departmentName-0'));
        await screen.findByText('Dep1');
        fireEvent.click(screen.getByText('Dep1'));
        await waitFor(() => expect(screen.getByTestId('teamName-0')).toBeDisabled());
    });

    it('should render root component if onboarding flow is false', () => {
        RTKRender(<FirstDesignation />, { initialState: { ...orgAdminMockState, onboardingFlow: true } });
        expect(screen.getAllByText('Onboarding flow is completed')[0]).toBeInTheDocument();
    });
});
