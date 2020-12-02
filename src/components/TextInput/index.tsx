import React, { useEffect, useRef } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core';
import { useField } from '@unform/core';

interface TextInputProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  hasError?: boolean;
  helperText?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  type,
  required,
  hasError,
  helperText,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, registerField } = useField(id);

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
      <OutlinedInput
        id={id}
        type={type && 'text'}
        label={`${label}${required ? ' * ' : ''}`}
        inputRef={inputRef}
        error={hasError}
      />
      <FormHelperText error={hasError}>{hasError && helperText}</FormHelperText>
    </FormControl>
  );
};

export default TextInput;
