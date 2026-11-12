"use client";

import type { FormHTMLAttributes, ReactNode } from "react";

import {
  FormProvider,
  type FieldValues,
  type SubmitErrorHandler,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";

export type FormProps<
  TFieldValues extends FieldValues,
  TContext = object,
  TTransformedValues = TFieldValues,
> = Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> & {
  methods: UseFormReturn<TFieldValues, TContext, TTransformedValues>;
  onSubmit: SubmitHandler<TTransformedValues>;
  onInvalid?: SubmitErrorHandler<TFieldValues>;
  children: ReactNode;
};

export function Form<
  TFieldValues extends FieldValues,
  TContext = object,
  TTransformedValues = TFieldValues,
>({
  methods,
  onSubmit,
  onInvalid,
  children,
  noValidate = true,
  ...formProps
}: FormProps<TFieldValues, TContext, TTransformedValues>) {
  return (
    <FormProvider<TFieldValues, TContext, TTransformedValues> {...methods}>
      <form
        {...formProps}
        noValidate={noValidate}
        onSubmit={methods.handleSubmit(onSubmit, onInvalid)}
      >
        {children}
      </form>
    </FormProvider>
  );
}
