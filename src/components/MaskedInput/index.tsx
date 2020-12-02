import React, { useEffect, useRef } from 'react';
import ReactInputMask, { Props } from 'react-input-mask';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core';
import { useField } from '@unform/core';

interface TextInputProps extends Props {
  id: string;
  label: string;
  required?: boolean;
  hasError?: boolean;
  helperText?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  mask,
  required,
  hasError,
  helperText,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField } = useField(id);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <FormControl
      variant="outlined"
      fullWidth
      required={required}
      error={hasError}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <ReactInputMask mask={mask} defaultValue={defaultValue} {...rest}>
        <OutlinedInput
          id={id}
          label={`${label}${required ? ' * ' : ''}`}
          inputRef={inputRef}
          error={hasError}
        />
      </ReactInputMask>

      <FormHelperText error={hasError}>{hasError && helperText}</FormHelperText>
    </FormControl>
  );
};

export default TextInput;
