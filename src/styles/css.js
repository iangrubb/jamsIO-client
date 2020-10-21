import { css } from 'styled-components'

export const button = css`
    background: ${props => props.inactive ? "gray" : "var(--green)" };
    border: none;
    border-radius: 32px;
    padding: 0 0.8rem;
    height: 36px;

    ${props => props.inactive ? null : "cursor: pointer;" }
    

    color: var(--white);
    text-transform: capitalize;
    font-size: 14px;
    font-weight: 700;
    font-family: var(--display-font);
`