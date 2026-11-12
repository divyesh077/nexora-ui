"use client";

import { useId } from "react";
import type { FieldValues } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

import { FormFieldSet, type FormFieldSetProps } from "../core/form-field-set";

import type { CheckboxOption, StringArrayFieldName } from "../core/form-types";

export type FormCheckboxGroupProps<
  TFieldValues extends FieldValues,
  TName extends StringArrayFieldName<TFieldValues>,
> = Omit<
  FormFieldSetProps<TFieldValues, TName>,
  "name" | "render" | "groupClassName" | "className"
> & {
  name: TName;
  options: CheckboxOption[];

  /** Styles the outer fieldset */
  fieldClassName?: string;

  /** Styles the checkbox group */
  groupClassName?: string;

  /** Styles each option row */
  optionClassName?: string;

  /** Styles each checkbox */
  checkboxClassName?: string;
};

export function FormCheckboxGroup<
  TFieldValues extends FieldValues,
  TName extends StringArrayFieldName<TFieldValues>,
>({
  name,
  legend,
  description,
  options,
  fieldClassName,
  groupClassName,
  optionClassName,
  checkboxClassName,
  ...fieldSetProps
}: FormCheckboxGroupProps<TFieldValues, TName>) {
  const groupId = useId();

  return (
    <FormFieldSet
      {...fieldSetProps}
      name={name}
      legend={legend}
      description={description}
      className={fieldClassName}
      render={({ field, ids, invalid, disabled, ariaDescribedBy }) => {
        // Always work with a string array.
        const selectedValues: string[] = Array.isArray(field.value)
          ? (field.value as string[])
          : [];

        // Assign the RHF ref to the first enabled checkbox.
        const firstEnabledIndex = options.findIndex(
          (option) => !disabled && !option.disabled,
        );

        // Add or remove an option from the selected values.
        const handleOptionChange = (optionValue: string, checked: boolean) => {
          const nextValues = checked
            ? selectedValues.includes(optionValue)
              ? selectedValues
              : [...selectedValues, optionValue]
            : selectedValues.filter((value) => value !== optionValue);

          field.onChange(nextValues);
        };

        return (
          <FieldGroup
            id={`${ids.control}-group`}
            aria-labelledby={legend ? ids.control : undefined}
            aria-describedby={ariaDescribedBy}
            aria-invalid={invalid || undefined}
            className={cn(groupClassName)}
          >
            {options.map((option, index) => {
              const optionId = `${groupId}-${index}`;

              const optionDisabled = disabled || Boolean(option.disabled);

              return (
                <Field
                  key={option.value}
                  orientation="horizontal"
                  className={cn("items-start", optionClassName)}
                  data-disabled={optionDisabled || undefined}
                >
                  <Checkbox
                    ref={index === firstEnabledIndex ? field.ref : undefined}
                    id={optionId}
                    name={field.name}
                    value={option.value}
                    checked={selectedValues.includes(option.value)}
                    onCheckedChange={(checked) =>
                      handleOptionChange(option.value, checked)
                    }
                    onBlur={field.onBlur}
                    disabled={optionDisabled}
                    aria-invalid={invalid || undefined}
                    aria-describedby={ariaDescribedBy}
                    className={checkboxClassName}
                  />

                  <FieldContent>
                    <FieldLabel htmlFor={optionId}>{option.label}</FieldLabel>

                    {option.description && (
                      <FieldDescription>{option.description}</FieldDescription>
                    )}
                  </FieldContent>
                </Field>
              );
            })}
          </FieldGroup>
        );
      }}
    />
  );
}
