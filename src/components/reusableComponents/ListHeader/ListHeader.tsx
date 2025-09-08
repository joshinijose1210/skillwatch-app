import Grid from '@components/layout/Grid';
import { Text } from '@medly-components/core';
import { useAppSelector } from '@slice';
import { FC, useMemo } from 'react';
import { ListHeaderButton, ListHeaderText, ListTitle, TwoButtons } from './ListHeader.styled';
import { ListHeaderProps } from './types';

export const ListHeader: FC<ListHeaderProps> = ({
    title,
    subTitle,
    actionButtonLabel,
    actionButtonClick,
    titleVariant = 'h3',
    titleWeight = 'Medium',
    actionButtonVariant = 'solid',
    secondButtonLabel,
    secondButtonClick,
    secondButtonVariant = 'solid',
    actionButtonDisabled,
    secondButtonDisabled,
    secondButtonTitle,
    moduleTitle,
    titleColor,
    checkPermission,
    rightSection
}) => {
    const { modulePermission } = useAppSelector(state => state.user);

    const actionToShow = useMemo(() => {
        let action = checkPermission ? '' : 'Edit';
        const module = modulePermission?.find(module => module.moduleName === title || module.moduleName === moduleTitle);
        if (module) {
            action = module.edit ? 'Edit' : module.view ? 'View' : '';
        }

        return action;
    }, [checkPermission, modulePermission, moduleTitle, title]);

    return (
        <Grid row={true} expanded justify="space-between" alignItems="center" marginBottom={2}>
            <ListTitle>
                <ListHeaderText textVariant={titleVariant} textWeight={titleWeight} titleColor={titleColor}>
                    {title}
                </ListHeaderText>
                {subTitle && <Text textVariant="body2">{subTitle}</Text>}
            </ListTitle>
            {rightSection ? (
                rightSection
            ) : (
                <>
                    {actionToShow === 'Edit'
                        ? actionButtonLabel &&
                          secondButtonLabel && (
                              <TwoButtons>
                                  <ListHeaderButton
                                      variant={actionButtonVariant}
                                      onClick={actionButtonClick}
                                      disabled={actionButtonDisabled}
                                  >
                                      {actionButtonLabel}
                                  </ListHeaderButton>
                                  <ListHeaderButton
                                      variant={secondButtonVariant}
                                      title={secondButtonTitle}
                                      onClick={secondButtonClick}
                                      disabled={secondButtonDisabled}
                                  >
                                      {secondButtonLabel}
                                  </ListHeaderButton>
                              </TwoButtons>
                          )
                        : ''}

                    {actionToShow === 'Edit'
                        ? actionButtonLabel &&
                          !secondButtonLabel && (
                              <ListHeaderButton variant={actionButtonVariant} onClick={actionButtonClick}>
                                  {actionButtonLabel}
                              </ListHeaderButton>
                          )
                        : ''}
                </>
            )}
        </Grid>
    );
};
