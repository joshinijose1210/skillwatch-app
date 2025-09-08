import styled from 'styled-components';
import { IQuillBox } from './types';

export const QuillBox = styled.div<IQuillBox>`
    width: 100%;
    min-width: ${({ fullWidth }) => (fullWidth ? '100%' : '500px')};

    .ql-toolbar {
        ${({ bgColor }) => bgColor && `background-Color: ${bgColor};`}
    }
`;

export const EditorWrapper = styled.div<{
    disabled: boolean;
    marginBottom?: number;
    marginLeft?: number;
    fullWidth?: boolean;
    height?: number;
}>`
    display: flex;
    flex-direction: column;
    row-gap: 0.9rem;
    margin-bottom: ${props => (props.disabled ? '0' : props.marginBottom ? `${props.marginBottom}rem` : '6.5rem')};
    margin-left: ${props => (props.marginLeft ? `${props.marginLeft}rem` : '0')};
    ${({ fullWidth }) => fullWidth && 'width: 100%;'}

    .ql-container {
        height: ${({ height }) => (height ? 'unset' : '100%')};
    }
`;

export const Editor = styled.div<{ disabled: boolean; height?: number; bgColor?: string }>`
    font-size: 1.6rem;
    font-weight: ${props => (props.disabled ? '400' : 'default')};
    color: ${props => (props.disabled ? '#435465' : '#555')};
    border: #c7d0d8;
    min-height: ${({ height }) => (height ? `${height}px` : '250px')};
    ${({ bgColor }) => bgColor && `background-Color: ${bgColor};`}

    .ql-editor.ql-blank::before {
        color: ${({ theme }) => theme.colors.grey[500]};
    }
`;
export const Counter = styled.div`
    color: ${({ theme }) => theme.colors.grey[500]};
`;
