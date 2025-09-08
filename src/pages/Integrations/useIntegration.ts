import { ImportErrorType } from '@common';
import { routeConstants } from '@constants';
import { addToast } from '@medly-components/core';
import { useAppSelector } from '@slice';
import { useGetSlackConnectedStatusQuery, usePostDisconnectSlackMutation, usePostSlackCodeMutation } from '@slice/services';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useIntegration = () => {
    const [isConnected, setIsConnected] = useState(false);
    const { organisationId, modulePermission } = useAppSelector(state => state.user);
    const navigate = useNavigate(),
        [isModalOpen, setModalOpen] = useState(false);

    const urlParams = new URLSearchParams(window.location.search),
        slackAuthCode = urlParams.get('code'),
        slackState = urlParams.get('state');

    const [isLoading, setIsLoading] = useState(() => window.location.pathname !== routeConstants.integrations);
    const [postSlackCode, { isSuccess: postCodeSuccess, error: slackCodeError }] = usePostSlackCodeMutation(),
        [postDisconnectSlack, { error: slackLogoutError, isSuccess: slackLogoutSuccess, isLoading: slackLogoutLoading }] =
            usePostDisconnectSlackMutation();

    const {
            data: slackConnectStatus,
            isSuccess: slackConnectionSuccess,
            refetch
        } = useGetSlackConnectedStatusQuery(
            {
                path: 'is-connected',
                params: [{ name: 'organisationId', value: organisationId }]
            },
            { refetchOnMountOrArgChange: true }
        ),
        onCloseModal = useCallback(() => {
            setModalOpen(false);
        }, []),
        handleButtonClick = useCallback(() => {
            if (!isConnected) {
                const scope =
                    'channels:write.invites, channels:read, im:write, incoming-webhook, channels:join, chat:write, users:read, users:read.email, chat:write.public, commands, groups:read, im:read';
                const redirectUri = window.location.href;
                const authorizationUrl = `https://slack.com/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&scope=${scope}&state=${process.env.SLACK_STATE}&redirect_uri=${redirectUri}`;
                window.location.href = authorizationUrl;
            } else setModalOpen(true);
        }, [isConnected]),
        confirmRemoveSlack = useCallback(() => {
            postDisconnectSlack({ organisationId });
        }, [postDisconnectSlack, organisationId]);

    const actionToShow = useMemo(() => {
        let isPermitted = '';
        const module = modulePermission?.find(module => module.moduleName === 'Integrations');
        if (module) {
            isPermitted = module.edit ? 'Edit' : 'View';
        }
        return isPermitted;
    }, [modulePermission]);

    useEffect(() => {
        if (slackAuthCode) {
            postSlackCode({ organisationId, code: slackAuthCode, state: slackState });
            localStorage.setItem('toast', 'true');
        }
    }, [navigate, postSlackCode, slackAuthCode, slackState, organisationId]);

    useEffect(() => {
        if (postCodeSuccess && localStorage.getItem('toast')) {
            addToast({
                variant: 'success',
                header: `Slack connected successfully.`,
                timer: 3000
            });
            localStorage.removeItem('true');
        }
    }, [postCodeSuccess]);

    useEffect(() => {
        if (slackConnectionSuccess) {
            setIsLoading(false);
            setIsConnected(slackConnectStatus?.message);
        }
    }, [slackConnectStatus, slackConnectionSuccess]);

    useEffect(() => {
        const errorObj = slackCodeError as ImportErrorType;
        window.history.replaceState(null, '', window.location.pathname);
        if (errorObj && typeof errorObj === 'object' && errorObj.data) {
            addToast({
                variant: 'error',
                header: (errorObj.data as any).errorMessage || 'Not able to connect with slack.',
                timer: 3000
            });
        }
    }, [slackCodeError]);

    useEffect(() => {
        const errorObj = slackLogoutError as ImportErrorType;
        if (errorObj && typeof errorObj === 'object' && errorObj.data) {
            setModalOpen(false);
            addToast({
                variant: 'error',
                header: (errorObj.data as any).errorMessage || 'Unable to  disconnected slack due to error.',
                timer: 3000
            });
        }
    }, [slackLogoutError, slackConnectStatus]);

    useEffect(() => {
        if (slackLogoutSuccess) {
            setModalOpen(false);
            addToast({
                variant: 'success',
                header: `Slack disconnected successfully`,
                timer: 3000
            });
            setIsConnected(false);
        }
    }, [slackLogoutSuccess, slackConnectStatus]);

    useEffect(() => {
        if (postCodeSuccess) {
            window.history.replaceState(null, '', window.location.pathname);
            refetch();
        }
    }, [postCodeSuccess, refetch]);

    return {
        slackLogoutLoading,
        handleButtonClick,
        isConnected,
        isModalOpen,
        onCloseModal,
        confirmRemoveSlack,
        actionToShow,
        isLoading
    };
};
