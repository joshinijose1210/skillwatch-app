import { ColumnActionText } from '@common';
import { routeConstants } from '@constants';
import { TableColumnConfig } from '@medly-components/core';
import { useNavigate, useParams } from 'react-router-dom';

export const EmpFeedbackActionFormatter: TableColumnConfig['component'] = ({ rowData }) => {
    const navigateTo = useNavigate();
    const { ActivePage } = useParams();
    const handleClick = () => {
        navigateTo(`${routeConstants.employeeFeedback}/${ActivePage}/view-feedback`, {
            state: {
                ...rowData
            }
        });
    };
    return <ColumnActionText onClick={handleClick}>View</ColumnActionText>;
};
