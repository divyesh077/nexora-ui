"use client";

import type { ComponentProps, ReactNode } from "react";
import type { FieldValues } from "react-hook-form";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { FormField, type FormFieldProps } from "../core/form-field";

import type { StringFieldName } from "../core/form-types";

export type FormInputGroupProps<
  TFieldValues extends FieldValues,
  TName extends StringFieldName<TFieldValues>,
> = Omit<
  ComponentProps<typeof InputGroupInput>,
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

    /** Content displayed before the input */
    startAddon?: ReactNode;

    /** Content displayed after the input */
    endAddon?: ReactNode;

    /** Styles the outer field */
    fieldClassName?: string;

    /** Styles the input group wrapper */
    inputGroupClassName?: string;

    /** Styles the input control */
    inputClassName?: string;

    /** Styles the start addon */
    startAddonClassName?: string;

    /** Styles the end addon */
    endAddonClassName?: string;
  };

export function FormInputGroup<
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
  startAddon,
  endAddon,
  fieldClassName,
  inputGroupClassName,
  inputClassName,
  startAddonClassName,
  endAddonClassName,
  ...inputProps
}: FormInputGroupProps<TFieldValues, TName>) {
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
        <InputGroup
          className={inputGroupClassName}
          data-disabled={isDisabled || undefined}
        >
          <InputGroupInput
            {...inputProps}
            {...field}
            id={ids.control}
            value={field.value ?? ""}
            disabled={isDisabled}
            required={isRequired}
            aria-invalid={invalid || undefined}
            aria-describedby={ariaDescribedBy}
            className={inputClassName}
          />

          {startAddon != null && (
            <InputGroupAddon
              align="inline-start"
              className={startAddonClassName}
            >
              {startAddon}
            </InputGroupAddon>
          )}

          {endAddon != null && (
            <InputGroupAddon align="inline-end" className={endAddonClassName}>
              {endAddon}
            </InputGroupAddon>
          )}
        </InputGroup>
      )}
    />
  );
}
