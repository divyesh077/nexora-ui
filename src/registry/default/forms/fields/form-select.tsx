"use client";

import type { ComponentProps } from "react";
import type { FieldValues } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FormField, type FormFieldProps } from "../core/form-field";

import type { SelectOption, StringFieldName } from "../core/form-types";

export type FormSelectProps<
  TFieldValues extends FieldValues,
  TName extends StringFieldName<TFieldValues>,
> = Omit<
  ComponentProps<typeof SelectTrigger>,
  | "id"
  | "disabled"
  | "required"
  | "aria-invalid"
  | "aria-describedby"
  | "children"
> &
  Omit<FormFieldProps<TFieldValues, TName>, "name" | "render" | "className"> & {
    name: TName;
    options: SelectOption[];
    placeholder?: string;

    /** Styles the outer field */
    fieldClassName?: string;

    /** Styles the dropdown content */
    contentClassName?: string;

    /** Styles individual options */
    itemClassName?: string;
  };

export function FormSelect<
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
  options,
  placeholder = "Select an option",
  fieldClassName,
  contentClassName,
  itemClassName,
  className,
  ...triggerProps
}: FormSelectProps<TFieldValues, TName>) {
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
        <Select
          name={field.name}
          value={field.value ?? null}
          onValueChange={(value) => field.onChange(value)}
          disabled={isDisabled}
          required={isRequired}
        >
          <SelectTrigger
            {...triggerProps}
            ref={field.ref}
            id={ids.control}
            onBlur={field.onBlur}
            aria-invalid={invalid || undefined}
            aria-describedby={ariaDescribedBy}
            className={className}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>

          <SelectContent className={contentClassName}>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className={itemClassName}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
}
