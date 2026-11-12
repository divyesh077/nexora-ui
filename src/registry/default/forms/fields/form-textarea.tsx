"use client";

import type { ComponentProps } from "react";
import type { FieldValues } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";

import { FormField, type FormFieldProps } from "../core/form-field";

import type { StringFieldName } from "../core/form-types";

export type FormTextareaProps<
  TFieldValues extends FieldValues,
  TName extends StringFieldName<TFieldValues>,
> = Omit<
  ComponentProps<typeof Textarea>,
  | "name"
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
  };

export function FormTextarea<
  TFieldValues extends FieldValues,
  TName extends StringFieldName<TFieldValues>,
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
  ...textareaProps
}: FormTextareaProps<TFieldValues, TName>) {
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
        <Textarea
          {...textareaProps}
          {...field}
          id={ids.control}
          value={field.value ?? ""}
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
