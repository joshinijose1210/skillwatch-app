import styled from 'styled-components';

export const StyleTextDescription = styled.div`
    width: auto;
    height: auto;
    position: relative;
    border-radius: 0.4rem;
    border-width: 0.4rem;
    border: 0.1rem solid ${({ theme }) => theme.colors.grey[500]};

    div > * {
        margin-top: 0;
        margin-bottom: 0;
    }
`;
export const StylePlaceHolder = styled.label`
    color: #b0bcc8;
    top: 0.5rem;
    left: 1.5rem;
    cursor: text;
    position: absolute;
    pointer-events: none;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.9rem;
    font-family: Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;
    opacity: 1;
    z-index: 1;
    width: 100%;
    max-width: min-content;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
export const StyleTextArea = styled.div<{ feedbackData: string }>`
    cursor: not-allowed;
    color: ${props => (props.feedbackData === 'Feedback Pending' ? props.theme.customColors.inProgressColor : '#435465')};
    padding: ${props => (props.feedbackData === 'Feedback Pending' ? '24px 15px' : '10px 15px')};
    border: none;
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1.9rem;
    font-family: Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;
    background-color: transparent;
    text-overflow: ellipsis;
    resize: none;
    z-index: 1;
    text-align: left;
    white-space: pre-wrap;
    word-wrap: break-word;
    margin-top: 1.5rem;
`;
