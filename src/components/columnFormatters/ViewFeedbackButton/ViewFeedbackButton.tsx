import { ColumnActionText } from '@common';
import { routeConstants } from '@constants';
import { TableColumnConfig } from '@medly-components/core';
import { useAppSelector } from '@slice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const ViewFeedbackButton: TableColumnConfig['component'] = ({ rowData }) => {
    const navigate = useNavigate();
    const { ActivePage } = useParams();
    const route = useLocation();
    const rowAction = rowData && rowData.isDraft && route.pathname === `${routeConstants.myFeedback}/${ActivePage}` ? 'Edit' : 'View';
    const user = useAppSelector(state => state.user);
    const stateData = {
        ...rowData,
        fromEmpName:
            rowData?.feedbackCategory === 'submitted'
                ? `${user.firstName} ${user.lastName}`
                : `${rowData?.empFirstName} ${rowData?.empLastName}`,
        toEmpName:
            rowData?.feedbackCategory === 'submitted'
                ? `${rowData?.empFirstName} ${rowData?.empLastName}`
                : `${user.firstName} ${user.lastName}`,
        toRoleName: rowData?.feedbackCategory === 'submitted' ? rowData?.empRoleName : user.roleName,
        fromRoleName: rowData?.feedbackCategory === 'submitted' ? user.roleName : rowData?.empRoleName
    };

    const handleViewFeedback = () => {
        if (rowData && rowData.isDraft) {
            navigate(`${routeConstants.myFeedback}/${ActivePage}/edit-feedback`, {
                state: {
                    ...stateData,
                    action: 'Edit'
                }
            });
        } else {
            navigate(`${routeConstants.myFeedback}/${ActivePage}/view-feedback`, {
                state: {
                    ...stateData,
                    action: 'View'
                }
            });
        }
    };

    return <ColumnActionText onClick={handleViewFeedback}>{rowAction}</ColumnActionText>;
};
