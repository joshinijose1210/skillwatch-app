import { ScreenWidthWrapper, StyledTipsTitle } from '@common';
import { BulbImg, TipContainer, TipHeaderText } from '@pages/Suggestions/SuggestionForm/SuggestionForm.styled';
import * as Styled from '@pages/Suggestions/SuggestionForm/SuggestionTipsDesc.styles';
import { StyledTipsText } from './EmployeeForm.styled';

const employeeTips = [
    {
        content: `Collect complete employee information first.`,
        hasSubPoints: false,
        subPoints: []
    },
    {
        content: `Always use official company email addresses.`,
        hasSubPoints: false,
        subPoints: []
    },
    {
        content: `Create your company structure (Departments, Teams, Designations) in advance.`,
        hasSubPoints: false,
        subPoints: []
    },
    {
        content: `Assign correct Designation to link relevant KPIs during performance review.`,
        hasSubPoints: false,
        subPoints: []
    },
    {
        content: `Currently, each employee can be assigned to only one team under one department.`,
        hasSubPoints: false,
        subPoints: []
    },
    {
        content: `Select the correct role for each employee:`,
        hasSubPoints: true,
        subPoints: [
            `Employee Role - Access to only Dashboard, 360-Degree Feedback, Suggestions, Self Performance Review.`,
            `Manager Role - Access to all the above features, plus Team's Performance Reviews and Check-in with Teams.`,
            `Human Resource Role - Access to all the above features, plus Departments, Teams, Designations, Roles and Permissions, KRAs and KPIs, Analytics and Reports.`,
            `Org Admin - Access to all the above features, plus Settings, Integrations and User Activity Log.`
        ]
    },
    {
        content: `Manager 1 - Assign a relevant project manager or technical lead, who will be responsible for the employee's performance review during the review cycle.`,
        hasSubPoints: false,
        subPoints: []
    },
    {
        content: `Manager 2 - Assign a relevant project manager or technical lead as Manager, who will also be responsible for the employee's performance review during the review cycle. This is optional and can be used if you want to assign more than one manager.`,
        hasSubPoints: false,
        subPoints: []
    },
    {
        content: `Employees will receive Welcome Emails for login access once they are added.`,
        hasSubPoints: false,
        subPoints: []
    },
    {
        content: `You can onboard Consultants/Contractors by toggling on the button and manage them similarly to full-time employees.`,
        hasSubPoints: false,
        subPoints: []
    },
    {
        content: `Use the bulk upload option if you're adding more than 10 employees to save time.`,
        hasSubPoints: false,
        subPoints: []
    },
    {
        content: `Employees can be deactivated or archived if they leave the company, while their historical data remains safe.`,
        hasSubPoints: false,
        subPoints: []
    }
];

const EmployeeTipsContent = () => (
    <Styled.StepsList>
        {employeeTips.map((tip, index) =>
            tip.hasSubPoints ? (
                <>
                    <Styled.Step>
                        <StyledTipsText>{tip.content}</StyledTipsText>
                    </Styled.Step>
                    <Styled.StepsList key={index}>
                        {tip.subPoints.map((subPoint, index) => (
                            <Styled.Step key={index}>
                                <StyledTipsText>{subPoint}</StyledTipsText>
                            </Styled.Step>
                        ))}
                    </Styled.StepsList>
                </>
            ) : (
                <Styled.Step key={index}>
                    <StyledTipsText>{tip.content}</StyledTipsText>
                </Styled.Step>
            )
        )}
    </Styled.StepsList>
);

const EmployeeTips = () => {
    return (
        <ScreenWidthWrapper className="tips-division">
            <TipContainer>
                <TipHeaderText>
                    <StyledTipsTitle textVariant="h3">Tips</StyledTipsTitle>
                    <BulbImg />
                </TipHeaderText>
                <EmployeeTipsContent />
            </TipContainer>
        </ScreenWidthWrapper>
    );
};

export default EmployeeTips;
