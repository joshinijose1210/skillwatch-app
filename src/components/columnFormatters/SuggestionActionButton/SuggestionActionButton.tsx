import { ColumnActionText } from '@common';
import { routeConstants } from '@constants';
import { TableColumnConfig } from '@medly-components/core';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const SuggestionActionButton: TableColumnConfig['component'] = ({ rowData }) => {
    const navigate = useNavigate();
    const { ActivePage } = useParams();
    const route = useLocation();
    const isReceivedTab = sessionStorage.getItem('myTab') === 'receivedSuggestion';

    const rowAction = isReceivedTab
        ? 'Edit'
        : rowData && rowData.isDraft && route.pathname === `${routeConstants.suggestionBox}/${ActivePage}`
        ? 'Edit'
        : 'View';

    const handleSuggestionAction = () => {
        if (rowData && rowData.isDraft) {
            navigate(`${routeConstants.suggestionBox}/${ActivePage}/edit-suggestion`, {
                state: {
                    ...rowData,
                    action: 'Edit'
                }
            });
        } else {
            navigate(`${routeConstants.suggestionBox}/${ActivePage}`, {
                state: {
                    ...rowData,
                    action: 'View'
                }
            });
        }
    };

    return <ColumnActionText onClick={handleSuggestionAction}>{rowAction}</ColumnActionText>;
};
