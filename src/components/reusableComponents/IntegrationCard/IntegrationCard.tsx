import { Text } from '@medly-components/core';
import { defaultTheme } from '@theme';
import { FC } from 'react';
import { CardContainer, ComingSoonCard, ContentSection, FooterSection, StyledLogoSection } from './IntegrationCard.styled';
import { Props } from './types';

export const IntegrationCard: FC<Props> = ({ icon, title, description, content, footer, footerText, isComingSoon }) => {
    return (
        <CardContainer withoutPadding={true}>
            <StyledLogoSection>{icon}</StyledLogoSection>
            {(title || description || content) && (
                <ContentSection>
                    {title && (
                        <>
                            <Text textVariant="h3" textAlign="center" textWeight="Medium">
                                {title}
                            </Text>
                        </>
                    )}

                    {description && (
                        <>
                            <Text textVariant="body1" textAlign="center" textWeight="Regular">
                                {description}
                            </Text>
                        </>
                    )}

                    {content && <>{content}</>}
                </ContentSection>
            )}
            <FooterSection>
                {footer && <>{footer}</>}
                {footerText && (
                    <>
                        <Text textColor={defaultTheme.colors.blue[800]} textWeight="Strong" textVariant="h4">
                            {footerText}
                        </Text>
                    </>
                )}
            </FooterSection>
            {isComingSoon && (
                <ComingSoonCard>
                    <Text textAlign="center" textVariant="h2">
                        Coming soon...
                    </Text>
                </ComingSoonCard>
            )}
        </CardContainer>
    );
};
