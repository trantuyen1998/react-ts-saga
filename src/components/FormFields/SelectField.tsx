import * as React from "react";
import { Control, useController } from "react-hook-form";
import FormControl from "@material-ui/core/FormControl";
import { FormHelperText, MenuItem, Select } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
export interface SelectOption {
  label?: string;
  value: number | string;
}
export interface SelectFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: SelectOption[];
}

export function SelectField({
  name,
  control,
  label,
  disabled,
  options,
}: SelectFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <FormControl
    fullWidth
    variant="outlined"
    margin="normal"
    size="small"
    disabled={disabled}
    error={invalid}
  >
    <InputLabel id={`${name}_label`}>{label}</InputLabel>
    <Select
      labelId={`${name}_label`}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      label={label}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>

    <FormHelperText>{error?.message}</FormHelperText>
  </FormControl>
  );
}
