import React, { useEffect, useRef } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { useField } from '@unform/core';

interface TextInputProps {
  id: string;
  label: string;
}

const TextInput: React.FC<TextInputProps> = ({ id, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, registerField } = useField(id);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'checked',
    });
  }, [fieldName, registerField]);

  return (
    <FormControlLabel
      control={
        <Checkbox
          id={id}
          value="remember"
          color="primary"
          inputRef={inputRef}
        />
      }
      label={label}
    />
  );
};

export default TextInput;
