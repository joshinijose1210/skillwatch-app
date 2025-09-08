import apiUrls from '@constants/apiUrls';
import { addToast, Avatar, Text, Popover, Button } from '@medly-components/core';
import { useAppDispatch, useAppSelector } from '@slice';
import { updateReviewCycleFilter } from '@slice/reviewCycleFilter';
import { removeUser } from '@slice/user';
import { fetch } from '@utils';
import { FC, useEffect, useRef, useMemo } from 'react';
import * as Styled from './AvatarMenu.styled';
import { AvatarMenuProps } from './types';

export const AvatarMenu: FC<AvatarMenuProps> = ({ open, setOpen }: AvatarMenuProps) => {
    const { departmentName, designationName, firstName, lastName, email, roleName, phoneNumber, teamName, id, employeeId } = useAppSelector(
        state => state.user
    );

    const dispatch = useAppDispatch();

    const menuRef = useRef();
    const emailTextRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handler = (e: any) => {
            if ((menuRef.current as any) && !(menuRef.current as any).contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        };
    }, [menuRef, setOpen]);

    const handleLogout = async () => {
        const refreshToken = JSON.parse(localStorage.getItem('token') as string)?.refresh_token;

        const { response, error } = await fetch({
            url: apiUrls.logout,
            method: 'POST',
            data: {
                id,
                refreshToken
            }
        });
        if (response?.data) {
            dispatch(removeUser());
            dispatch(updateReviewCycleFilter({ reviewCycleList: [] }));
        }
        if (error) {
            addToast({ variant: 'error', message: 'Logout failed, please try again' });
        }
    };

    const isPopoverClosed = useMemo(
        () => (emailTextRef?.current && emailTextRef?.current.getBoundingClientRect().width >= 300 ? false : true),
        [open, emailTextRef.current]
    );

    return (
        <Styled.AvatarMenu ref={menuRef as any}>
            <Styled.MenuTrigger onClick={() => setOpen(!open)}>
                <Avatar size="M">
                    {firstName[0]}
                    {lastName[0]}
                </Avatar>
            </Styled.MenuTrigger>

            <Styled.DropdownMenu className={`${open ? 'active' : 'inactive'}`}>
                <Styled.Wrapper>
                    <Styled.AvatarList>
                        <Avatar
                            style={{
                                height: '100%',
                                width: '100%'
                            }}
                        >
                            <Text style={{ margin: '2rem 2rem', fontSize: '3rem', fontWeight: '1rem' }}>
                                {firstName[0]?.toUpperCase()}
                                {lastName[0]?.toUpperCase()}
                            </Text>
                        </Avatar>
                    </Styled.AvatarList>
                    <Styled.StyledBox>
                        <Text textVariant="h4" textAlign="center">
                            {firstName} {lastName} {employeeId && `(${employeeId})`}
                        </Text>

                        {departmentName && (
                            <Styled.StyledLabel>
                                Department: <span>{departmentName}</span>
                            </Styled.StyledLabel>
                        )}

                        {teamName && (
                            <Styled.StyledLabel>
                                Team: <span>{teamName}</span>
                            </Styled.StyledLabel>
                        )}

                        {designationName && (
                            <Styled.StyledLabel>
                                Designation: <span>{designationName}</span>
                            </Styled.StyledLabel>
                        )}

                        {roleName && (
                            <Styled.StyledLabel>
                                Role: <span>{roleName}</span>
                            </Styled.StyledLabel>
                        )}

                        <Styled.EmailList isPopoverClosed={isPopoverClosed}>
                            <Popover>
                                <Styled.StyledLabel ref={emailTextRef}>{email}</Styled.StyledLabel>
                                <Popover.Popup withArrow placement="left">
                                    {email}
                                </Popover.Popup>
                            </Popover>
                        </Styled.EmailList>

                        {phoneNumber && <Styled.StyledLabel>{phoneNumber}</Styled.StyledLabel>}
                    </Styled.StyledBox>
                    <Styled.SignOutButtonList>
                        <Button variant="outlined" onClick={handleLogout}>
                            Sign Out
                        </Button>
                    </Styled.SignOutButtonList>
                </Styled.Wrapper>
            </Styled.DropdownMenu>
        </Styled.AvatarMenu>
    );
};
