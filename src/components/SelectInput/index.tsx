import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { useField } from '@unform/core';

interface SelectInputProps {
  id: string;
  label: string;
  options: {
    value: string;
    label: string;
  }[];
  required?: boolean;
  hasError?: boolean;
  helperText?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  label,
  options,
  required,
  hasError,
  helperText,
}) => {
  const [value, setValue] = useState('');

  const { fieldName, registerField } = useField(id);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
    });
  }, [fieldName, registerField, value]);

  const onSelectChange = useCallback(
    (event: ChangeEvent<{ name?: string; value: unknown }>) => {
      setValue(String(event.target.value));
    },
    [],
  );

  return (
    <FormControl
      variant="outlined"
      fullWidth
      required={required}
      error={hasError}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        id={id}
        label={`${label}${required ? ' * ' : ''}`}
        error={hasError}
        onChange={onSelectChange}
      >
        {options.map(option => (
          <MenuItem
            value={option.value}
            key={`${option.label}-${option.value}`}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={hasError}>{hasError && helperText}</FormHelperText>
    </FormControl>
  );
};

export default SelectInput;
