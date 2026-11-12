"use client";

import { useId } from "react";

import {
  Controller,
  useFormContext,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { cn } from "@/lib/utils";

import type {
  FormFieldBaseProps,
  FormFieldIds,
  FormFieldRenderProps,
} from "./form-types";

export type FormFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = FormFieldBaseProps<TFieldValues, TName, TTransformedValues>;

export function FormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  name,
  render,
  label,
  description,
  className,
  orientation = "vertical",
  labelPlacement = "start",
  showError = true,
  required = false,
  disabled,
  rules,
  shouldUnregister,
  defaultValue,
}: FormFieldProps<TFieldValues, TName, TTransformedValues>) {
  const { control } = useFormContext<
    TFieldValues,
    object,
    TTransformedValues
  >();

  const reactId = useId();

  const ids: FormFieldIds = {
    control: `field-${reactId}-control`,
    description: `field-${reactId}-description`,
    error: `field-${reactId}-error`,
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

        const labelNode = label ? (
          <FieldLabel htmlFor={ids.control}>
            {label}
            {required && (
              <span aria-hidden="true" className="text-destructive">
                {" "}
                *
              </span>
            )}
          </FieldLabel>
        ) : null;

        const descriptionNode = description ? (
          <FieldDescription id={ids.description}>
            {description}
          </FieldDescription>
        ) : null;

        const errorNode =
          showError && invalid ? (
            <FieldError id={ids.error} errors={[fieldState.error]} />
          ) : null;

        const controlNode = render(context);

        const metadataNode = (
          <>
            {labelNode}
            {descriptionNode}
            {errorNode}
          </>
        );

        return (
          <Field
            data-invalid={invalid || undefined}
            data-disabled={isDisabled || undefined}
            orientation={orientation}
            className={cn(className)}
          >
            {orientation === "vertical" ? (
              <>
                {labelNode}
                {controlNode}
                {descriptionNode}
                {errorNode}
              </>
            ) : (
              <>
                {labelPlacement === "start" && (
                  <FieldContent>{metadataNode}</FieldContent>
                )}

                {controlNode}

                {labelPlacement === "end" && (
                  <FieldContent>{metadataNode}</FieldContent>
                )}
              </>
            )}
          </Field>
        );
      }}
    />
  );
}
