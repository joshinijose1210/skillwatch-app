import { ScreenWidthWrapper } from '@common';
import { Loader, PageContent } from '@components';
import ListHeader from '@components/reusableComponents/ListHeader';
import { Button, Text } from '@medly-components/core';
import { FC } from 'react';
import * as Styled from './KRAForm.styled';
import { useKRAForm } from './useKRAForm';
import { KraType } from '../useKraManagement';
import { KraTips } from '../KraTips/KraTips';

export const KRAForm: FC = () => {
    const { kras, weightages, handleSave, isLoading, handleWeightageChange, error } = useKRAForm();

    if (isLoading) {
        return <Loader />;
    }

    return (
        <PageContent>
            <ListHeader title="Edit KRAs" />

            <Styled.StyledContainer>
                <ScreenWidthWrapper className="form-division">
                    <Styled.FormContainer>
                        {kras.map((kra: KraType) => (
                            <Styled.FormInput key={kra.id}>
                                <Styled.StyledText>{kra.name}:</Styled.StyledText>
                                <Styled.StyledTextField
                                    value={weightages[kra.id] || 0}
                                    onChange={e => handleWeightageChange(kra.id, e.currentTarget)}
                                    suffix="%"
                                    data-testid="weightageInput"
                                />
                            </Styled.FormInput>
                        ))}
                        {error && (
                            <Styled.ErrorContainer>
                                <Text textVariant="body2" textColor="red">
                                    {error}
                                </Text>
                            </Styled.ErrorContainer>
                        )}
                        <Styled.ButtonWrapper>
                            <Button variant="solid" data-testid="saveButton" disabled={Boolean(error)} onClick={handleSave}>
                                Save
                            </Button>
                        </Styled.ButtonWrapper>
                    </Styled.FormContainer>
                </ScreenWidthWrapper>
                <KraTips />
            </Styled.StyledContainer>
        </PageContent>
    );
};
