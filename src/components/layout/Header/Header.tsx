import { StyledMultiSelect, StyledSingleSelect } from '@common';
import { AvatarMenu } from '@components/reusableComponents/AvatarMenu';
import { WithStyle } from '@medly-components/utils';
import { useAppSelector } from '@slice';

import { FC, useState } from 'react';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
// this is not using an alias import for now as a temporary fix for running test cases
import { ReactComponent as ArrowRight } from '../../../constants/images/icons/arrow-right.svg';
import { BreadcrumbItems } from './BreadcrumbItems';
import * as Styled from './Header.styled';
import { NotificationBar } from './NotificationBar';
import { BreadcrumbItemData } from './types';
import { useHeader } from './useHeader';
import TooltipDropdown from '@components/reusableComponents/TooltipDropdown';
import { OptionsType } from '@components/reusableComponents/TooltipDropdown/types';

export const Header: FC & WithStyle = () => {
    const {
        toastMsg,
        handleToast,
        toastVisible,
        path,
        handleDropdownChange,
        reviewCycleList,
        selectedReviewCycle,
        filterOptions,
        showCycleFilter,
        isSingleReviewCycle
    } = useHeader();
    const [open, setOpen] = useState(false);
    const breadcrumbs = useBreadcrumbs();
    const userDetails = useAppSelector(state => state.user);

    const keyToRemovePattern = /^\/employees\/(\d+)\/edit-employee\/(\d+)$|\/\d{1,2}$/;
    const updatedBreadcrumbs = breadcrumbs.filter(item => !keyToRemovePattern.test(item.key));

    return (
        <Styled.Header id="click-outside-dropdown">
            <Styled.LeftSide>
                {userDetails.phoneNumber && userDetails.employeeId && (
                    <>
                        {updatedBreadcrumbs.map((routeObj: BreadcrumbItemData, index: number) => {
                            const breadCrumb = routeObj.breadcrumb && (routeObj.breadcrumb as any).props.children;
                            const userName = breadCrumb.includes('%20')
                                ? `${breadCrumb.split(' ')[0].replace(/%20/g, ' ')}-${breadCrumb.split(' ')[1]}`
                                : breadCrumb.includes('Check')
                                ? `${breadCrumb}`.replace(/(C|c)heck (i|I)n/g, 'Check-in')
                                : breadCrumb.includes('check')
                                ? `${breadCrumb}`.replace(/(C|c)heck (i|I)n/g, 'Check-in')
                                : breadCrumb.includes('(')
                                ? `${breadCrumb}`.replace(/(\(\w+\s\w+)\s/g, '$1-')
                                : breadCrumb.includes('360 degree feedback')
                                ? '360-Degree Feedback'
                                : '';

                            const empName = userName.replace(/%20/g, ' ');
                            return index == 0 || index == updatedBreadcrumbs.length - 1 ? (
                                <>
                                    <BreadcrumbItems
                                        breadCrumbValue={breadCrumb}
                                        route={routeObj.key}
                                        employeeName={empName}
                                        breadcrumbLength={true}
                                    />
                                </>
                            ) : (
                                <>
                                    <BreadcrumbItems
                                        breadCrumbValue={breadCrumb}
                                        route={routeObj.key}
                                        employeeName={empName}
                                        breadcrumbLength={false}
                                    />

                                    <ArrowRight />
                                </>
                            );
                        })}
                    </>
                )}
                {path === '/' && (
                    <Styled.Welcome textVariant="h3" textWeight="Medium">
                        Welcome, {userDetails.firstName.charAt(0).toUpperCase() + userDetails.firstName.slice(1)}
                    </Styled.Welcome>
                )}
            </Styled.LeftSide>
            {toastVisible && toastMsg.length !== 0 && <NotificationBar toastMessage={toastMsg} onClick={handleToast} />}

            <Styled.RightSide>
                {!userDetails.isSuperAdmin && isSingleReviewCycle ? (
                    <>
                        <StyledSingleSelect
                            variant="outlined"
                            options={filterOptions}
                            placeholder="Select Review Cycle"
                            label="Review cycle"
                            value={selectedReviewCycle}
                            onChange={handleDropdownChange}
                            size="M"
                            minWidth="28rem"
                        />
                        <TooltipDropdown
                            dataIds={['review cycle-input']}
                            values={
                                selectedReviewCycle && filterOptions.length
                                    ? filterOptions.filter((item: OptionsType) => selectedReviewCycle === item.value)
                                    : []
                            }
                        />
                    </>
                ) : (
                    !userDetails.isSuperAdmin &&
                    showCycleFilter && (
                        <>
                            <StyledMultiSelect
                                id="dropdown-menu"
                                options={filterOptions}
                                variant="outlined"
                                placeholder="Select Review Cycle"
                                label="Review Cycle"
                                onChange={val => val && handleDropdownChange(val)}
                                values={reviewCycleList}
                                size="M"
                                minWidth="28rem"
                            />
                            <TooltipDropdown
                                dataIds={['dropdown-menu-input', 'dropdown-menu-count-chip']}
                                values={
                                    reviewCycleList?.length && filterOptions.length
                                        ? filterOptions.filter(
                                              (item: OptionsType) =>
                                                  typeof item.value === 'number' && (reviewCycleList as number[]).includes(item.value)
                                          )
                                        : []
                                }
                            />
                        </>
                    )
                )}

                <AvatarMenu open={open} setOpen={setOpen} />
            </Styled.RightSide>
        </Styled.Header>
    );
};

Header.displayName = 'Header';
Header.Style = Styled.Header;

export default Header;
