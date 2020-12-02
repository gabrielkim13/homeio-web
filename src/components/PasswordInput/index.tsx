import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useField } from '@unform/core';

interface PasswordInputProps {
  id: string;
  label: string;
  required?: boolean;
  hasError?: boolean;
  helperText?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  label,
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

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onToggleVisibility = useCallback(() => {
    setIsPasswordVisible(state => !state);
  }, []);

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
        type={isPasswordVisible ? 'text' : 'password'}
        label={`${label}${required ? ' * ' : ''}`}
        inputRef={inputRef}
        error={hasError}
        endAdornment={
          <InputAdornment position="end">
            <IconButton edge="end" onClick={onToggleVisibility}>
              {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText error={hasError}>{hasError && helperText}</FormHelperText>
    </FormControl>
  );
};

export default PasswordInput;
