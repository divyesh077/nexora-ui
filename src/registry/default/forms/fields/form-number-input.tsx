"use client";

import type { ComponentProps } from "react";
import type { FieldValues } from "react-hook-form";

import { Input } from "@/components/ui/input";

import { FormField, type FormFieldProps } from "../core/form-field";

import type { NumberFieldName } from "../core/form-types";

export type FormNumberInputProps<
  TFieldValues extends FieldValues,
  TName extends NumberFieldName<TFieldValues>,
> = Omit<
  ComponentProps<typeof Input>,
  | "name"
  | "type"
  | "value"
  | "defaultValue"
  | "onChange"
  | "onBlur"
  | "disabled"
  | "required"
  | "id"
  | "aria-invalid"
  | "aria-describedby"
> &
  Omit<FormFieldProps<TFieldValues, TName>, "name" | "render" | "className"> & {
    name: TName;
    fieldClassName?: string;
    min?: number;
    max?: number;
    step?: number;
  };

export function FormNumberInput<
  TFieldValues extends FieldValues,
  TName extends NumberFieldName<TFieldValues>,
>({
  name,
  label,
  description,
  orientation,
  labelPlacement,
  showError,
  rules,
  shouldUnregister,
  required,
  disabled,
  defaultValue,
  fieldClassName,
  className,
  min,
  max,
  step,
  ...inputProps
}: FormNumberInputProps<TFieldValues, TName>) {
  return (
    <FormField
      name={name}
      label={label}
      description={description}
      orientation={orientation}
      labelPlacement={labelPlacement}
      showError={showError}
      rules={rules}
      shouldUnregister={shouldUnregister}
      required={required}
      disabled={disabled}
      defaultValue={defaultValue}
      className={fieldClassName}
      render={({
        field,
        ids,
        invalid,
        required: isRequired,
        disabled: isDisabled,
        ariaDescribedBy,
      }) => (
        <Input
          {...inputProps}
          name={field.name}
          ref={field.ref}
          type="number"
          id={ids.control}
          value={field.value ?? ""}
          onChange={(event) => {
            const rawValue = event.currentTarget.value;
            const numericValue = event.currentTarget.valueAsNumber;

            field.onChange(
              rawValue === "" || Number.isNaN(numericValue)
                ? null
                : numericValue,
            );
          }}
          onBlur={field.onBlur}
          min={min}
          max={max}
          step={step}
          disabled={isDisabled}
          required={isRequired}
          aria-invalid={invalid || undefined}
          aria-describedby={ariaDescribedBy}
          className={className}
        />
      )}
    />
  );
}
