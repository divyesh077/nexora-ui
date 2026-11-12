"use client";

import type { ComponentProps } from "react";
import type { FieldValues } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

import { FormField, type FormFieldProps } from "../core/form-field";
import type { BooleanFieldName } from "../core/form-types";

export type FormCheckboxProps<
  TFieldValues extends FieldValues,
  TName extends BooleanFieldName<TFieldValues>,
> = Omit<
  ComponentProps<typeof Checkbox>,
  | "checked"
  | "defaultChecked"
  | "onCheckedChange"
  | "onChange"
  | "onBlur"
  | "ref"
  | "disabled"
  | "id"
  | "name"
  | "required"
  | "aria-invalid"
  | "aria-describedby"
> &
  Omit<FormFieldProps<TFieldValues, TName>, "name" | "render" | "className"> & {
    name: TName;
    fieldClassName?: string;
  };

export function FormCheckbox<
  TFieldValues extends FieldValues,
  TName extends BooleanFieldName<TFieldValues>,
>({
  name,
  label,
  description,
  orientation = "horizontal",
  labelPlacement = "end",
  showError,
  rules,
  shouldUnregister,
  required,
  disabled,
  defaultValue,
  fieldClassName,
  className,
  ...checkboxProps
}: FormCheckboxProps<TFieldValues, TName>) {
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
        <Checkbox
          {...checkboxProps}
          ref={field.ref}
          id={ids.control}
          name={field.name}
          checked={Boolean(field.value)}
          onCheckedChange={field.onChange}
          onBlur={field.onBlur}
          disabled={isDisabled}
          required={isRequired}
          aria-invalid={invalid || undefined}
          aria-describedby={ariaDescribedBy}
          className={cn(className)}
        />
      )}
    />
  );
}
