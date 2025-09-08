import { PageContent } from '@components';
import { Text } from '@medly-components/core';
import format from 'date-fns/format';
import DOMPurify from 'dompurify';
import { useViewFeedback } from './useViewFeedback';
import { DetailsContainer, FeedbackLayer, StyledEmployeeRole, StyledHeading, StyledHTMLText } from './ViewFeedback.styled';
import ListHeader from '@components/reusableComponents/ListHeader';

const ViewFeedback = () => {
    const { state } = useViewFeedback();
    return (
        <PageContent>
            <ListHeader title={'View Feedback'} />
            <DetailsContainer>
                <FeedbackLayer>
                    <StyledHeading textWeight="Medium">
                        Date: <Text>{format(new Date(state.date), 'dd/MM/yyyy')}</Text>
                    </StyledHeading>
                </FeedbackLayer>
                <FeedbackLayer>
                    <StyledHeading textVariant="h4" textWeight="Medium">
                        Feedback From:
                    </StyledHeading>
                    <Text>
                        {state.isExternalFeedback
                            ? state.externalFeedbackFromEmailId
                            : `${state.fromEmpName} (${state.feedbackFromEmployeeId})`}
                    </Text>
                    <StyledEmployeeRole>
                        <i>{state.fromRoleName}</i>
                    </StyledEmployeeRole>
                </FeedbackLayer>
                <FeedbackLayer>
                    <StyledHeading textVariant="h4" textWeight="Medium">
                        Feedback About:
                    </StyledHeading>
                    <Text>
                        {state.toEmpName} ( {state.feedbackToEmployeeId} )
                    </Text>
                    <StyledEmployeeRole>
                        <i>{state.toRoleName}</i>
                    </StyledEmployeeRole>
                </FeedbackLayer>
                <FeedbackLayer>
                    <StyledHeading textVariant="h4" textWeight="Medium">
                        Feedback Type:
                    </StyledHeading>
                    <Text>{state.feedbackType}</Text>
                </FeedbackLayer>
                <FeedbackLayer>
                    <StyledHeading textVariant="h4" textWeight="Medium">
                        Feedback:
                    </StyledHeading>
                    <StyledHTMLText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(state.feedback) }} />
                </FeedbackLayer>
            </DetailsContainer>
        </PageContent>
    );
};

export default ViewFeedback;
