import { PageContent } from '@components';
import ListHeader from '@components/reusableComponents/ListHeader';
import { routeConstants } from '@constants';
import { Button, Text } from '@medly-components/core';
import {
    DoneAllIcon,
    DownloadIcon,
    GroupIcon,
    LibraryAddIcon,
    MailOutlineIcon,
    TouchAppIcon,
    UploadIcon,
    SaveIcon
} from '@medly-components/icons';
import { FlexStartDiv, StyledGoBackButton } from '@pages/RolesAndPermissions/RolesAndPermissions.styled';
import { FC } from 'react';
import {
    BulkImportContainer,
    CSVWrapper,
    ListWrapper,
    Step,
    StepsList,
    StyledBox,
    TimelineList,
    TimelineWrapper
} from './BulkImport.styled';
import DropZone from './DropZone';
import { stepSectionType } from './types';
import useBulkImport from './useBulkImport';

const BulkImport: FC = () => {
    const { handleDownloadFile, path, goBackHandle, bulkImportType } = useBulkImport();
    const stepsSection: stepSectionType = {
        employees: (
            <TimelineList>
                <Text textVariant="h4" textWeight="Medium">
                    Steps To Bulk Import Employees
                </Text>
                <ListWrapper>
                    <DoneAllIcon size="M" />
                    <Text textVariant="body1" textWeight="Regular">
                        Make sure at least 1 employee with a Manager role is manually added to the application.
                    </Text>
                </ListWrapper>
                <ListWrapper>
                    <DownloadIcon size="M" />
                    <Text textVariant="body1" textWeight="Regular">
                        Download the CSV template.
                    </Text>
                </ListWrapper>
                <ListWrapper>
                    <GroupIcon size="M" />
                    <Text textVariant="body1" textWeight="Regular">
                        Start adding employees to the CSV template:
                        <StepsList>
                            <Step>While adding the employees, make sure employees with Manager roles are added first. </Step>
                            <Step>Enter valid data for all the employees </Step>
                            <Step>You can set the status of the employee as Active by entering Y in the ‘Active’ column. </Step>
                            <Step>You can set the status of the employee as Inactive by entering N in the ‘Active’ column. </Step>
                            <Step>
                                You can set the role according to the roles listed in the application (example: HR, Manager, Employee), in
                                the ‘Role’ column depending on the different module/feature permissions you would like to give an employee.
                            </Step>
                            <Step>Maximum 500 employees can be added at a time. </Step>
                            <Step>Once you enter all the valid data, please save the CSV template. </Step>
                        </StepsList>
                    </Text>
                </ListWrapper>
                <ListWrapper>
                    <UploadIcon size="M" />

                    <Text textVariant="body1" textWeight="Regular">
                        Upload the CSV template.
                    </Text>
                </ListWrapper>
                <ListWrapper>
                    <TouchAppIcon size="M" />
                    <Text textVariant="body1" textWeight="Regular">
                        Click on the Start Import button.
                    </Text>
                </ListWrapper>
                <ListWrapper>
                    <MailOutlineIcon size="M" />
                    <Text textVariant="body1" textWeight="Regular">
                        Auto generated Invitation Email will be sent to employees.
                    </Text>
                </ListWrapper>
            </TimelineList>
        ),
        kpis: (
            <TimelineList>
                <Text textVariant="h4" textWeight="Medium">
                    Steps To Bulk Import KPIs
                </Text>
                <ListWrapper>
                    <DownloadIcon size="M" />
                    <Text textVariant="body1" textWeight="Regular">
                        Step 1: Download the CSV template.
                    </Text>
                </ListWrapper>
                <ListWrapper>
                    <LibraryAddIcon size="M" />
                    <Text textVariant="body1" textWeight="Regular">
                        Step 2: Start adding the following details in the CSV template.
                        <StepsList>
                            <Step>
                                Add KRA: Please make sure they already exist in the system and no grammatical/spelling mistakes are made.
                            </Step>
                            <Step>Add KPI Title: A maximum of 500 KPIs can be added at a time.</Step>
                            <Step>Add KPI Description: A maximum limit of 1000 characters.</Step>
                            <Step>Add Status: Enter Y to keep the KPI Active and enter N to keep the KPI Inactive.</Step>
                            <Step>
                                Add Department [Team 1 (Designation)]: Please make sure they already exist in the system and no
                                grammatical/spelling mistakes are made.
                            </Step>
                            <Step>
                                To separate two or more designations for a team, use a separator icon ( | ). Example:
                                <StepsList>
                                    <Step isSubItem>Product Management [Business Analyst (BA-1 | BA-2)]</Step>
                                    <Step isSubItem>
                                        Human Resource [People Experience (People Experience Associate | People Experience Manager)]
                                    </Step>
                                    <Step isSubItem>Engineering [Backend (SDE-1)]</Step>
                                </StepsList>
                            </Step>
                            <Step>
                                If you want to add the same KPIs for multiple teams you can repeat the Department [Team 2 (Designation)]
                                format in the next column and so on.
                            </Step>
                        </StepsList>
                    </Text>
                </ListWrapper>
                <ListWrapper>
                    <SaveIcon size="M" />
                    <Text textVariant="body1" textWeight="Regular">
                        Step 3: Once you enter all the valid data, save the CSV template file in CSV format.
                    </Text>
                </ListWrapper>
                <ListWrapper>
                    <UploadIcon size="M" />

                    <Text textVariant="body1" textWeight="Regular">
                        Step 4: Upload the CSV template.
                    </Text>
                </ListWrapper>
                <ListWrapper>
                    <TouchAppIcon size="M" />
                    <Text textVariant="body1" textWeight="Regular">
                        Step 5: Click on the Start Import button.
                    </Text>
                </ListWrapper>
            </TimelineList>
        )
    };
    return (
        <PageContent>
            {path.includes(routeConstants.firstEmployeeBulkImportRedirect) && (
                <FlexStartDiv>
                    <StyledGoBackButton variant="flat" onClick={goBackHandle}>
                        &lt; Go Back
                    </StyledGoBackButton>
                </FlexStartDiv>
            )}
            <ListHeader title="Bulk Import" />
            <StyledBox>
                <BulkImportContainer>
                    <TimelineWrapper>{stepsSection[bulkImportType]}</TimelineWrapper>
                    <CSVWrapper>
                        <ListWrapper>
                            <Button variant="outlined" onClick={handleDownloadFile} data-testid="templateDownload">
                                <DownloadIcon size="M" />
                                Download csv template
                            </Button>
                        </ListWrapper>
                        <DropZone />
                    </CSVWrapper>
                </BulkImportContainer>
            </StyledBox>
        </PageContent>
    );
};
export default BulkImport;
