"use client";

import type { ComponentProps, ReactNode } from "react";
import type { FieldValues } from "react-hook-form";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
} from "@/components/ui/input-group";

import { FormField, type FormFieldProps } from "../core/form-field";
import type { StringFieldName } from "../core/form-types";

export type FormInputGroupTextareaProps<
  TFieldValues extends FieldValues,
  TName extends StringFieldName<TFieldValues>,
> = Omit<
  ComponentProps<typeof InputGroupTextarea>,
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

    /** Styles the textarea control */
    textareaClassName?: string;

    /** Styles the start addon */
    startAddonClassName?: string;

    /** Styles the end addon */
    endAddonClassName?: string;
  };

export function FormInputGroupTextarea<
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
  textareaClassName,
  startAddonClassName,
  endAddonClassName,
  ...textareaProps
}: FormInputGroupTextareaProps<TFieldValues, TName>) {
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
        required,
        disabled,
        ariaDescribedBy,
      }) => (
        <InputGroup
          data-disabled={disabled || undefined}
          className={inputGroupClassName}
        >
          <InputGroupTextarea
            {...textareaProps}
            {...field}
            id={ids.control}
            value={field.value ?? ""}
            disabled={disabled}
            required={required}
            aria-invalid={invalid || undefined}
            aria-describedby={ariaDescribedBy}
            className={textareaClassName}
          />

          {startAddon && (
            <InputGroupAddon
              align="block-start"
              className={startAddonClassName}
            >
              {startAddon}
            </InputGroupAddon>
          )}

          {endAddon && (
            <InputGroupAddon align="block-end" className={endAddonClassName}>
              {endAddon}
            </InputGroupAddon>
          )}
        </InputGroup>
      )}
    />
  );
}
