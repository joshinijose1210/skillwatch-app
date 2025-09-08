import styled, { css } from 'styled-components';

export const ContactNumber = styled.div<{ component?: string; error: boolean | undefined; disabled?: boolean }>`
    margin: 0;
    margin-right: ${({ component }) => (component === 'Configuration' ? '0' : 'unset')};
    width: 100%;
    .react-tel-input {
        transition: all 100ms ease-out;
        margin: 0 !important;
    }
    border-radius: 0.4rem;
    ${({ disabled, error }) =>
        !disabled &&
        css`
            &:hover {
               
                box-shadow: 0px 0.2rem 0.8rem rgba(96, 120, 144, 0.2);
            }

            &:focus,
            &:active,
            &:focus-within,
            &:active:hover,
            &:focus-within:hover {
                border: 0.1rem solid ${error === true ? '#D73A43' : '#3872D2'};
                border-color : ${error === true ? '#D73A43' : '#3872D2'}
                box-shadow: 0 0.2rem 0.8rem ${error === true ? '#d73a4333' : '#3872d233'};
                div.react-tel-input > input{
                    border: none;
                }
                div.flag-dropdown{
                    border-left: none;
                    border-top: none;
                    border-bottom: none;
                    border-right: 0.1rem solid ${error === true ? '#D73A43' : '#3872D2'} ;
                }
            }
        `}

    div.react-tel-input > input {
        width: 100%;
        max-height: ${({ component }) => (component === 'employee' ? '45px' : 'auto')};
        min-width: 30rem;
        height: 5.6rem;
        font-size: 13px;
        font-weight: 400;
        font-family: Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;
        border-radius: 0.4rem;
        border: 0.1rem solid #98a7b7;
        color: #333;
    }

    .react-tel-input .form-control {
        border-radius: 0.4rem;
    }
    .react-tel-input .country-list {
        background-color: white !important;
        z-index: 999;
    }
    div.flag-dropdown {
        border: 0.1rem solid ${({ disabled }) => (disabled ? 'rgb(199, 208, 216)' : 'rgb(152, 167, 183)')};
        ul {
            top: ${({ component }) => (component === 'Configuration' ? '4.8rem' : '3.8rem')};
            padding: 0 8px;
            width: ${({ component }) => component === 'Configuration' && '50rem'};
        }
        ul > li.country {
            display: flex;
            min-height: 4rem;
            align-items: center;
            &:hover {
                background-color: #f7f8f9;
                border-radius: 0.4rem;
            }
        }
        ul > li.country.highlight {
            background-color: #ebf1fa;
            border-radius: 0.4rem;
            span {
                color: #3872d2;
            }
            &:hover {
                span {
                    color: #333;
                }
            }
        }
    }

    ${({ disabled }) =>
        disabled &&
        css`
            div.react-tel-input > input {
                border-color: rgb(199, 208, 216);
                color: rgb(67, 84, 101);
            }
        `}
`;
