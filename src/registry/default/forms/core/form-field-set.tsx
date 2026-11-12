"use client";

import { useId } from "react";

import {
  Controller,
  useFormContext,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import {
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

import { cn } from "@/lib/utils";

import type {
  FormFieldBaseProps,
  FormFieldIds,
  FormFieldRenderProps,
} from "./form-types";

import type { ReactNode } from "react";

export type FormFieldSetProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = Omit<
  FormFieldBaseProps<TFieldValues, TName, TTransformedValues>,
  "label" | "orientation" | "labelPlacement"
> & {
  legend?: ReactNode;
  legendVariant?: "legend" | "label";
};

export function FormFieldSet<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  name,
  render,
  legend,
  description,
  className,
  legendVariant = "legend",
  showError = true,
  required = false,
  disabled,
  rules,
  shouldUnregister,
  defaultValue,
}: FormFieldSetProps<TFieldValues, TName, TTransformedValues>) {
  const { control } = useFormContext<
    TFieldValues,
    object,
    TTransformedValues
  >();

  const reactId = useId();

  const ids: FormFieldIds = {
    control: `fieldset-${reactId}-control`,
    description: `fieldset-${reactId}-description`,
    error: `fieldset-${reactId}-error`,
  };

  return (
    <Controller<TFieldValues, TName, TTransformedValues>
      name={name}
      control={control}
      rules={rules}
      disabled={disabled}
      shouldUnregister={shouldUnregister}
      defaultValue={defaultValue}
      render={({ field, fieldState, formState }) => {
        const invalid = fieldState.invalid;
        const isDisabled = Boolean(disabled || field.disabled);

        const ariaDescribedBy =
          [
            description ? ids.description : undefined,
            showError && invalid ? ids.error : undefined,
          ]
            .filter(Boolean)
            .join(" ") || undefined;

        const context: FormFieldRenderProps<
          TFieldValues,
          TName,
          TTransformedValues
        > = {
          field,
          fieldState,
          formState,
          ids,
          invalid,
          required,
          disabled: isDisabled,
          ariaDescribedBy,
        };

        return (
          <FieldSet
            disabled={isDisabled}
            data-invalid={invalid || undefined}
            data-disabled={isDisabled || undefined}
            aria-describedby={ariaDescribedBy}
            className={cn(className)}
          >
            {legend && (
              <FieldLegend id={ids.control} variant={legendVariant}>
                {legend}

                {required && (
                  <span aria-hidden="true" className="text-destructive">
                    {" "}
                    *
                  </span>
                )}
              </FieldLegend>
            )}

            {description && (
              <FieldDescription id={ids.description}>
                {description}
              </FieldDescription>
            )}

            {render(context)}

            {showError && invalid && (
              <FieldError id={ids.error} errors={[fieldState.error]} />
            )}
          </FieldSet>
        );
      }}
    />
  );
}
