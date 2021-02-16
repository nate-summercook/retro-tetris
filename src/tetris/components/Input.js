import styled from 'styled-components';
import { useState } from 'react';

const InputWrapper = styled.input`
  font-family: Chicago, sans-serif;
  padding: 0.25rem 0.5rem;
`;

const Input = (props) => {
  const { value, onChange, ...rest } = props;

  const [_value, setValue] = useState(value ?? '');

  const handleOnChange = (event) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  return <InputWrapper value={_value} onChange={handleOnChange} {...rest} />;
};
export default Input;
