import styled from 'styled-components';
import theme from 'tetris/theme';

export const Button = styled.button`
  outline: none;
  cursor: pointer;
  border: 4px double ${theme.black};
  box-shadow: 0 0 0 1px ${theme.black};
  background: ${theme.white};
  border-radius: 0.5rem;
  font-family: Chicago, sans-serif;
  font-size: 1rem;
  padding: 0.25rem 1rem;
  margin-top: 2rem;

  &:active,
  &:focus {
    border: 4px double ${theme.white};
    box-shadow: 0 0 0 1px ${theme.white};
    background: ${theme.black};
    color: ${theme.white};
  }
`;
