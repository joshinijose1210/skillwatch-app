import { ColumnActionText } from '@common';
import { routeConstants } from '@constants';
import apiUrls from '@constants/apiUrls';
import { TableColumnConfig } from '@medly-components/core';
import { DotsBouncingLoader } from '@medly-components/loaders';
import { useAppSelector } from '@slice';
import { usePostMarkFeedbackReceievedAsReadMutation } from '@slice/services';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
export const ViewReceivedFeedbackButton: TableColumnConfig['component'] = ({ rowData }) => {
    const navigate = useNavigate();
    const { ActivePage } = useParams();
    const route = useLocation();
    const [sendFeedbackAsMarked, { isLoading }] = usePostMarkFeedbackReceievedAsReadMutation();

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

    const handleViewFeedback = async () => {
        if (rowData && rowData.isDraft) {
            navigate(`${routeConstants.myFeedback}/${ActivePage}/edit-feedback`, {
                state: {
                    ...stateData,
                    action: 'Edit'
                }
            });
        } else {
            if (rowData) {
                try {
                    await sendFeedbackAsMarked({
                        path: `${rowData.srNo}${apiUrls.markRead}`
                    }).unwrap();

                    navigate(`${routeConstants.myFeedback}/${ActivePage}/view-feedback`, {
                        state: {
                            ...stateData,
                            action: 'View'
                        }
                    });
                } catch (error) {
                    return;
                }
            }
        }
    };

    return <ColumnActionText onClick={handleViewFeedback}>{isLoading ? <DotsBouncingLoader size="XS" /> : rowAction}</ColumnActionText>;
};
