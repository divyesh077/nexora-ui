"use client";

import { useState } from "react";
import type { ComponentProps } from "react";
import type { FieldValues } from "react-hook-form";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { FormField, type FormFieldProps } from "../core/form-field";

import type { DateFieldName } from "../core/form-types";

function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

export type FormDatePickerProps<
  TFieldValues extends FieldValues,
  TName extends DateFieldName<TFieldValues>,
> = Omit<
  FormFieldProps<TFieldValues, TName>,
  "name" | "render" | "className"
> & {
  name: TName;

  /** Styles the outer field */
  fieldClassName?: string;

  /** Placeholder displayed when no date is selected */
  placeholder?: string;

  /** Styles the calendar */
  calendarClassName?: string;

  /** Styles the popover content */
  contentClassName?: string;

  /** Additional React DayPicker properties */
  calendarProps?: Omit<
    ComponentProps<typeof Calendar>,
    "mode" | "selected" | "onSelect" | "disabled"
  >;
};

export function FormDatePicker<
  TFieldValues extends FieldValues,
  TName extends DateFieldName<TFieldValues>,
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
  placeholder = "Pick a date",
  calendarClassName,
  contentClassName,
  calendarProps,
}: FormDatePickerProps<TFieldValues, TName>) {
  const [open, setOpen] = useState(false);

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
      }) => {
        const selectedDate: Date | undefined = isValidDate(field.value)
          ? field.value
          : undefined;

        return (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              render={
                <Button
                  ref={field.ref}
                  id={ids.control}
                  type="button"
                  variant="outline"
                  disabled={isDisabled}
                  data-empty={!selectedDate}
                  aria-invalid={invalid || undefined}
                  aria-describedby={ariaDescribedBy}
                  aria-required={isRequired || undefined}
                  className="w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                  onBlur={field.onBlur}
                />
              }
            >
              <CalendarIcon className="size-4 shrink-0" />

              {selectedDate ? (
                format(selectedDate, "PPP")
              ) : (
                <span>{placeholder}</span>
              )}
            </PopoverTrigger>

            <PopoverContent
              align="start"
              className={`w-auto p-0 ${contentClassName ?? ""}`}
            >
              <Calendar
                {...calendarProps}
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  field.onChange(date ?? null);
                  setOpen(false);
                }}
                className={calendarClassName}
              />
            </PopoverContent>
          </Popover>
        );
      }}
    />
  );
}
