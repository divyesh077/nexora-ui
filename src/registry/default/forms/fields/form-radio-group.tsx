"use client";

import { useId } from "react";
import type { FieldValues } from "react-hook-form";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";

import { cn } from "@/lib/utils";

import { FormFieldSet, type FormFieldSetProps } from "../core/form-field-set";

import type { RadioOption, StringFieldName } from "../core/form-types";

export type FormRadioGroupProps<
  TFieldValues extends FieldValues,
  TName extends StringFieldName<TFieldValues>,
> = Omit<
  FormFieldSetProps<TFieldValues, TName>,
  "name" | "render" | "groupClassName" | "className"
> & {
  name: TName;
  options: RadioOption[];

  /** Styles the outer fieldset */
  fieldClassName?: string;

  /** Styles the radio group */
  groupClassName?: string;

  /** Styles each option row */
  optionClassName?: string;

  /** Styles individual radio controls */
  radioClassName?: string;
};

export function FormRadioGroup<
  TFieldValues extends FieldValues,
  TName extends StringFieldName<TFieldValues>,
>({
  name,
  options,
  fieldClassName,
  groupClassName,
  optionClassName,
  radioClassName,
  ...fieldSetProps
}: FormRadioGroupProps<TFieldValues, TName>) {
  const groupId = useId();

  return (
    <FormFieldSet
      {...fieldSetProps}
      name={name}
      className={fieldClassName}
      render={({ field, invalid, disabled, ariaDescribedBy }) => {
        const firstEnabledIndex = options.findIndex(
          (option) => !disabled && !option.disabled,
        );

        return (
          <RadioGroup
            name={field.name}
            value={field.value ?? ""}
            onValueChange={(value) => field.onChange(value)}
            disabled={disabled}
            className={cn("grid gap-3", groupClassName)}
            aria-invalid={invalid || undefined}
            aria-describedby={ariaDescribedBy}
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
                  <RadioGroupItem
                    ref={index === firstEnabledIndex ? field.ref : undefined}
                    id={optionId}
                    value={option.value}
                    disabled={optionDisabled}
                    onBlur={field.onBlur}
                    aria-invalid={invalid || undefined}
                    aria-describedby={ariaDescribedBy}
                    className={radioClassName}
                  />

                  <div className="grid gap-1">
                    <FieldLabel htmlFor={optionId}>{option.label}</FieldLabel>

                    {option.description && (
                      <FieldDescription>{option.description}</FieldDescription>
                    )}
                  </div>
                </Field>
              );
            })}
          </RadioGroup>
        );
      }}
    />
  );
}
